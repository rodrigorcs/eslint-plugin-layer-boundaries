export const isLocalImport = (importPath: string): boolean => {
  const localImportPrefixes = ['.', '/', '@/']

  return localImportPrefixes.some((prefix) => importPath.startsWith(prefix))
}
