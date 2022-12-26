import React from "react";
import { CheckerType, IChecker } from "../types/checker.type";

type Props = {
  color: CheckerType;
};

const Checker = ({ color }: Props) => {
  return (
    <span
      className={`checker ${
        color === CheckerType.Black ? "checker-black" : "checker-white"
      }`}
    ></span>
  );
};

export default Checker;
