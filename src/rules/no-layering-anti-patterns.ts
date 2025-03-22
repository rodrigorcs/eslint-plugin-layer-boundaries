import type { Rule } from 'eslint'

export const noRepositoryAntiPatterns: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Repository files cannot import controllers, actions, or services.',
      recommended: false,
    },
    messages: {
      forbiddenImport: "A repository file cannot import '{{importLayer}}' (in '{{importPath}}').",
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename().toLowerCase()

    // Determine if we're in a "repository" file:
    // Adjust these checks to your actual folder/file structure
    const isRepository = filename.includes('/repositories/') || filename.includes('repository')

    // If not a repository file, do nothing
    if (!isRepository) {
      return {}
    }

    // Helper: check if it's a local import (starting with "." or "/")
    function isLocalImport(importPath: string): boolean {
      return importPath.startsWith('.') || importPath.startsWith('/')
    }

    // Identify which layer the import is referencing
    function getImportLayer(importPath: string): string | null {
      const lower = importPath.toLowerCase()
      if (lower.includes('controller')) return 'controller'
      if (lower.includes('action')) return 'action'
      if (lower.includes('service')) return 'service'
      return null
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value?.toString()
        if (!importPath) return

        // Skip external libraries (e.g., "lodash", "axios", etc.)
        if (!isLocalImport(importPath)) return

        const importLayer = getImportLayer(importPath)
        // If it matches one of the forbidden layers, report
        if (importLayer === 'controller' || importLayer === 'action' || importLayer === 'service') {
          context.report({
            node,
            messageId: 'forbiddenImport',
            data: {
              importLayer,
              importPath,
            },
          })
        }
      },
    }
  },
}
