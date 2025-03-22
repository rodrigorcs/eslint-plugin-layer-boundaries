export const isLocalImport = (importPath: string): boolean => {
  return importPath.startsWith('.') || importPath.startsWith('/')
}
