import { useState } from "react";
import { TargetList } from "./TargetList";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";
import { BlockFormComponent } from "../BlockFormComponent";

export const TargetBlockComponent = () => {
  const [targetData, setTargetData] = useState([] as TargetProps[]);

  const handleAddTarget = () => {
    const newTarget = {
      icon: {
        type: "AddIcon",
        background: "bg-gray-300",
      },
      currentValue: 0,
      targetValue: 0,
      name: "Название цели",
    };
    setTargetData([...targetData, newTarget]);
  };

  return (
    <BlockFormComponent title="Цели" onAddItem={handleAddTarget}>
      <TargetList targetData={targetData} setTargetData={setTargetData} />
    </BlockFormComponent>
  );
};
