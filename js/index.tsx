import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./board/board";

import "../sass/checkers.sass";

const root = ReactDOM.createRoot(
  document.getElementById("checkers") as HTMLElement
);

root.render(
  <React.StrictMode>
    <h1>Simple checkers game</h1>
    <Board />
  </React.StrictMode>
);
