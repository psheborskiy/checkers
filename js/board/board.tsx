import React, { useState } from "react";
import { CheckerColor, CheckerType, IChecker } from "../types/checker.type";
import Cell from "./cell";

const BoardComponent = () => {
  const [state, setState] = useState({
    /** White have first turn! */
    turn: CheckerColor.White,
    activeCell: {
      x: null,
      y: null,
      avaliableTurns: [],
    },
    board: [
      [
        null,
        { color: CheckerColor.Black, y: 0, x: 1, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 0, x: 3, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 0, x: 5, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 0, x: 7, type: CheckerType.checker },
      ],
      [
        { color: CheckerColor.Black, y: 1, x: 0, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 1, x: 2, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 1, x: 4, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 1, x: 6, type: CheckerType.checker },
        null,
      ],
      [
        null,
        { color: CheckerColor.Black, y: 2, x: 1, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 2, x: 3, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 2, x: 5, type: CheckerType.checker },
        null,
        { color: CheckerColor.Black, y: 2, x: 7, type: CheckerType.checker },
      ],
      [null, null, null, null, null, null, null, null],

      [null, null, null, null, null, null, null, null],
      [
        { color: CheckerColor.White, y: 5, x: 0, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 5, x: 2, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 5, x: 4, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 5, x: 6, type: CheckerType.checker },
        null,
      ],
      [
        null,
        { color: CheckerColor.White, y: 6, x: 1, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 6, x: 3, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 6, x: 5, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 6, x: 7, type: CheckerType.checker },
      ],
      [
        { color: CheckerColor.White, y: 7, x: 0, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 7, x: 2, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 7, x: 4, type: CheckerType.checker },
        null,
        { color: CheckerColor.White, y: 7, x: 6, type: CheckerType.checker },
        null,
      ],
    ],
  });

  const getCell = (x: number, y: number) => {
    return state.board?.[y]?.[x];
  };

  const nextTurn = () => {
    return state.turn === CheckerColor.Black
      ? CheckerColor.White
      : CheckerColor.Black;
  };

  const moveFigure = (newX: number, newY: number) => {
    if (
      state.activeCell.avaliableTurns.find(
        (coords) => coords[0] == newX && coords[1] == newY
      )
    ) {
      /** remove checker from board */
      const newBoardState = JSON.parse(JSON.stringify(state.board));
      newBoardState[state.activeCell.y][state.activeCell.x] = null;

      /** if attack - remove enemy checker */
      const whiteAttackSuccess = attackWhite(
        state.activeCell.x,
        state.activeCell.y,
        newX,
        newY,
        newBoardState
      );

      const blackAttackSuccess = attackBlack(
        state.activeCell.x,
        state.activeCell.y,
        newX,
        newY,
        newBoardState
      );

      /** put checker back */
      newBoardState[newY][newX] = JSON.parse(
        JSON.stringify(state.board[state.activeCell.y][state.activeCell.x])
      );

      /** calculate if second attack possible */
      const possibleAttacks = showAvaliableAttacks(state.turn, newX, newY);
      const canAttack =
        possibleAttacks.length > 0 &&
        (blackAttackSuccess || whiteAttackSuccess);

      setState({
        ...state,
        ...(!canAttack
          ? {
              turn: nextTurn(),
            }
          : {}),
        activeCell: {
          x: null,
          y: null,
          avaliableTurns: [],
        },
        board: newBoardState,
      });
    }
  };

  /** true if attac was success */
  const attackWhite = (
    x: number,
    y: number,
    newX: number,
    newY: number,
    boardInstance: IChecker[][]
  ): boolean => {
    /** white right attach */
    if (
      newX - x == 2 &&
      y - newY == 2 &&
      getCell(x + 1, y - 1)?.color == CheckerColor.Black
    ) {
      boardInstance[y - 1][x + 1] = null;

      return true;
    }

    /** white left attach */
    if (
      x - newX == 2 &&
      y - newY == 2 &&
      getCell(x - 1, y - 1)?.color == CheckerColor.Black
    ) {
      boardInstance[y - 1][x - 1] = null;

      return true;
    }

    return false;
  };

  /** true if attac was success */
  const attackBlack = (
    x: number,
    y: number,
    newX: number,
    newY: number,
    boardInstance: IChecker[][]
  ): boolean => {
    /** black right attach */
    if (
      newX - x == 2 &&
      newY - y == 2 &&
      getCell(x + 1, y + 1)?.color == CheckerColor.White
    ) {
      boardInstance[y + 1][x + 1] = null;

      return true;
    }

    /** black left attach */
    if (
      x - newX == 2 &&
      newY - y == 2 &&
      getCell(x - 1, y + 1)?.color == CheckerColor.White
    ) {
      boardInstance[y + 1][x - 1] = null;

      return true;
    }

    return false;
  };

  const activateCell = (x: number, y: number) => {
    if (getCell(x, y)?.color == state.turn) {
      setState({
        ...state,
        activeCell: {
          x: x,
          y: y,
          avaliableTurns: showAvaliableTurns(x, y),
        },
      });

      console.info(`Active cell x:${x} | y:${y}`);
    }
  };

  const getActiveCell = () => {
    return state.activeCell.x !== null && state.activeCell.y !== null
      ? { x: state.activeCell.x, y: state.activeCell.y }
      : null;
  };

  const showAvaliableTurns = (x: number, y: number): any[] => {
    const figure = getCell(x, y);

    if (
      figure?.color == CheckerColor.White &&
      figure.type == CheckerType.checker
    ) {
      const avaliableTurns = [];

      /** Simple turn left */
      if (getCell(x - 1, y - 1) === null) {
        avaliableTurns.push([x - 1, y - 1]);
      }

      /** Simple turn rigth */
      if (getCell(x + 1, y - 1) === null) {
        avaliableTurns.push([x + 1, y - 1]);
      }

      const avaliableAttacks = showAvaliableAttacks(CheckerColor.White, x, y);

      return [...avaliableTurns, ...avaliableAttacks];
    }

    if (
      figure?.color == CheckerColor.Black &&
      figure.type == CheckerType.checker
    ) {
      const avaliableTurns = [];

      /** Simple turn left */
      if (getCell(x - 1, y + 1) === null) {
        avaliableTurns.push([x - 1, y + 1]);
      }

      /** Simple turn rigth */
      if (getCell(x + 1, y + 1) === null) {
        avaliableTurns.push([x + 1, y + 1]);
      }

      const avaliableAttacks = showAvaliableAttacks(CheckerColor.Black, x, y);

      return [...avaliableTurns, ...avaliableAttacks];
    }

    return [];
  };

  const showAvaliableAttacks = (
    checker: CheckerColor,
    x: number,
    y: number
  ): any[] => {
    const avaliableAttacks = [];

    if (checker === CheckerColor.White) {
      /** Attack turn left */
      if (
        getCell(x - 2, y - 2) === null &&
        getCell(x - 1, y - 1)?.color === CheckerColor.Black
      ) {
        avaliableAttacks.push([x - 2, y - 2]);
      }

      /** Attack turn right */
      if (
        getCell(x + 2, y - 2) === null &&
        getCell(x + 1, y - 1)?.color === CheckerColor.Black
      ) {
        avaliableAttacks.push([x + 2, y - 2]);
      }
    } else {
      /** Attack turn left */
      if (
        getCell(x - 2, y + 2) === null &&
        getCell(x - 1, y + 1)?.color === CheckerColor.White
      ) {
        avaliableAttacks.push([x - 2, y + 2]);
      }

      /** Attack turn right */
      if (
        getCell(x + 2, y + 2) === null &&
        getCell(x + 1, y + 1)?.color === CheckerColor.White
      ) {
        avaliableAttacks.push([x + 2, y + 2]);
      }
    }

    return avaliableAttacks;
  };

  const getScore = (type: CheckerColor) => {
    let figures = 0;

    for (let i = 0; i < state.board.length; i++)
      for (let j = 0; j < state.board[i].length; j++) {
        if (state.board?.[j]?.[i]?.color === type) {
          ++figures;
        }
      }

    return Math.abs(figures - 12);
  };

  return (
    <>
      <section className="status">
        <div className="score">
          <div className="score-item">
            Black: {getScore(CheckerColor.Black)} | White:{" "}
            {getScore(CheckerColor.White)}
          </div>
        </div>
        <div className="turn">
          <b>
            Turn: <i>{state.turn === CheckerColor.Black ? "black" : "white"}</i>
          </b>
        </div>
      </section>
      <section className="board">
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
                    checker={figure}
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
      </section>
    </>
  );
};

export default BoardComponent;
