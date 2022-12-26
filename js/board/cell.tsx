import React from "react";
import Checker from "../checker/checker";

const Cell = ({x, y, figure, getActiveCell, activateCell, moveFigure}) => {
  const onCellClick = (x, y) => {
    const active = getActiveCell();

    if (active) {
      moveFigure(x, y);
    } else {
      activateCell(x, y);
    }
  }

  const onCheckerClick = () => {

  }

  const isEmpty = () => {
    
  }

  return <div onClick={() => onCellClick(x, y)}
  className={`item ${(x + y) % 2 === 0 ? "white" : "black"}`}>
  {
    figure ? 
      <Checker onCheckerClick={onCheckerClick} {...figure} /> :
    null
  }
  
</div>
}


export default Cell;