import { projectSemanticLayers, nextSemanticSelection } from './semantic-layers.js';

export function mountLayersPanel({ projectSource, artboardId, selectedObjectId, selectObject, list, observe = null }) {
  if (!projectSource || !list || !selectObject) throw new Error('layers panel requires project source, list and selection controller');
  const render = () => {
    const rows = projectSemanticLayers(projectSource(), artboardId, selectedObjectId());
    const items = rows.map((row) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = row.label;
      button.dataset.objectId = row.objectId;
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', row.selected ? 'true' : 'false');
      button.setAttribute('aria-label', `${row.label}${row.selected ? ', selected' : ''}`);
      button.addEventListener('click', () => { selectObject(row.objectId); render(); });
      return button;
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
    event.preventDefault();
    selectObject(next);
    render();
  };
  list.addEventListener('keydown', onKeyDown);
  const observer = observe?.(render) ?? null;
  render();
  return { render, destroy() { observer?.disconnect?.(); } };
}
