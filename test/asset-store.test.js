import test from 'node:test';
import assert from 'node:assert/strict';
import { createIndexedDbAssetStore } from '../src/asset-store.js';

function deferred() {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { promise, resolve };
}

function fakeIndexedDb() {
  const values = new Map();
  const controls = [];

  const indexedDB = {
    open() {
      const request = {};
      queueMicrotask(() => {
        request.result = {
          objectStoreNames: { contains: () => true },
          transaction(_storeName, mode) {
            const transaction = {};
            const control = { mode, transaction, request: null, complete: null };
            controls.push(control);
            transaction.objectStore = () => ({
              put(value, key) {
                const req = {};
                control.request = req;
                queueMicrotask(() => {
                  values.set(key, value);
                  req.result = key;
                  req.onsuccess?.();
                });
                return req;
              },
              get(key) {
                const req = {};
                control.request = req;
                queueMicrotask(() => {
                  req.result = values.get(key);
                  req.onsuccess?.();
                });
                return req;
              },
              delete(key) {
                const req = {};
                control.request = req;
                queueMicrotask(() => {
                  values.delete(key);
                  req.result = undefined;
                  req.onsuccess?.();
                });
                return req;
              }
            });
            control.complete = () => transaction.oncomplete?.();
            return transaction;
          },
          close() {}
        };
        request.onsuccess?.();
      });
      return request;
    }
  };

  return { indexedDB, controls, values };
}

async function assertPendingUntilComplete(operation, controlFor, expected) {
  const settled = deferred();
  operation.then(
    (value) => settled.resolve({ status: 'fulfilled', value }),
    (error) => settled.resolve({ status: 'rejected', error })
  );

  await new Promise((resolve) => setImmediate(resolve));
  const control = controlFor();
  assert.ok(control, 'transaction should exist after request success');

  const beforeComplete = await Promise.race([
    settled.promise,
    new Promise((resolve) => setImmediate(() => resolve('pending')))
  ]);
  assert.equal(beforeComplete, 'pending', 'operation must not settle on request success');

  control.complete();
  const afterComplete = await settled.promise;
  assert.equal(afterComplete.status, 'fulfilled');
  if (expected !== undefined) assert.deepEqual(afterComplete.value, expected);
}

test('IndexedDB put and delete settle only after transaction completion', async () => {
  const fake = fakeIndexedDb();
  const store = createIndexedDbAssetStore({ indexedDB: fake.indexedDB, databaseName: 'test-assets' });
  const bytes = new Uint8Array([1, 2, 3]);

  await assertPendingUntilComplete(store.put('sum', bytes), () => fake.controls[0]);
  assert.ok(fake.values.has('sum'));

  await assertPendingUntilComplete(store.delete('sum'), () => fake.controls[1]);
  assert.equal(fake.values.has('sum'), false);
});

test('IndexedDB get exposes captured request result only after transaction completion', async () => {
  const fake = fakeIndexedDb();
  fake.values.set('sum', new Uint8Array([7, 8, 9]).buffer);
  const store = createIndexedDbAssetStore({ indexedDB: fake.indexedDB, databaseName: 'test-assets' });

  await assertPendingUntilComplete(store.get('sum'), () => fake.controls[0], new Uint8Array([7, 8, 9]));
});
