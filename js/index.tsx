import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./board/board";

import '../sass/checkers.sass'

const root = ReactDOM.createRoot(document.getElementById("checkers") as HTMLElement);

root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);
