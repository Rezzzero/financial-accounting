import { useState, useEffect } from "react";
import {
  TargetProps,
  AddTargetModalProps,
} from "../../../types/TargetTypes/TargetTypes";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../../hooks/useTheme";
import { v4 as uuidv4 } from "uuid";
import { PickIcon } from "../../PickIcon";
import { useIcon } from "../../../hooks/useIcon";

export const TargetModal = ({
  isOpen,
  onClose,
  onSave,
}: AddTargetModalProps) => {
  const [currValue, setCurrValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [title, setTitle] = useState("");
  const {
    selectedColor,
    selectedIcon,
    setSelectedColor,
    setSelectedIcon,
    handleColorClick,
    handleIconClick,
  } = useIcon();
  const [currency, setCurrency] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    if (!isOpen) {
      setCurrValue("");
      setTargetValue("");
      setTitle("");
      setSelectedIcon("add");
      setSelectedColor("bg-gray-400");
      setCurrency("");
    }
  }, [isOpen]);

  const handleSave = () => {
    const newTarget: TargetProps = {
      title,
      currentValue: Number(currValue),
      targetValue: Number(targetValue),
      icon: { type: selectedIcon, background: selectedColor },
      currency,
      id: uuidv4(),
    };
    onSave(newTarget);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-background-theme p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Добавить цель</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="target-name">Название цели</label>
          <input
            type="text"
            className="bg-background-theme border border-gray-300 rounded p-2 mb-2"
            placeholder="Название цели"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <PickIcon
          selectedColor={selectedColor}
          selectedIcon={selectedIcon}
          handleColorClick={handleColorClick}
          handleIconClick={handleIconClick}
        />
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
