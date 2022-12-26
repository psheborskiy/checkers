import React from "react";
import Checker from "../checker/checker";

const Cell = ({x, y, figure, board, highlited, getActiveCell, activateCell, moveFigure}) => {
  const onCellClick = (x, y) => {
    const active = getActiveCell();

    if (active && board[y][x] === null) {
      moveFigure(x, y);
    } else {
      activateCell(x, y);
    }
  }

  const onCheckerClick = () => {

  }

  return <div onClick={() => onCellClick(x, y)}
  className={`item ${(x + y) % 2 === 0 ? "white" : "black"}`}>
  {
    figure ? 
      <Checker 
        board={board} 
        onCheckerClick={onCheckerClick} 
        {...figure} 
      /> :
    highlited ? 
      <span className="highlited"></span>
    :
    null
  }
  
</div>
}


export default Cell;