import { applyCommand, importAsset } from './document.js';

export async function ingestImageAsset(project, metadata, assetStore, { artboardId, objectId } = {}) {
  if (!metadata?.mimeType?.startsWith('image/')) throw new Error('image ingestion requires an image MIME type');
  if (!artboardId) throw new Error('artboardId is required');
  const imported = await importAsset(project, metadata, assetStore);
  const next = applyCommand(imported.project, {
    type: 'object.add',
    objectId,
    objectType: 'image',
    artboardId,
    assetId: imported.assetId,
  });
  return { project: next, assetId: imported.assetId, objectId: next.history.at(-1).detail.objectId, deduplicated: imported.deduplicated };
}

export async function imageAssetUrls(project, assetStore, { createUrl = defaultCreateUrl } = {}) {
  const urls = new Map();
  for (const asset of Object.values(project.assets)) {
    if (!asset.mimeType?.startsWith('image/')) continue;
    const bytes = await assetStore.get(asset.checksum);
    if (bytes == null) continue;
    urls.set(asset.assetId, createUrl(bytes, asset.mimeType));
  }
  return urls;
}

function defaultCreateUrl(bytes, mimeType) {
  return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
}
