export enum CheckerType {
  Wtite = 1,
  Black = 2
}

export interface IChecker {
  color: CheckerType
}

export interface ICoords {
  x: number
  y: number
}