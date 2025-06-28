import Checkbox from "./Checkbox";
import useCheckBoxSatus from "./useCheckBoxSatus";

export default function CheckBoxStatus() {
  const { statusData, toggleCheckBox } = useCheckBoxSatus();

  const handleToggleCheckBox = (id: string | number) => {
    toggleCheckBox(id);
  };
  return (
    <div>
      <h3>Check Box Status</h3>
      <div>
        {statusData.map((item) => (
          <Checkbox
            key={item.id}
            data={item}
            handleToggleCheckBox={handleToggleCheckBox}
          />
        ))}
      </div>
    </div>
  );
}
