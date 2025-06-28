import React from "react";
import { GreetProps } from "./greet.types";

const Greet = (props: GreetProps) => {
  return <div>Hello {props.name}</div>;
};

export default Greet;
