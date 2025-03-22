export const hasBypassKeywords = (importPath: string): boolean => {
  const bypassKeywords = ['base', 'generic', 'global', 'common', 'shared', 'utils', 'helpers']

  const formattedBypassKeywords = bypassKeywords.flatMap((keyword) => {
    const [firstChar, ...rest] = keyword
    const capitalizedKeyword = [firstChar.toUpperCase(), ...rest].join('')

    return [`/${keyword}/`, `${capitalizedKeyword}`]
  })

  return formattedBypassKeywords.some((keyword) => importPath.includes(keyword))
}
