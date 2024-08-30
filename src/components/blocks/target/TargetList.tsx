import { useState } from "react";
import LinearWithValueLabel from "../ProgressBar";
import { SelectedIcon } from "../SelectedIcon";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";

export const TargetList = ({
  targetData,
  setTargetData,
}: {
  targetData: TargetProps[];
  setTargetData: React.Dispatch<React.SetStateAction<TargetProps[]>>;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setInputValue(targetData[index].currentValue.toString());
  };

  const handleSave = (index: number) => {
    const updatedTargets = [...targetData];
    updatedTargets[index].currentValue = Number(inputValue.replace(/\s/g, ""));
    setTargetData(updatedTargets);
    setEditIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handleSave(index);
    }
  };

  const calculatePercentage = (
    currentValue: number,
    targetValue: number
  ): number => {
    return targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  };

  return (
    <>
      {targetData.map((target, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-400 rounded-lg p-2 mb-2"
        >
          <div className="flex gap-2">
            <SelectedIcon
              selectedIcon={target.icon.type}
              selectedColor={target.icon.background}
            />
            <div className="flex flex-col">
              {editIndex === index ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={() => handleSave(index)}
                  className="font-bold"
                  autoFocus
                />
              ) : (
                <p
                  className="font-bold cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  {target.currentValue.toLocaleString()} ₽
                </p>
              )}
              <p className="text-sm">
                из {target.targetValue.toLocaleString()} ₽
              </p>
            </div>
          </div>
          <LinearWithValueLabel
            percentage={calculatePercentage(
              target.currentValue,
              target.targetValue
            )}
          />
          <p>{target.name}</p>
        </div>
      ))}
    </>
  );
};
