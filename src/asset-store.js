function copyBytes(bytes) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return new Uint8Array(view);
}

export function createMemoryAssetStore() {
  const blobs = new Map();
  return {
    async put(checksum, bytes) { blobs.set(checksum, copyBytes(bytes)); },
    async get(checksum) { return blobs.has(checksum) ? copyBytes(blobs.get(checksum)) : null; },
    async delete(checksum) { blobs.delete(checksum); },
    async corrupt(checksum, bytes) {
      if (!blobs.has(checksum)) throw new Error('source not found');
      blobs.set(checksum, copyBytes(bytes));
    }
  };
}

export function createIndexedDbAssetStore({ indexedDB = globalThis.indexedDB, databaseName = 'artoo-assets', storeName = 'source-blobs' } = {}) {
  if (!indexedDB) throw new Error('IndexedDB is required');

  function open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'));
    });
  }

  async function transact(mode, operation) {
    const db = await open();
    try {
      return await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = operation(store);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
        transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
      });
    } finally {
      db.close();
    }
  }

  return {
    async put(checksum, bytes) {
      const copy = copyBytes(bytes);
      await transact('readwrite', (store) => store.put(copy.buffer, checksum));
    },
    async get(checksum) {
      const result = await transact('readonly', (store) => store.get(checksum));
      return result == null ? null : new Uint8Array(result);
    },
    async delete(checksum) {
      await transact('readwrite', (store) => store.delete(checksum));
    }
  };
}
