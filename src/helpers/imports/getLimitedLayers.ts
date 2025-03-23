import { ELayer } from '../../models/Layer'

const limitedLayersMap = {
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

export const getLimitedLayers = (importingLayer: ELayer) => {
  return limitedLayersMap[importingLayer]
}
