import React from "react";
import Checker from "../checker/checker";
import { IChecker, ICoords } from "../types/checker.type";

type TCell = {
  x: number;
  y: number;
  checker: IChecker;
  board: IChecker[][];

  highlited: boolean;
  getActiveCell: () => ICoords | null;
  activateCell: (x: number, y: number) => void;
  moveFigure: (x: number, y: number) => void;
};

const Cell = ({
  x,
  y,
  checker,
  board,
  highlited,
  getActiveCell,
  activateCell,
  moveFigure,
}: TCell) => {
  const onCellClick = (x: number, y: number) => {
    const active = getActiveCell();

    if (active && board[y][x] === null) {
      moveFigure(x, y);
    } else {
      activateCell(x, y);
    }
  };

  return (
    <div
      onClick={() => onCellClick(x, y)}
      className={`item ${(x + y) % 2 === 0 ? "white" : "black"}`}
    >
      {checker ? (
        <Checker {...checker} />
      ) : highlited ? (
        <span className="highlited"></span>
      ) : null}
    </div>
  );
};

export default Cell;
