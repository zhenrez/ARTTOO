import { projectSemanticLayers, nextSemanticSelection } from './semantic-layers.js';

export function mountLayersPanel({ projectSource, artboardId, selectedObjectId, selectObject, dispatch = null, list, observe = null }) {
  if (!projectSource || !list || !selectObject) throw new Error('layers panel requires project source, list and selection controller');
  const act = (operation) => { if (!dispatch) return; dispatch(operation); render(); };
  const render = () => {
    const rows = projectSemanticLayers(projectSource(), artboardId, selectedObjectId());
    const items = rows.map((row, index) => {
      const item = document.createElement('div');
      item.dataset.objectId = row.objectId;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', row.selected ? 'true' : 'false');

      const select = document.createElement('button');
      select.type = 'button'; select.textContent = row.label;
      select.setAttribute('aria-label', `${row.label}${row.selected ? ', selected' : ''}`);
      select.addEventListener('click', () => { selectObject(row.objectId); render(); });
      item.appendChild?.(select);

      if (dispatch) {
        const visibility = document.createElement('button');
        visibility.type = 'button'; visibility.textContent = row.visible ? 'Hide' : 'Show';
        visibility.dataset.action = 'visibility'; visibility.setAttribute('aria-label', `${row.visible ? 'Hide' : 'Show'} ${row.label}`);
        visibility.addEventListener('click', () => act({ type: 'object.visibility', objectId: row.objectId, visible: !row.visible }));
        item.appendChild?.(visibility);

        const lock = document.createElement('button');
        lock.type = 'button'; lock.textContent = row.locked ? 'Unlock' : 'Lock';
        lock.dataset.action = 'lock'; lock.setAttribute('aria-label', `${row.locked ? 'Unlock' : 'Lock'} ${row.label}`);
        lock.addEventListener('click', () => act({ type: 'object.lock', objectId: row.objectId, locked: !row.locked }));
        item.appendChild?.(lock);

        const reorder = document.createElement('button');
        reorder.type = 'button'; reorder.textContent = index === rows.length - 1 ? 'Lower' : 'Raise';
        reorder.dataset.action = 'reorder';
        const toIndex = index === rows.length - 1 ? Math.max(0, index - 1) : Math.min(rows.length - 1, index + 1);
        reorder.disabled = rows.length < 2;
        reorder.setAttribute('aria-label', `${reorder.textContent} ${row.label}`);
        reorder.addEventListener('click', () => act({ type: 'object.reorder', artboardId, objectId: row.objectId, toIndex }));
        item.appendChild?.(reorder);
      }
      return item;
    });
    list.replaceChildren(...items);
    list.setAttribute('aria-activedescendant', rows.find((row) => row.selected)?.objectId ?? '');
    return rows;
  };
  const onKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const rows = projectSemanticLayers(projectSource(), artboardId, selectedObjectId());
    const next = nextSemanticSelection(rows, selectedObjectId(), event.key === 'ArrowDown' ? 1 : -1);
    if (!next) return;
    event.preventDefault(); selectObject(next); render();
  };
  list.addEventListener('keydown', onKeyDown);
  const observer = observe?.(render) ?? null;
  render();
  return { render, destroy() { observer?.disconnect?.(); } };
}
