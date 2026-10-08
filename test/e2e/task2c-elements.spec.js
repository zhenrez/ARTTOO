import { test, expect } from '@playwright/test';

test('Task 2c shapes, paths and lettering survive transforms, history and reopen', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/web/index.html');
  await page.getByRole('button', { name: 'Rectangle', exact: true }).click();
  await page.getByRole('button', { name: 'Vector path', exact: true }).click();
  await page.getByLabel('Text content').fill('ARTTOO');
  await page.getByRole('button', { name: 'Add text', exact: true }).click();
  const canvas = page.locator('#artboard');
  const selectors = ['rect[data-object-id]', 'path[data-object-id]', 'text[data-object-id]'];
  const ids = [];
  for (const [index, selector] of selectors.entries()) {
    const item = canvas.locator(selector);
    await expect(item).toHaveCount(1);
    const id = await item.getAttribute('data-object-id');
    expect(id).toBeTruthy();
    ids.push(id);
    await page.locator('#layers-list [role="option"]').filter({ has: page.locator('[data-object-id="' + id + '"]') }).count();
    await page.locator('#layers-list [role="option"][data-object-id="' + id + '"] button').first().click();
    await page.locator('#transform-x').fill(String(index + 11));
    await page.locator('#apply-transform').click();
    await expect(item).toHaveAttribute('transform', new RegExp('translate\\(' + (index + 11) + ' 0\\)'));
    await page.locator('#undo').click();
    await expect(item).toHaveAttribute('transform', /translate\(0 0\)/);
    await page.locator('#redo').click();
    await expect(item).toHaveAttribute('transform', new RegExp('translate\\(' + (index + 11) + ' 0\\)'));
  }
  await page.locator('#save').click();
  await expect(page.locator('#save-status')).toContainText('Saved locally');
  const before = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    return JSON.parse(localStorage.getItem('artoo:draft:' + projectId));
  });
  await page.reload();
  await expect(page.locator('#save-status')).toContainText('reopened revision');
  await expect(page.locator('#layers-list [role="option"]')).toHaveCount(3);
  const after = await page.evaluate(() => {
    const projectId = localStorage.getItem('artoo:active-project');
    return JSON.parse(localStorage.getItem('artoo:draft:' + projectId));
  });
  expect(after).toEqual(before);
  for (const id of ids) expect(after.objects[id]).toBeTruthy();
  expect(errors).toEqual([]);
});
