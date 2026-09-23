export function projectSemanticLayers(project, artboardId, selectedObjectId = null) {
  if (!project || !Array.isArray(project.artboards)) throw new Error('project with artboards is required');
  const artboard = project.artboards.find((item) => item.artboardId === artboardId);
  if (!artboard) throw new Error('artboard not found');
  return artboard.objectIds.map((objectId, index) => {
    const object = project.objects[objectId];
    if (!object) throw new Error(`artboard references missing object: ${objectId}`);
    return {
      objectId,
      type: object.type,
      label: `${object.type === 'stroke' ? 'Stroke' : 'Object'} ${index + 1}`,
      selected: objectId === selectedObjectId,
      visible: object.visible !== false,
      locked: object.locked === true,
    };
  });
}

export function nextSemanticSelection(rows, selectedObjectId, direction) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  if (direction !== 1 && direction !== -1) throw new Error('direction must be 1 or -1');
  const current = rows.findIndex((row) => row.objectId === selectedObjectId);
  const start = current === -1 ? (direction === 1 ? -1 : 0) : current;
  return rows[(start + direction + rows.length) % rows.length].objectId;
}
