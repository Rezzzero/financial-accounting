import { useState, useEffect } from "react";
import {
  TargetProps,
  AddTargetModalProps,
} from "../../../types/TargetTypes/TargetTypes";
import { iconMapping, availableColors } from "./TargetIcon";

export const TargetModal = ({
  isOpen,
  onClose,
  onSave,
}: AddTargetModalProps) => {
  const [currValue, setCurrValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("add");
  const [selectedColor, setSelectedColor] = useState<string>("bg-gray-400");

  useEffect(() => {
    if (!isOpen) {
      setCurrValue(0);
      setTargetValue(0);
      setName("");
      setSelectedIcon("add");
      setSelectedColor("bg-gray-400");
    }
  }, [isOpen]);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSave = () => {
    const newTarget: TargetProps = {
      name,
      currentValue: currValue,
      targetValue,
      icon: { type: selectedIcon, background: selectedColor },
    };
    onSave(newTarget);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Добавить цель</h2>
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded p-2"
            placeholder="Название цели"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 rounded p-2"
            placeholder="Текущее значение"
            value={currValue}
            onChange={(e) => setCurrValue(Number(e.target.value))}
          />
          <input
            type="number"
            className="border border-gray-300 rounded p-2"
            placeholder="Цель"
            value={targetValue}
            onChange={(e) => setTargetValue(Number(e.target.value))}
          />
        </div>

        <h3>Выберите иконку</h3>
        <div className="flex gap-4 mt-2 mb-4">
          {Object.keys(iconMapping).map((icon) => (
            <div
              key={icon}
              className={`flex h-[45px] w-[45px] bg-gray-400 rounded-full justify-center items-center cursor-pointer ${
                icon === selectedIcon ? "ring-2 ring-black" : ""
              }`}
              onClick={() => handleIconClick(icon)}
            >
              {iconMapping[icon]}
            </div>
          ))}
        </div>

        <h3>Выберите цвет</h3>
        <div className="flex gap-4 mt-2 mb-4">
          {availableColors.map((color) => (
            <div
              key={color}
              className={`h-[45px] w-[45px] rounded-full cursor-pointer ${color} ${
                color === selectedColor ? "ring-2 ring-black" : ""
              }`}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="text-blue-500 hover:text-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
