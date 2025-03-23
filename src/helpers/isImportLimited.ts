import { ELayer } from '../models/Layer'

export const limitedLayersMap = {
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
} as const

const getLimitedLayers = (importingLayer: ELayer) => {
  return limitedLayersMap[importingLayer]
}

export const isImportLimited = (importingLayer: ELayer, importedLayer: string) => {
  const forbiddenLayers = getLimitedLayers(importingLayer)
  const forbiddenLayer = forbiddenLayers.find((layer) => layer.layer === importedLayer)

  if (!forbiddenLayer) return false

  return true
}

export const getLayerMaxImports = (importingLayer: ELayer, importedLayer: ELayer) => {
  const limitedLayers = getLimitedLayers(importingLayer)
  const limitedLayer = limitedLayers.find(
    ({ layer: limitedLayer }) => limitedLayer === importedLayer,
  )

  if (!limitedLayer) return Infinity

  return limitedLayer.maxImports
}
