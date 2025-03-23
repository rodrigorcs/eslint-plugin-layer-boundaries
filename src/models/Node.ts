/*
 * This is getting the Node type from the eslint library.
 * The type is not directly exported from the library, so we need to infer the type from the `ImportDeclaration` function type, which is exported by the `Rule` type.
 */

import { Rule } from 'eslint'

type ImportDeclarationFn = Rule.NodeListener['ImportDeclaration']
type ImportDeclarationFnParams = Parameters<Exclude<ImportDeclarationFn, undefined>>
type ImportDeclaration = ImportDeclarationFnParams[0]

export type TNode = ImportDeclaration & Rule.NodeParentExtension
