export const splitPath = (fullPath: string): { dir: string; file: string } => {
  // Identify the last slash in either Unix ("/") or Windows ("\") style
  const lastSlash = Math.max(fullPath.lastIndexOf('/'), fullPath.lastIndexOf('\\'))

  if (lastSlash < 0) {
    // No slash found, treat entire string as filename
    return { dir: '', file: fullPath }
  }

  const dir = fullPath.slice(0, lastSlash)
  const file = fullPath.slice(lastSlash + 1)

  return { dir, file }
}
