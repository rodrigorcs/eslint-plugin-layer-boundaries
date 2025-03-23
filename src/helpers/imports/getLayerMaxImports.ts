import { ELayer } from '../../models/Layer'
import { getLimitedLayers } from '.'

export const getLayerMaxImports = (importingLayer: ELayer, importedLayer: ELayer) => {
  const limitedLayers = getLimitedLayers(importingLayer)
  const limitedLayer = limitedLayers.find(
    ({ layer: limitedLayer }) => limitedLayer === importedLayer,
  )

  if (!limitedLayer) return Infinity

  return limitedLayer.maxImports
}
