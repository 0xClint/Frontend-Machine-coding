import { useState } from "react";
import { Estatus, Istatus, statusDummyData } from "./Data";

export default function useCheckBoxSatus() {
  const [statusData, setStatusData] = useState<Istatus[]>(statusDummyData);

  const toggleLeaveNode = (id: number | string, tree: Istatus): Istatus => {
    if (tree.children.length === 0 && tree.id === id) {
      return {
        ...tree,
        status:
          tree.status === Estatus.CHECKED ? Estatus.UNCHECKED : Estatus.CHECKED,
      };
    }

    return {
      ...tree,
      children: tree.children.map((child) => toggleLeaveNode(id, child)),
    };
  };

  const toggleCheckBox = (id: number | string) => {
    setStatusData((prevState) =>
      prevState.map((treeNode) => toggleLeaveNode(id, treeNode))
    );
  };

  return { statusData, toggleCheckBox };
}
