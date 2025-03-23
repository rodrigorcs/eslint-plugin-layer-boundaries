import { ELayer } from '../../models/Layer'
import { getLimitedLayers } from '.'

export const isImportLimited = (importingLayer: ELayer, importedLayer: string) => {
  const limitedLayers = getLimitedLayers(importingLayer)
  const limitedLayer = limitedLayers.find(
    ({ layer: limitedLayer }) => limitedLayer === importedLayer,
  )

  if (!limitedLayer) return false

  return true
}
