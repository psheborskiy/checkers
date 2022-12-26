import React from "react";
import { CheckerColor, IChecker } from "../types/checker.type";

type Props = {
  color: CheckerColor;
};

const Checker = ({ color }: Props) => {
  return (
    <span
      className={`checker ${
        color === CheckerColor.Black ? "checker-black" : "checker-white"
      }`}
    ></span>
  );
};

export default Checker;
