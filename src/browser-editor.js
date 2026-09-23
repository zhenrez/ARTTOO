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
function finiteNumber(input, label) { const value = Number(input.value); if (!Number.isFinite(value)) throw new Error(`${label} must be finite`); return value; }
function svgTransform(transform) { return `translate(${transform.x} ${transform.y}) scale(${transform.scaleX} ${transform.scaleY}) rotate(${transform.rotationDeg})`; }

export function mountBrowserEditor({ project, artboardId, svg, undoButton, redoButton, status, transformControls = null }) {
  if (!svg || !undoButton || !redoButton) throw new Error('browser editor requires artboard and undo/redo controls');
  let activePoints = null;
  let selectedObjectId = null;
  let moveGesture = null;
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
        path.setAttribute('transform', svgTransform(stroke.transform));
        path.dataset.objectId = stroke.objectId;
        if (stroke.objectId === selectedObjectId) path.dataset.selected = 'true';
        return path;
      }));
      if (selectedObjectId && !view.objects.some((object) => object.objectId === selectedObjectId)) selectedObjectId = null;
      const selected = view.objects.find((object) => object.objectId === selectedObjectId);
      if (transformControls) {
        transformControls.fieldset.disabled = !selected;
        if (selected) {
          transformControls.x.value = selected.transform.x;
          transformControls.y.value = selected.transform.y;
          transformControls.rotation.value = selected.transform.rotationDeg;
          if (transformControls.scaleX) transformControls.scaleX.value = selected.transform.scaleX;
          if (transformControls.scaleY) transformControls.scaleY.value = selected.transform.scaleY;
        }
        transformControls.selection.textContent = selected ? `Selected ${selected.objectId}` : 'No object selected';
      }
      undoButton.disabled = !host.canUndo();
      redoButton.disabled = !host.canRedo();
      if (status) status.textContent = `Revision ${view.revision}`;
    },
  };
  const host = createEditorHost({ project, artboardId, adapter });
  const transformSelected = (patch) => {
    if (!selectedObjectId) return;
    const current = host.getProject();
    host.dispatch({ type: 'object.transform', expectedRevision: current.revision, objectId: selectedObjectId, transform: patch });
  };
  const commitStroke = () => {
    if (!activePoints || activePoints.length < 2) { activePoints = null; return; }
    const current = host.getProject();
    host.dispatch({ type: 'stroke.add', expectedRevision: current.revision, artboardId, points: activePoints, style: { preset: 'round', color: '#18151E', width: 1.5, opacity: 1 } });
    activePoints = null;
  };
  const beginMove = (event, objectId) => {
    selectedObjectId = objectId;
    activePoints = null;
    const object = host.getProject().objects[objectId];
    moveGesture = { pointerId: event.pointerId, start: mmPoint(svg, event), transform: { ...object.transform }, target: event.target };
    svg.setPointerCapture?.(event.pointerId);
    host.render();
  };
  const previewMove = (event) => {
    if (!moveGesture || event.pointerId !== moveGesture.pointerId) return;
    const point = mmPoint(svg, event);
    const preview = { ...moveGesture.transform, x: moveGesture.transform.x + point.x - moveGesture.start.x, y: moveGesture.transform.y + point.y - moveGesture.start.y };
    const selectedPath = svg.children.find?.((child) => child.dataset?.objectId === selectedObjectId) ?? moveGesture.target;
    selectedPath?.setAttribute?.('transform', svgTransform(preview));
  };
  const commitMove = (event) => {
    if (!moveGesture || event.pointerId !== moveGesture.pointerId) return false;
    const gesture = moveGesture;
    moveGesture = null;
    const point = mmPoint(svg, event);
    const x = gesture.transform.x + point.x - gesture.start.x;
    const y = gesture.transform.y + point.y - gesture.start.y;
    if (x !== gesture.transform.x || y !== gesture.transform.y) transformSelected({ x, y });
    else host.render();
    return true;
  };
  svg.addEventListener('pointerdown', (event) => {
    const objectId = event.target?.dataset?.objectId;
    if (objectId) { beginMove(event, objectId); return; }
    activePoints = [mmPoint(svg, event)]; svg.setPointerCapture?.(event.pointerId);
  });
  svg.addEventListener('pointermove', (event) => { if (moveGesture) previewMove(event); else if (activePoints) activePoints.push(mmPoint(svg, event)); });
  svg.addEventListener('pointerup', (event) => { if (!commitMove(event)) commitStroke(); });
  svg.addEventListener('pointercancel', () => { activePoints = null; moveGesture = null; host.render(); });
  undoButton.addEventListener('click', () => host.undo());
  redoButton.addEventListener('click', () => host.redo());
  if (transformControls) {
    transformControls.apply.addEventListener('click', () => {
      const patch = { x: finiteNumber(transformControls.x, 'x'), y: finiteNumber(transformControls.y, 'y'), rotationDeg: finiteNumber(transformControls.rotation, 'rotation') };
      if (transformControls.scaleX) patch.scaleX = finiteNumber(transformControls.scaleX, 'scale x');
      if (transformControls.scaleY) patch.scaleY = finiteNumber(transformControls.scaleY, 'scale y');
      transformSelected(patch);
    });
    transformControls.nudgeLeft.addEventListener('click', () => { if (!selectedObjectId) return; const object = host.getProject().objects[selectedObjectId]; transformSelected({ x: object.transform.x - 1 }); });
    transformControls.nudgeRight.addEventListener('click', () => { if (!selectedObjectId) return; const object = host.getProject().objects[selectedObjectId]; transformSelected({ x: object.transform.x + 1 }); });
    transformControls.flipX?.addEventListener('click', () => { if (!selectedObjectId) return; const object = host.getProject().objects[selectedObjectId]; transformSelected({ scaleX: -object.transform.scaleX }); });
    transformControls.flipY?.addEventListener('click', () => { if (!selectedObjectId) return; const object = host.getProject().objects[selectedObjectId]; transformSelected({ scaleY: -object.transform.scaleY }); });
  }
  const onKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); if (event.shiftKey) host.redo(); else host.undo(); return; }
    if (!selectedObjectId || event.ctrlKey || event.metaKey || event.altKey) return;
    const delta = event.shiftKey ? 10 : 1;
    const moves = { ArrowLeft: [-delta, 0], ArrowRight: [delta, 0], ArrowUp: [0, -delta], ArrowDown: [0, delta] };
    const move = moves[event.key]; if (!move) return;
    event.preventDefault(); const object = host.getProject().objects[selectedObjectId];
    transformSelected({ x: object.transform.x + move[0], y: object.transform.y + move[1] });
  };
  document.addEventListener('keydown', onKeyDown);
  host.render();
  return { host, getSelectedObjectId() { return selectedObjectId; }, destroy() { document.removeEventListener('keydown', onKeyDown); } };
}
