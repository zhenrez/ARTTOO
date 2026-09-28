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
  await layer.click();
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
  await page.locator('#layers-list [role="option"]').click();
  await page.locator('#transform-x').fill('12');
  await page.locator('#transform-y').fill('8');
  await page.locator('#transform-rotation').fill('15');
  await page.locator('#apply-transform').click();
  await page.locator('#save').click();
  await expect(page.locator('#save-status')).toContainText('Saved locally');

  await page.reload();
  await expect(page.locator('#artboard image[data-object-id]').toHaveCount(1);
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
