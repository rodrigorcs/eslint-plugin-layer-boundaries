import { ELayer } from '../models/Layer'

const importMap = {
  [ELayer.CONTROLLER]: {
    fileDirectory: ['/controllers', 'Controllers'],
    fileName: ['controller'],
  },
  [ELayer.ACTION]: {
    fileDirectory: ['/actions', 'Actions'],
    fileName: ['action'],
  },
  [ELayer.SERVICE]: {
    fileDirectory: ['/services', 'Services'],
    fileName: ['service'],
  },
  [ELayer.REPOSITORY]: {
    fileDirectory: ['/repositories', 'Repositories'],
    fileName: ['repository'],
  },
} as const

export function detectLayer(filePath: string): ELayer | null {
  const lowercasePath = filePath.toLowerCase()

  for (const layerKey of Object.values(ELayer)) {
    const { fileDirectory, fileName } = importMap[layerKey]

    const matchesDirectory = fileDirectory.some((dir) => lowercasePath.includes(dir.toLowerCase()))
    const matchesFileName = fileName.some((fname) => lowercasePath.includes(fname.toLowerCase()))

    if (matchesDirectory || matchesFileName) return layerKey
  }

  return null
}
