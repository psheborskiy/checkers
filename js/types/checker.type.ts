export enum CheckerType {
  Wtite = 1,
  Black = 2
}

export interface IChecker {
  color: CheckerType,
  // type: String
}