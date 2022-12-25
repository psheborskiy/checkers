import React, { useState } from "react";
import Checker from "../checker/checker";
import { CheckerType } from "../types/checer.type";

const BoardComponent = () => {
  const [board, setBoard] = useState([
    [null, CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black],
    [CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black, null],
    [null, CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black, null, CheckerType.Black],
    [null, null, null, null, null, null, null, null],
    
    [null, null, null, null, null, null, null, null],
    [CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite, null],
    [null, CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite],
    [CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite, null, CheckerType.Wtite, null]
  ]);

  return (
    <>
      <h1>Simple checkers game</h1>
      <div className="board">
        {board.map((y, yindex) => {
          return (
            <React.Fragment key={yindex+'col'}>
              <div>{y.length - yindex}</div>
              {y.map((element, xindex) => {
                return (
                  <div
                    key={""+xindex+yindex}
                    className={`item ${(yindex + xindex) % 2 === 0 ? "white" : "black"}`}
                  >
                    {
                      element === CheckerType.Black ? 
                        <Checker type={CheckerType.Black} /> :
                      element === CheckerType.Wtite ? 
                        <Checker type={CheckerType.Wtite} /> : 
                      null
                    }
                    
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        {["", "a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
          <div key={letter+100}>{letter}</div>
        ))}
      </div>
    </>
  );
};

export default BoardComponent;
