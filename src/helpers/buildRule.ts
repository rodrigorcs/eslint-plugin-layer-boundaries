import { Rule } from 'eslint'
import { detectLayer } from './detectLayer'
import { getRuleDescription } from './getRuleDescription'
import { ELayer } from '../models/Layer'
import { getRuleMessages } from './getRuleMessages'
import { isLocalImport } from './isLocalImport'
import { isImportForbidden } from './isImportForbidden'
import { hasBypassKeywords } from './hasBypassKeywords'

export const buildRule: (ruleLayer: ELayer) => Rule.RuleModule = (ruleLayer) => {
  return {
    meta: {
      type: 'problem',
      docs: {
        description: getRuleDescription(ruleLayer),
        recommended: true,
      },
      fixable: undefined, // Not fixable
      hasSuggestions: true,
      messages: getRuleMessages(ruleLayer),
      schema: [],
    },

    create(context) {
      const currentFileLayer = detectLayer(context.filename)
      if (currentFileLayer !== ruleLayer) return {}

      return {
        ImportDeclaration(node) {
          const importPath = node.source.value?.toString()
          if (!importPath || !isLocalImport(importPath)) return

          const importedLayer = detectLayer(importPath)
          if (!importedLayer) return

          const importHasBypassKeywords = hasBypassKeywords(importPath)
          if (currentFileLayer === importedLayer && importHasBypassKeywords) return

          const isImportedLayerForbidden = isImportForbidden(currentFileLayer, importedLayer)

          if (isImportedLayerForbidden) {
            context.report({
              node,
              messageId: `${currentFileLayer}/${importedLayer}`,
              data: {
                importPath,
              },
            })
          }
        },
      }
    },
  }
}
