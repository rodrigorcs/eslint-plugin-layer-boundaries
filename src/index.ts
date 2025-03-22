import { buildRule } from './helpers/buildRule'
import { ELayer } from './models/Layer'

module.exports = {
  rules: {
    'no-controller-anti-patterns': buildRule(ELayer.CONTROLLER),
    'no-action-anti-patterns': buildRule(ELayer.ACTION),
    'no-service-anti-patterns': buildRule(ELayer.SERVICE),
    'no-repository-anti-patterns': buildRule(ELayer.REPOSITORY),
  },
  configs: {
    recommended: {
      rules: {
        'layer-boundaries/no-controller-anti-patterns': 'error',
        'layer-boundaries/no-action-anti-patterns': 'error',
        'layer-boundaries/no-service-anti-patterns': 'error',
        'layer-boundaries/no-repository-anti-patterns': 'error',
      },
      overrides: [
        {
          files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/tests/**'],
          rules: {
            'layer-boundaries/no-controller-anti-patterns': 'off',
            'layer-boundaries/no-action-anti-patterns': 'off',
            'layer-boundaries/no-service-anti-patterns': 'off',
            'layer-boundaries/no-repository-anti-patterns': 'off',
          },
        },
      ],
    },
  },
}
