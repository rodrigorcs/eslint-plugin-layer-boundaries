import { ELayer } from '../models/Layer'

export const forbiddenLayersMap = {
  [ELayer.CONTROLLER]: [
    { layer: ELayer.SERVICE, maxImports: 1 },
    { layer: ELayer.REPOSITORY, maxImports: 0 },
  ],
  [ELayer.ACTION]: [
    { layer: ELayer.CONTROLLER, maxImports: 0 },
    { layer: ELayer.ACTION, maxImports: 0 },
    { layer: ELayer.REPOSITORY, maxImports: 0 },
  ],
  [ELayer.SERVICE]: [
    { layer: ELayer.CONTROLLER, maxImports: 0 },
    { layer: ELayer.ACTION, maxImports: 0 },
    { layer: ELayer.SERVICE, maxImports: 0 },
    { layer: ELayer.REPOSITORY, maxImports: 1 },
  ],
  [ELayer.REPOSITORY]: [
    { layer: ELayer.CONTROLLER, maxImports: 0 },
    { layer: ELayer.ACTION, maxImports: 0 },
    { layer: ELayer.SERVICE, maxImports: 0 },
    { layer: ELayer.REPOSITORY, maxImports: 0 },
  ],
}

const getForbiddenLayers = (importingLayer: ELayer) => {
  return forbiddenLayersMap[importingLayer]
}

export const isImportForbidden = (importingLayer: ELayer, importedLayer: string) => {
  const forbiddenLayers = getForbiddenLayers(importingLayer)
  const forbiddenLayer = forbiddenLayers.find((layer) => layer.layer === importedLayer)

  if (!forbiddenLayer) return false

  return forbiddenLayer.maxImports === 0 // TODO: Support multiple imports maxLimit
}
