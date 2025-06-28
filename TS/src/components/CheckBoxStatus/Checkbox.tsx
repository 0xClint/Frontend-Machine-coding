import { useEffect, useRef } from "react";
import { Estatus, Istatus } from "./Data";

interface Icheckbox {
  data: Istatus;
  handleToggleCheckBox: (id: number | string) => void;
}

export default function Checkbox({
  data,
  handleToggleCheckBox = () => {},
}: Icheckbox) {
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkBoxRef.current) {
      checkBoxRef.current.indeterminate = data.status === Estatus.INDETERMINATE;
    }
  }, [data.status]);
  return (
    <div style={{ margin: "10px 0px 10px 15px" }}>
      <span>
        <input
          ref={checkBoxRef}
          type="checkbox"
          style={{ cursor: "pointer" }}
          checked={data.status === Estatus.CHECKED}
          onChange={() => {
            // console.log(data.label);
            handleToggleCheckBox(data.id);
          }}
        />
        <label>{data.label}</label>
      </span>

      {data.children &&
        data.children.map((item) => (
          <Checkbox
            key={item.id}
            data={item}
            handleToggleCheckBox={handleToggleCheckBox}
          />
        ))}
    </div>
  );
}
