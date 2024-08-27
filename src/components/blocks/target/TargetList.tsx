import { useState } from "react";
import LinearWithValueLabel from "../ProgressBar";
import { TargetIconPicker } from "./TargetIconPicker";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";

export const TargetList = ({
  targetData,
  setTargetData,
}: {
  targetData: TargetProps[];
  setTargetData: React.Dispatch<React.SetStateAction<TargetProps[]>>;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editField, setEditField] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleIconSelect = (index: number, icon: string, color: string) => {
    const updatedTargets = [...targetData];
    updatedTargets[index].icon = { type: icon, background: color };
    setTargetData(updatedTargets);
  };

  const handleEdit = (index: number, field: string, value: string) => {
    setEditIndex(index);
    setEditField(field);
    setInputValue(value);
  };

  const handleSave = (index: number) => {
    const updatedTargets = [...targetData];
    updatedTargets[index] = {
      ...updatedTargets[index],
      [editField]:
        editField === "currentValue" || editField === "targetValue"
          ? Number(inputValue.replace(/\s/g, ""))
          : inputValue,
    };
    setTargetData(updatedTargets);
    setEditIndex(null);
    setEditField("");
    setInputValue("");
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
            <TargetIconPicker
              selectedIcon={target.icon.type}
              selectedColor={target.icon.background}
              onIconSelect={(icon, color) =>
                handleIconSelect(index, icon, color)
              }
            />
            <div className="flex flex-col">
              {editIndex === index && editField === "currentValue" ? (
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
                  onClick={() =>
                    handleEdit(
                      index,
                      "currentValue",
                      target.currentValue.toString()
                    )
                  }
                >
                  {target.currentValue.toLocaleString()} ₽
                </p>
              )}
              {editIndex === index && editField === "targetValue" ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={() => handleSave(index)}
                  className="text-sm"
                  autoFocus
                />
              ) : (
                <p
                  className="text-sm cursor-pointer"
                  onClick={() =>
                    handleEdit(
                      index,
                      "targetValue",
                      target.targetValue.toString()
                    )
                  }
                >
                  из {target.targetValue.toLocaleString()} ₽
                </p>
              )}
            </div>
          </div>
          <LinearWithValueLabel
            percentage={calculatePercentage(
              target.currentValue,
              target.targetValue
            )}
          />
          {editIndex === index && editField === "name" ? (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={() => handleSave(index)}
              autoFocus
            />
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => handleEdit(index, "name", target.name)}
            >
              {target.name}
            </p>
          )}
        </div>
      ))}
    </>
  );
};
