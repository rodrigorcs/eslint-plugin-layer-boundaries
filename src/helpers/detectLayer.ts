import { ELayer } from '../models/Layer'
import { splitPath } from './splitPath'

const importMap = {
  [ELayer.CONTROLLER]: {
    fileDirectory: ['/controllers', 'Controllers'],
    fileName: ['Controller'],
  },
  [ELayer.ACTION]: {
    fileDirectory: ['/actions', 'Actions'],
    fileName: ['Action'],
  },
  [ELayer.SERVICE]: {
    fileDirectory: ['/services', 'Services'],
    fileName: ['Service'],
  },
  [ELayer.REPOSITORY]: {
    fileDirectory: ['/repositories', 'Repositories'],
    fileName: ['Repository'],
  },
} as const

export function detectLayer(filePath: string): ELayer | null {
  const { dir: fileDir, file: fileName } = splitPath(filePath)

  for (const layerKey of Object.values(ELayer)) {
    const { fileDirectory: recognizedDirectories, fileName: recognizedFileNames } =
      importMap[layerKey]

    const matchesDirectory = recognizedDirectories.some((recognizedDirectory) =>
      fileDir.includes(recognizedDirectory),
    )
    if (matchesDirectory) return layerKey

    const matchesFileName = recognizedFileNames.some((recognizedFileName) =>
      fileName.includes(recognizedFileName),
    )
    if (matchesFileName) return layerKey
  }

  return null
}
