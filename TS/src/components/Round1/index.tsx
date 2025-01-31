import { useEffect, useState } from "react";

const logData = [...Array(10).keys()];

export default function Round1() {
  const [logText, setLogText] = useState<string[]>([]);
  const [textValue, setTextValue] = useState<string>("");

  const delay = async (time: number) => {
    await new Promise((reslove) => setTimeout(reslove, time));
  };

  const handleLog = async () => {
    for (let i = 0; i < logData.length; i++) {
      await delay(1000);
      setLogText((prevState) => [...prevState, (logData[i] + 1).toString()]);
    }
  };

  const isNumber = (str: string) => {
    if (str.length === 0) return false;

    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0))
        continue;
      else return false;
    }
    // console.log(str.charCodeAt(0));
    // return str.length === 8 && /^[0-9]+$/.test(str);
    return str.length === 8;
  };

  useEffect(() => {
    const convert12To24 = (str: string) => {
      let [time, stat] = str.split(" ");
      let [hr, minute] = time.split(":");

      if (hr === "12") hr = "00";

      if (stat === "PM") hr = `${parseInt(hr) + 12}`;
      console.log(`${hr}:${minute}`);
    };

    convert12To24("12:00 AM");
    convert12To24("12:00 PM");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <button onClick={handleLog}>Start Log</button>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {logText.map((item) => (
          <span key={item}>Log {item}</span>
        ))}
      </span>
      <div>
        <form>
          <label>Enter Text</label>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button
            type="submit"
            disabled={!isNumber(textValue)}
            // disabled={true}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
