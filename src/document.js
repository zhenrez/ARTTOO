export const SCHEMA_VERSION = 1;
const clone = (value) => structuredClone(value);
const now = () => new Date().toISOString();

function id(prefix) {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (!uuid) throw new Error('crypto.randomUUID is required');
  return `${prefix}_${uuid}`;
}

function asBytes(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  throw new Error('bytes must be an ArrayBuffer or typed array');
}

export async function hashBytes(bytes) {
  if (!globalThis.crypto?.subtle) throw new Error('Web Crypto subtle API is required');
  const view = asBytes(bytes);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', view);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function assertAssetStore(assetStore) {
  if (!assetStore || typeof assetStore.put !== 'function' || typeof assetStore.get !== 'function') {
    throw new Error('assetStore must implement put(checksum, bytes) and get(checksum)');
  }
}

export function createProject({ ownerId, name = 'Untitled project' }) {
  if (!ownerId) throw new Error('ownerId is required');
  const timestamp = now();
  return { schemaVersion: SCHEMA_VERSION, projectId: id('project'), ownerId, name, revision: 0, createdAt: timestamp, updatedAt: timestamp, artboards: [], assets: {}, objects: {}, bodyTargets: {}, placements: {}, reviews: {}, exports: {}, history: [] };
}

export async function importAsset(project, { bytes, mimeType, width, height, provenance, licenseRef = null }, assetStore) {
  assertAssetStore(assetStore);
  const sourceBytes = asBytes(bytes);
  const checksum = await hashBytes(sourceBytes);
  const existing = Object.values(project.assets).find((asset) => asset.checksum === checksum);
  await assetStore.put(checksum, sourceBytes);
  if (existing) return { project, assetId: existing.assetId, deduplicated: true };
  const assetId = id('asset');
  const next = clone(project);
  next.assets[assetId] = { assetId, checksum, byteLength: sourceBytes.byteLength, mimeType, width, height, provenance, licenseRef, immutable: true };
  return { project: commit(next, project, 'asset.import', { assetId, checksum }), assetId, deduplicated: false };
}

export async function verifyAssetSource(project, assetId, assetStore) {
  assertAssetStore(assetStore);
  const asset = project.assets[assetId];
  if (!asset) throw new Error('asset not found');
  const bytes = await assetStore.get(asset.checksum);
  if (bytes == null) throw new Error(`source bytes missing for asset: ${assetId}`);
  const sourceBytes = asBytes(bytes);
  if (sourceBytes.byteLength !== asset.byteLength) throw new Error(`source bytes corrupt for asset: ${assetId}`);
  const checksum = await hashBytes(sourceBytes);
  if (checksum !== asset.checksum) throw new Error(`source checksum mismatch for asset: ${assetId}`);
  return sourceBytes;
}

export function applyCommand(project, command) {
  const next = clone(project);
  switch (command.type) {
    case 'artboard.add': {
      const artboardId = command.artboardId ?? id('artboard');
      next.artboards.push({ artboardId, widthMm: command.widthMm, heightMm: command.heightMm, units: 'mm', objectIds: [] });
      return commit(next, project, command.type, { artboardId });
    }
    case 'object.add': {
      if (!next.assets[command.assetId]) throw new Error('asset not found');
      const artboard = next.artboards.find((item) => item.artboardId === command.artboardId);
      if (!artboard) throw new Error('artboard not found');
      const objectId = command.objectId ?? id('object');
      next.objects[objectId] = { objectId, type: command.objectType ?? 'image', sourceAssetId: command.assetId, transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0 }, masks: [], visible: true, locked: false };
      artboard.objectIds.push(objectId);
      return commit(next, project, command.type, { objectId, artboardId: artboard.artboardId });
    }
    case 'object.transform': {
      const object = next.objects[command.objectId];
      if (!object) throw new Error('object not found');
      object.transform = { ...object.transform, ...command.transform };
      return commit(next, project, command.type, { objectId: command.objectId });
    }
    case 'body.add': {
      const bodyTargetId = command.bodyTargetId ?? id('body');
      next.bodyTargets[bodyTargetId] = { bodyTargetId, kind: command.kind, sourceAssetId: command.sourceAssetId ?? null, coordinateFrame: command.coordinateFrame, calibration: command.calibration ?? null, uncertainty: command.uncertainty ?? 'unmeasured' };
      return commit(next, project, command.type, { bodyTargetId });
    }
    case 'placement.set': {
      if (!next.objects[command.objectId]) throw new Error('object not found');
      if (!next.bodyTargets[command.bodyTargetId]) throw new Error('body target not found');
      const placementId = command.placementId ?? id('placement');
      next.placements[placementId] = { placementId, objectId: command.objectId, designRevision: project.revision, bodyTargetId: command.bodyTargetId, frame: command.frame, physicalSizeMm: command.physicalSizeMm ?? null, deformation: command.deformation ?? null };
      return commit(next, project, command.type, { placementId });
    }
    case 'review.approve': {
      const reviewId = command.reviewId ?? id('review');
      const approvedRevision = project.revision + 1;
      next.reviews[reviewId] = { reviewId, revision: approvedRevision, authorId: command.authorId, status: 'approved', createdAt: now() };
      return commit(next, project, command.type, { reviewId, approvedRevision });
    }
    default: throw new Error(`unsupported command: ${command.type}`);
  }
}

export function isApprovalCurrent(project, reviewId) {
  const review = project.reviews[reviewId];
  return Boolean(review && review.status === 'approved' && review.revision === project.revision);
}
export function serializeProject(project) { return JSON.stringify(project); }
export function reopenProject(serialized) {
  const project = JSON.parse(serialized);
  if (project.schemaVersion !== SCHEMA_VERSION) throw new Error(`unsupported schemaVersion: ${project.schemaVersion}`);
  return project;
}
function commit(next, previous, type, detail) {
  next.revision = previous.revision + 1;
  next.updatedAt = now();
  next.history.push({ revision: next.revision, type, detail, committedAt: next.updatedAt });
  return next;
}
