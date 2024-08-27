import { useState } from "react";
import { TargetList } from "../target-list/TargetList";
import { TargetProps } from "../../types/TargetTypes/TargetTypes";

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
    <div className="w-[100%] h-[300px] py-2 px-4 border border-gray-300 rounded-lg overflow-y-auto shadow-lg shadow-gray-300">
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-xl">Цели</h1>
        <button
          type="button"
          onClick={handleAddTarget}
          className="text-blue-400"
        >
          Добавить
        </button>
      </div>
      <TargetList targetData={targetData} setTargetData={setTargetData} />
    </div>
  );
};
