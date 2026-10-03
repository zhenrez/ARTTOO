import { test, expect } from '@playwright/test';

test('production workspace draws, exposes Layers, saves, and reopens the same canonical revision', async ({ page }) => {
  await page.goto('/web/index.html');
  await expect(page.locator('#status')).toHaveText('Revision 1');
  await expect(page.locator('#save-status')).toHaveText('Not saved');

  const artboard = page.locator('#artboard');
  const box = await artboard.boundingBox();
  expect(box).not.toBeNull();
  const start = { x: box.x + box.width * 0.25, y: box.y + box.height * 0.25 };
  const end = { x: box.x + box.width * 0.55, y: box.y + box.height * 0.55 };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 4 });
  await page.mouse.up();

  await expect(page.locator('#status')).toHaveText('Revision 2');
  const path = artboard.locator('path[data-object-id]');
  await expect(path).toHaveCount(1);
  const objectId = await path.getAttribute('data-object-id');
  expect(objectId).toBeTruthy();

  const layer = page.locator('#layers-list [role="option"]');
  await expect(layer).toHaveCount(1);
  await layer.locator('button').first().click();
  await expect(page.locator('#selection')).toContainText(objectId);
  await expect(layer).toHaveAttribute('aria-selected', 'true');

  await page.locator('#save').click();
  await expect(page.locator('#save-status')).toHaveText('Saved locally · revision 2');
  const before = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    const serialized = localStorage.getItem(`artoo:draft:${projectId}`);
    return { projectId, project: JSON.parse(serialized) };
  });
  expect(before.projectId).toBeTruthy();
  expect(before.project.revision).toBe(2);
  expect(before.project.objects[objectId]).toBeTruthy();

  await page.reload();
  await expect(page.locator('#save-status')).toHaveText('Saved locally · reopened revision 2');
  await expect(page.locator('#status')).toHaveText('Revision 2');
  await expect(artboard.locator(`path[data-object-id="${objectId}"]`)).toHaveCount(1);
  await expect(page.locator('#layers-list [role="option"]')).toHaveCount(1);

  const after = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    return { projectId, project: JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`)) };
  });
  expect(after.projectId).toBe(before.projectId);
  expect(after.project.revision).toBe(before.project.revision);
  expect(after.project.objects[objectId]).toEqual(before.project.objects[objectId]);
});


test('production workspace imports an image as an editable persistent layer and reopens it', async ({ page }) => {
  await page.goto('/web/index.html');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
  await page.locator('#image-import').setInputFiles({ name: 'tattoo.png', mimeType: 'image/png', buffer: png });
  await expect(page.locator('#save-status')).toContainText('Imported');
  await expect(page.locator('#artboard image[data-object-id]')).toHaveCount(1);
  await expect(page.locator('#layers-list [role="option"]')).toHaveCount(1);

  const objectId = await page.locator('#artboard image[data-object-id]').getAttribute('data-object-id');
  await page.locator('#layers-list [role="option"] button').first().click();
  await page.locator('#transform-x').fill('12');
  await page.locator('#transform-y').fill('8');
  await page.locator('#transform-rotation').fill('15');
  await page.locator('#apply-transform').click();
  await page.locator('#save').click();
  await expect(page.locator('#save-status')).toContainText('Saved locally');

  await page.reload();
  await expect(page.locator('#artboard image[data-object-id]')).toHaveCount(1);
  await expect(page.locator('#artboard image[data-object-id]')).toHaveAttribute('data-object-id', objectId);
  const reopened = await page.evaluate((id) => {
    const projectId = localStorage.getItem('artoo:active-project');
    const project = JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`));
    return project.objects[id];
  }, objectId);
  expect(reopened.type).toBe('image');
  expect(reopened.transform.x).toBe(12);
  expect(reopened.transform.y).toBe(8);
  expect(reopened.transform.rotationDeg).toBe(15);
  expect(reopened.sourceAssetId).toBeTruthy();
});


test('Layers controls hide, lock and reorder canonical canvas objects', async ({ page }) => {
  await page.goto('/web/index.html');
  const artboard = page.locator('#artboard');
  const box = await artboard.boundingBox();
  for (const offset of [0.2, 0.6]) {
    await page.mouse.move(box.x + box.width * offset, box.y + box.height * 0.2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * offset, box.y + box.height * 0.4);
    await page.mouse.up();
  }
  const rows = page.locator('#layers-list [role="option"]');
  await expect(rows).toHaveCount(2);
  const firstId = await rows.nth(0).getAttribute('data-object-id');
  await rows.nth(0).locator('[data-action="visibility"]').click();
  await expect(artboard.locator(`[data-object-id="${firstId}"]`)).toHaveCount(0);
  await rows.nth(0).locator('[data-action="visibility"]').click();
  await expect(artboard.locator(`[data-object-id="${firstId}"]`)).toHaveCount(1);
  await rows.nth(0).locator('[data-action="lock"]').click();
  await expect(artboard.locator(`[data-object-id="${firstId}"]`)).toHaveAttribute('data-locked', 'true');
  await rows.nth(0).locator('[data-action="reorder"]').click();
  await expect(page.locator('#layers-list [role="option"]').nth(1)).toHaveAttribute('data-object-id', firstId);
});


test('image crop is visibly non-destructive and persists through save/reopen', async ({ page }) => {
  await page.goto('/web/index.html');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
  await page.locator('#image-import').setInputFiles({ name: 'wide-tattoo.png', mimeType: 'image/png', buffer: png });
  await page.locator('#layers-list [role="option"] button').first().click();

  await expect(page.locator('#crop')).toBeEnabled();
  await page.locator('#crop-x').fill('0.25');
  await page.locator('#crop-y').fill('0');
  await page.locator('#crop-width').fill('0.5');
  await page.locator('#crop-height').fill('1');
  await page.locator('#apply-crop').click();

  const objectId = await page.locator('#layers-list [role="option"]').first().getAttribute('data-object-id');
  const cropped = page.locator(`#artboard [data-object-id="${objectId}"][data-cropped="true"]`);
  await expect(cropped).toHaveCount(1);

  const before = await page.evaluate((id) => {
    const projectId = localStorage.getItem('artoo:active-project');
    const project = JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`) || 'null');
    return project?.objects?.[id] ?? null;
  }, objectId);
  expect(before).toBeNull();

  await page.locator('#save').click();
  await page.reload();
  await expect(page.locator(`#artboard [data-object-id="${objectId}"][data-cropped="true"]`)).toHaveCount(1);
  const reopened = await page.evaluate((id) => {
    const projectId = localStorage.getItem('artoo:active-project');
    const project = JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`));
    return project.objects[id];
  }, objectId);
  expect(reopened.crop).toEqual({ x: 0.25, y: 0, width: 0.5, height: 1 });

  await page.locator('#layers-list [role="option"] button').first().click();
  await page.locator('#clear-crop').click();
  await expect(page.locator(`#artboard [data-object-id="${objectId}"][data-cropped="true"]`)).toHaveCount(0);
});
