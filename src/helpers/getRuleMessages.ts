import { ELayer } from '../models/Layer'

export const getRuleMessages = (layer: ELayer) => {
  const ruleMessagesMap: Record<ELayer, Partial<Record<`${ELayer}/${ELayer}`, string>>> = {
    [ELayer.CONTROLLER]: {
      [`${ELayer.CONTROLLER}/${ELayer.SERVICE}`]:
        'Controllers cannot import multiple services. Use an action instead.',
      [`${ELayer.CONTROLLER}/${ELayer.REPOSITORY}`]:
        'Controllers cannot import repositories. Use an action/service to handle the business rules.',
    },
    [ELayer.ACTION]: {
      [`${ELayer.ACTION}/${ELayer.CONTROLLER}`]: 'Actions cannot import controllers.',
      [`${ELayer.ACTION}/${ELayer.ACTION}`]: 'Actions cannot import other actions.',
      [`${ELayer.ACTION}/${ELayer.REPOSITORY}`]:
        'Actions cannot import repositories. Use a service to handle the business rules in a specific domain.',
    },
    [ELayer.SERVICE]: {
      [`${ELayer.SERVICE}/${ELayer.CONTROLLER}`]: 'Services cannot import controllers.',
      [`${ELayer.SERVICE}/${ELayer.ACTION}`]: 'Services cannot import actions.',
      [`${ELayer.SERVICE}/${ELayer.SERVICE}`]:
        'Services cannot import other services. Use a higher level action to perform cross-domain operations.',
      [`${ELayer.SERVICE}/${ELayer.REPOSITORY}`]:
        'Services cannot import multiple repositories. Use a service from another domain.',
    },
    [ELayer.REPOSITORY]: {
      [`${ELayer.REPOSITORY}/${ELayer.CONTROLLER}`]: 'Repositories cannot import controllers.',
      [`${ELayer.REPOSITORY}/${ELayer.ACTION}`]: 'Repositories cannot import actions.',
      [`${ELayer.REPOSITORY}/${ELayer.SERVICE}`]:
        'Repositories cannot import services. Use a higher level action to perform cross-domain operations.',
      [`${ELayer.REPOSITORY}/${ELayer.REPOSITORY}`]:
        'Repositories cannot import other repositories. Use a higher level action to perform cross-domain operations.',
    },
  }

  const messagesObj = ruleMessagesMap[layer]

  const messagesWithSuffix: Partial<Record<`${ELayer}/${ELayer}`, string>> = {}
  for (const [layer, message] of Object.entries(messagesObj)) {
    messagesWithSuffix[layer as `${ELayer}/${ELayer}`] = `${message} (in '{{importPath}}').`
  }

  return messagesWithSuffix
}
