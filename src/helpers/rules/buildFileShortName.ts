import { ELayer } from '../../models/Layer'
import { splitPath } from '../common'

export const buildFileShortName = (filePath: string): string => {
  const { dir: fileDir, file: fileName } = splitPath(filePath)
  const fileFolder = fileDir.split('/').pop()
  const fileNameWithoutExtension = fileName.split('.')[0]

  if (!fileFolder?.length) return fileNameWithoutExtension

  const fileFolderIsRelativePath = ['.', '..'].includes(fileFolder)
  if (fileFolderIsRelativePath) return fileNameWithoutExtension

  const fileNameIsLayerName = (Object.values(ELayer) as string[]).includes(
    fileNameWithoutExtension.toLowerCase(),
  )
  const fileNameIsIndex = fileNameWithoutExtension.toLowerCase() === 'index'

  if (fileNameIsLayerName) return `${fileFolder}/${fileNameWithoutExtension}`
  if (fileNameIsIndex) return fileFolder

  return fileNameWithoutExtension
}
