export enum CheckerColor {
  Wtite = 1,
  Black = 2
}

export enum CheckerType {
  checker = 1,
  lady = 2
}

export interface IChecker {
  color: CheckerColor
  type: CheckerType
}

export interface ICoords {
  x: number
  y: number
}