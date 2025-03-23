import { Rule } from 'eslint'
import { detectLayer } from './detectLayer'
import { getRuleDescription } from './getRuleDescription'
import { ELayer, TLayerPair } from '../models/Layer'
import { getRuleMessages } from './getRuleMessages'
import { isLocalImport } from './isLocalImport'
import { getLayerMaxImports, isImportLimited } from './isImportLimited'
import { hasBypassKeywords } from './hasBypassKeywords'
import { TNode } from '../models/Node'
import { buildFileShortName } from './buildFileShortName'

type TImportDataByLayerPair = Partial<Record<TLayerPair, { count: number; nodes: TNode[] }>>

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

      const importDataByLayerPair: TImportDataByLayerPair = {}

      return {
        // On each import declaration
        ImportDeclaration(node) {
          const importPath = node.source.value?.toString()
          if (!importPath || !isLocalImport(importPath)) return

          const importedLayer = detectLayer(importPath)
          if (!importedLayer) return

          const importHasBypassKeywords = hasBypassKeywords(importPath)
          if (currentFileLayer === importedLayer && importHasBypassKeywords) return

          const isImportedLayerLimited = isImportLimited(currentFileLayer, importedLayer)

          if (isImportedLayerLimited) {
            const layerPair: TLayerPair = `${currentFileLayer}/${importedLayer}`
            const previousCount = importDataByLayerPair[layerPair]?.count ?? 0
            const previousNodes = importDataByLayerPair[layerPair]?.nodes ?? []

            importDataByLayerPair[layerPair] = {
              count: previousCount + 1,
              nodes: [...previousNodes, node],
            }
          }
        },

        // At the end of the file check
        'Program:exit': () => {
          for (const [layerPair, { count, nodes }] of Object.entries(importDataByLayerPair)) {
            const [source, target] = layerPair.split('/')

            const maxAllowed = getLayerMaxImports(source as ELayer, target as ELayer)
            if (count > maxAllowed) {
              for (const node of nodes) {
                const importPath = node.source.value?.toString()

                context.report({
                  node,
                  messageId: layerPair,
                  data: {
                    sourcePath: buildFileShortName(context.filename),
                    ...(importPath && { importPath: buildFileShortName(importPath) }),
                  },
                })
              }
            }
          }
        },
      }
    },
  }
}
