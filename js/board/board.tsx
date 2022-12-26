import React, { useState } from "react";
import { CheckerType } from "../types/checker.type";
import { TurnType } from "../types/turn.type";
import Cell from "./cell";

const BoardComponent = () => {
  const [state, setState] = useState({
    /** White have first turn! */
    turn: TurnType.Wtite,
    activeCell: {
      x: null,
      y: null,
      avaliableTurns: [],
    },
    board: [
      [
        null,
        { color: CheckerType.Black, y: 0, x: 1 },
        null,
        { color: CheckerType.Black, y: 0, x: 3 },
        null,
        { color: CheckerType.Black, y: 0, x: 5 },
        null,
        { color: CheckerType.Black, y: 0, x: 7 },
      ],
      [
        { color: CheckerType.Black, y: 1, x: 0 },
        null,
        { color: CheckerType.Black, y: 1, x: 2 },
        null,
        { color: CheckerType.Black, y: 1, x: 4 },
        null,
        { color: CheckerType.Black, y: 1, x: 6 },
        null,
      ],
      [
        null,
        { color: CheckerType.Black, y: 2, x: 1 },
        null,
        { color: CheckerType.Black, y: 2, x: 3 },
        null,
        { color: CheckerType.Black, y: 2, x: 5 },
        null,
        { color: CheckerType.Black, y: 2, x: 7 },
      ],
      [null, null, null, null, null, null, null, null],

      [null, null, null, null, null, null, null, null],
      [
        { color: CheckerType.Wtite, y: 5, x: 0 },
        null,
        { color: CheckerType.Wtite, y: 5, x: 2 },
        null,
        { color: CheckerType.Wtite, y: 5, x: 4 },
        null,
        { color: CheckerType.Wtite, y: 5, x: 6 },
        null,
      ],
      [
        null,
        { color: CheckerType.Wtite, y: 6, x: 1 },
        null,
        { color: CheckerType.Wtite, y: 6, x: 3 },
        null,
        { color: CheckerType.Wtite, y: 6, x: 5 },
        null,
        { color: CheckerType.Wtite, y: 6, x: 7 },
      ],
      [
        { color: CheckerType.Wtite, y: 7, x: 0 },
        null,
        { color: CheckerType.Wtite, y: 7, x: 2 },
        null,
        { color: CheckerType.Wtite, y: 7, x: 4 },
        null,
        { color: CheckerType.Wtite, y: 7, x: 6 },
        null,
      ],
    ],
  });

  const getCell = (x: number, y: number) => {
    return state.board[y][x];
  };

  const moveFigure = (newX: number, newY: number) => {
    const newBoardState = JSON.parse(JSON.stringify(state.board));
    newBoardState[state.activeCell.y][state.activeCell.x] = null;

    newBoardState[newY][newX] = JSON.parse(
      JSON.stringify(state.board[state.activeCell.y][state.activeCell.x])
    );

    setState({
      ...state,
      activeCell: {
        x: null,
        y: null,
        avaliableTurns: [],
      },
      board: newBoardState,
    });
  };

  const activateCell = (x: number, y: number) => {
    setState({
      ...state,
      activeCell: {
        x: x,
        y: y,
        avaliableTurns: showAvaliableTurns(x, y),
      },
    });

    console.info(`Active cell x:${x} | y:${y}`);
  };

  const getActiveCell = () => {
    return state.activeCell.x !== null && state.activeCell.y !== null
      ? { x: state.activeCell.x, y: state.activeCell.y }
      : null;
  };

  const showAvaliableTurns = (x: number, y: number): any[] => {
    const figure = getCell(x, y);

    if (figure?.color == CheckerType.Wtite) {
      const avaliableTurns = [];

      if (getCell(x - 1, y - 1) === null) {
        avaliableTurns.push([x - 1, y - 1]);
      }

      if (getCell(x + 1, y - 1) === null) {
        avaliableTurns.push([x + 1, y - 1]);
      }

      return avaliableTurns;
    }

    if (figure?.color == CheckerType.Black) {
      const avaliableTurns = [];

      if (getCell(x - 1, y + 1) === null) {
        avaliableTurns.push([x - 1, y + 1]);
      }

      if (getCell(x + 1, y + 1) === null) {
        avaliableTurns.push([x + 1, y + 1]);
      }

      return avaliableTurns;
    }

    return [];
  };

  return (
    <>
      <h1>Simple checkers game</h1>
      <div className="board">
        {state.board.map((y, yindex) => {
          return (
            <React.Fragment key={yindex + "col"}>
              <div>{y.length - yindex}</div>
              {y.map((figure, xindex) => {
                return (
                  <Cell
                    key={"" + xindex + yindex}
                    x={xindex}
                    y={yindex}
                    figure={figure}
                    board={state.board}
                    highlited={state.activeCell.avaliableTurns.find(
                      (coords) => coords[0] == xindex && coords[1] == yindex
                    )}
                    getActiveCell={getActiveCell}
                    activateCell={activateCell}
                    moveFigure={moveFigure}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {["", "a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
          <div key={letter + 100}>{letter}</div>
        ))}
      </div>
    </>
  );
};

export default BoardComponent;
