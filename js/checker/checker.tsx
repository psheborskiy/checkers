import React from "react";
import { CheckerType, IChecker } from "../types/checker.type";

type Props = {
  color: CheckerType;
  x: number,
  y: number,
  board: IChecker[][],
  onCheckerClick: any
};

const Checker = ({color, board, onCheckerClick}: Props) => {

  const canMove = () => {
    return true;
  }

  const getAvaliableMoves = () => {

  }

  return <span 
  onClick={getAvaliableMoves}
  className={`checker ${color === CheckerType.Black ? "checker-black" : "checker-white"}`}></span>
}

export default Checker;