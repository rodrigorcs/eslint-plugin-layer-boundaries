import { ELayer } from '../models/Layer'

export const getRuleDescription = (layer: ELayer) => {
  const ruleDescriptionMap: Record<ELayer, string> = {
    [ELayer.CONTROLLER]:
      'Controllers cannot import multiple services or repositories. Only import actions or a single service.',
    [ELayer.ACTION]:
      'Actions cannot import controllers, other actions or repositories. Only import services',
    [ELayer.SERVICE]:
      'Services cannot import controllers, actions or other services. Only import repostories.',
    [ELayer.REPOSITORY]:
      'Repositories cannot import controllers, actions, services or other repositories.',
  }

  return ruleDescriptionMap[layer]
}
