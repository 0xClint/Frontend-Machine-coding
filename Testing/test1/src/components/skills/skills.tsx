import React, { useEffect, useState } from "react";
import { SkillsProps } from "./skills.type";

export const Skills = (props: SkillsProps) => {
  const { skills } = props;
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoggedIn(true), 2000);
  }, []);
  return (
    <>
      <ul>
        {skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>

      {isLoggedIn ? (
        <button>Start learning</button>
      ) : (
        <button onClick={() => setLoggedIn(true)}>Login</button>
      )}
    </>
  );
};
