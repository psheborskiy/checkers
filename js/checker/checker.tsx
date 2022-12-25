import React from "react";
import { CheckerType } from "../types/checer.type";

type Props = {
  type: number;
};

const Checker = ({type}: Props) => {
  return <span className={`checker ${type === CheckerType.Black ? "checker-black" : "checker-white"}`}></span>
}

export default Checker;