import React, { useState } from "react";
import "./Stepper.css";

export const Stepper = ({ stepsConfig = [] }) => {
  const [currStep, setCurrStep] = useState(1);
  const [isCompleted, setCompleted] = useState(false);

  const handleNext = () => {
    console.log(currStep);
    if (currStep === stepsConfig.length) {
      setCompleted(true);
      return;
    }

    setCurrStep((prev) => prev + 1);
  };
  console.log(currStep);
  return (
    <div className="stepper">
      <h1>Stepper</h1>
      <div className="stepper-container">
        <div className="progress-bar">
          <div className="progress" style={{ "--temp-width:": 100 }}></div>
        </div>
        {stepsConfig?.map(({ name, Component }, index) => {
          return (
            <div className="stepper-item" key={name}>
              <div
                className={`circle ${currStep > index + 1 ? "completed" : ""}`}
              >
                {currStep > index + 1 ? "✔️" : index + 1}
              </div>
              <span className="stepper-title">{name}</span>
            </div>
          );
        })}
      </div>

      <div className="btn-cointainer">
        <button className="btn">Previous</button>
        <button className="btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
