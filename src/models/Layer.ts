export enum ELayer {
  ACTION = 'action',
  CONTROLLER = 'controller',
  SERVICE = 'service',
  REPOSITORY = 'repository',
}

export type TLayerPair = `${ELayer}/${ELayer}`
