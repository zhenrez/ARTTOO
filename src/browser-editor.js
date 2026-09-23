import { createEditorHost } from './editor-adapter.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const mmPoint = (svg, event) => {
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  return {
    x: ((event.clientX - rect.left) / rect.width) * viewBox.width,
    y: ((event.clientY - rect.top) / rect.height) * viewBox.height,
    pressure: event.pressure > 0 ? event.pressure : 1,
  };
};

function pathData(points) { return points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' '); }

export function mountBrowserEditor({ project, artboardId, svg, undoButton, redoButton, status }) {
  if (!svg || !undoButton || !redoButton) throw new Error('browser editor requires artboard and undo/redo controls');
  let activePoints = null;
  const adapter = {
    render(view) {
      const board = view.artboard;
      svg.setAttribute('viewBox', `0 0 ${board.widthMm} ${board.heightMm}`);
      svg.replaceChildren(...view.objects.filter((object) => object.type === 'stroke').map((stroke) => {
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', pathData(stroke.points));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', stroke.style.color);
        path.setAttribute('stroke-width', stroke.style.width);
        path.setAttribute('stroke-opacity', stroke.style.opacity);
        path.setAttribute('stroke-linecap', 'round');
        path.dataset.objectId = stroke.objectId;
        return path;
      }));
      undoButton.disabled = !host.canUndo();
      redoButton.disabled = !host.canRedo();
      if (status) status.textContent = `Revision ${view.revision}`;
    },
  };
  const host = createEditorHost({ project, artboardId, adapter });
  const commitStroke = () => {
    if (!activePoints || activePoints.length < 2) { activePoints = null; return; }
    const current = host.getProject();
    host.dispatch({ type: 'stroke.add', expectedRevision: current.revision, artboardId, points: activePoints, style: { preset: 'round', color: '#18151E', width: 1.5, opacity: 1 } });
    activePoints = null;
  };
  svg.addEventListener('pointerdown', (event) => { activePoints = [mmPoint(svg, event)]; svg.setPointerCapture?.(event.pointerId); });
  svg.addEventListener('pointermove', (event) => { if (activePoints) activePoints.push(mmPoint(svg, event)); });
  svg.addEventListener('pointerup', () => commitStroke());
  svg.addEventListener('pointercancel', () => { activePoints = null; });
  undoButton.addEventListener('click', () => host.undo());
  redoButton.addEventListener('click', () => host.redo());
  const onKeyDown = (event) => {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
    event.preventDefault();
    if (event.shiftKey) host.redo(); else host.undo();
  };
  document.addEventListener('keydown', onKeyDown);
  host.render();
  return { host, destroy() { document.removeEventListener('keydown', onKeyDown); } };
}
