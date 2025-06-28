import { useEffect, useRef, useState } from "react";

interface iTimeFormat {
  hour: string | number;
  minute: string | number;
  second: string | number;
}

enum timeType {
  hour = "hour",
  minute = "minute",
  second = "second",
}

export default function CountDown() {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<iTimeFormat>({
    hour: "",
    minute: "",
    second: "",
  });

  const timeRef = useRef<any>(null);

  //   useEffect(() => {});

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: timeType
  ) => {
    const value = parseInt(e.target.value, 10) || 0;
    const copyTime: iTimeFormat = { ...time };

    copyTime[type] = value;

    copyTime.minute += Math.floor(copyTime.second / 60);

    setTime(copyTime);
  };

  const handleStart = () => {
    setRunning(!isRunning);
  };

  return (
    <div>
      <h2>CountDown</h2>
      <span>
        <input
          type="text"
          value={time.hour}
          placeholder="HH"
          onChange={(e) => handleInput(e, timeType.hour)}
        />
        :
        <input
          type="text"
          value={time.minute}
          placeholder="MM"
          onChange={(e) => handleInput(e, timeType.minute)}
        />
        :
        <input
          type="text"
          disabled={isRunning}
          value={time.second}
          placeholder="SS"
          onChange={(e) => handleInput(e, timeType.second)}
        />
      </span>
      <div>
        <button onClick={handleStart}>{!isRunning ? "Start" : "Pause"}</button>
      </div>
    </div>
  );
}
