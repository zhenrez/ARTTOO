import { test, expect } from '@playwright/test';

async function exerciseCanonicalWorkspace(page) {
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
}

test('production workspace draws, exposes Layers, saves, and reopens the same canonical revision', async ({ page }) => {
  await exerciseCanonicalWorkspace(page);
});

test('tablet-class viewport preserves canonical drawing/layers/save/reopen continuity', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await exerciseCanonicalWorkspace(page);
});


test('tablet orientation change preserves the same saved canonical project', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto('/web/index.html');

  const artboard = page.locator('#artboard');
  const box = await artboard.boundingBox();
  expect(box).not.toBeNull();
  const start = { x: box.x + box.width * 0.3, y: box.y + box.height * 0.3 };
  const end = { x: box.x + box.width * 0.6, y: box.y + box.height * 0.6 };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 4 });
  await page.mouse.up();

  const path = artboard.locator('path[data-object-id]');
  await expect(path).toHaveCount(1);
  const objectId = await path.getAttribute('data-object-id');
  await page.locator('#save').click();
  await expect(page.locator('#save-status')).toHaveText('Saved locally · revision 2');

  const before = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    return { projectId, project: JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`)) };
  });

  await page.setViewportSize({ width: 1180, height: 820 });
  await page.reload();

  const after = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    return { projectId, project: JSON.parse(localStorage.getItem(`artoo:draft:${projectId}`)) };
  });
  expect(after.projectId).toBe(before.projectId);
  expect(after.project.revision).toBe(before.project.revision);
  expect(after.project.objects[objectId]).toEqual(before.project.objects[objectId]);
  await expect(page.locator('#layers-list [role="option"]')).toHaveCount(1);
  await expect(page.locator(`#artboard path[data-object-id="${objectId}"]`)).toHaveCount(1);
});
