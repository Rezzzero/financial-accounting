import { useState, useEffect } from "react";
import {
  TargetProps,
  AddTargetModalProps,
} from "../../../types/TargetTypes/TargetTypes";
import { iconMapping, availableColors } from "../SelectedIcon";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../../hooks/useTheme";

export const TargetModal = ({
  isOpen,
  onClose,
  onSave,
}: AddTargetModalProps) => {
  const [currValue, setCurrValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("add");
  const [selectedColor, setSelectedColor] = useState<string>("bg-gray-400");
  const [currency, setCurrency] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    if (!isOpen) {
      setCurrValue("");
      setTargetValue("");
      setName("");
      setSelectedIcon("add");
      setSelectedColor("bg-gray-400");
      setCurrency("");
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
      currentValue: Number(currValue),
      targetValue: Number(targetValue),
      icon: { type: selectedIcon, background: selectedColor },
      currency,
    };
    onSave(newTarget);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-background-theme p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Добавить цель</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="target-name">Название цели</label>
          <input
            type="text"
            className="bg-background-theme border border-gray-300 rounded p-2 mb-2"
            placeholder="Название цели"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormControl fullWidth>
            <p>Валюта</p>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                height: 42,
                border: "1px solid gray",
                borderRadius: 8,
                color: theme === "dark" ? "white" : "black",
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
              <MenuItem value="UAH">UAH</MenuItem>
            </Select>
          </FormControl>

          <label htmlFor="target-value">Текущаяя Сумма</label>
          <input
            type="text"
            className="bg-background-theme border border-gray-300 rounded p-2 mb-2"
            placeholder="Текущаяя Сумма"
            value={currValue}
            onChange={(e) => setCurrValue(e.target.value)}
          />
          <label htmlFor="target-value">Нужно собрать</label>
          <input
            type="text"
            className="bg-background-theme border border-gray-300 rounded p-2 mb-2"
            placeholder="Цель"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
        </div>

        <h3>Выберите иконку</h3>
        <div className="flex gap-4 mt-2 mb-4">
          {Object.keys(iconMapping).map((icon) => (
            <div
              key={icon}
              className={`flex h-[45px] w-[45px] bg-gray-400 rounded-full justify-center items-center cursor-pointer ${
                icon === selectedIcon ? "ring-2 ring-target-color" : ""
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
                color === selectedColor ? "ring-2 ring-target-color" : ""
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
