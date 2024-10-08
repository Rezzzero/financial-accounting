import { useState, useEffect, useRef } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";
import { useIcon } from "../../../hooks/useIcon";
import { PickIcon } from "../../PickIcon";

export const EditTargetModal = ({
  onClose,
  data,
  onSave,
}: {
  onClose: () => void;
  data: TargetProps;
  onSave: (data: TargetProps) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(data.title);
  const [currentValue, setCurrentValue] = useState(data.currentValue || "");
  const [targetValue, setTargetValue] = useState(data.targetValue || "");
  const { selectedColor, selectedIcon, handleColorClick, handleIconClick } =
    useIcon(data);
  const [currency, setCurrency] = useState(data.currency);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSave = () => {
    const updatedData = {
      ...data,
      title,
      currentValue: Number(currentValue),
      targetValue: Number(targetValue),
      currency,
      icon: { type: selectedIcon, background: selectedColor },
    };
    onSave(updatedData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-background-theme flex flex-col justify-center items-center w-[500px] p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-bold mb-4">Редактирование Цели</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          className="bg-background-theme w-full border border-gray-300 rounded p-2 mb-2"
        />
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          placeholder="Текущая Сумма"
          className="bg-background-theme w-full border border-gray-300 rounded p-2 mb-2"
        />
        <input
          type="text"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          placeholder="Целевая Сумма"
          className="bg-background-theme w-full border border-gray-300 rounded p-2 mb-2"
        />
        <FormControl fullWidth>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as string)}
            style={{
              height: 42,
              border: "1px solid gray",
              borderRadius: 8,
            }}
            sx={{
              color: "var(--text-color)",
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="RUB">RUB</MenuItem>
            <MenuItem value="UAH">UAH</MenuItem>
          </Select>
        </FormControl>
        <PickIcon
          selectedColor={selectedColor}
          selectedIcon={selectedIcon}
          handleColorClick={handleColorClick}
          handleIconClick={handleIconClick}
        />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            className="text-blue-500 hover:text-blue-700"
          >
            Cохранить
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
