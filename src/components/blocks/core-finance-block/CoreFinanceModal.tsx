import { useEffect, useState } from "react";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { availableColors, iconMapping } from "../SelectedIcon";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../../hooks/useTheme";
import { v4 as uuidv4 } from "uuid";

interface CoreFinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCoreFinance: CoreFinanceProps) => void;
  title: string;
}

export const CoreFinanceModal = ({
  isOpen,
  onClose,
  onSave,
  title,
}: CoreFinanceModalProps) => {
  const [coreFinanceTitle, setCoreFinanceTitle] = useState("");
  const [coreFinanceCurrency, setCoreFinanceCurrency] = useState("");
  const [coreFinanceAmount, setCoreFinanceAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-gray-400");
  const { theme } = useTheme();

  useEffect(() => {
    if (!isOpen) {
      setCoreFinanceTitle("");
      setCoreFinanceCurrency("");
      setCoreFinanceAmount("");
      setSelectedIcon("");
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
    const newCoreFinance: CoreFinanceProps = {
      title: coreFinanceTitle,
      currency: coreFinanceCurrency,
      amount: Number(coreFinanceAmount),
      icon: { type: selectedIcon, background: selectedColor },
      id: uuidv4(),
    };
    onSave(newCoreFinance);
    onClose();
  };

  if (!isOpen) return null;

  const titleMapping: { [key: string]: string } = {
    "Источники дохода": "Добавить Источник Дохода",
    Счета: "Добавить Счёт",
    Расходы: "Добавить Расход",
  };

  const modalTitle = titleMapping[title] || "Добавить Элемент";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center justify-center z-10">
      <div className="bg-background-theme rounded-lg p-4 w-80">
        <h1 className="text-xl font-bold mb-4 text-center">{modalTitle}</h1>
        <div className="flex flex-col">
          <p>Название</p>
          <input
            type="text"
            placeholder="Название"
            value={coreFinanceTitle}
            onChange={(e) => setCoreFinanceTitle(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 rounded-lg mb-2"
          />

          <FormControl fullWidth>
            <p>Валюта</p>
            <Select
              value={coreFinanceCurrency}
              onChange={(e) => setCoreFinanceCurrency(e.target.value)}
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

          <p>Сумма</p>
          <input
            type="text"
            placeholder="Сумма"
            value={coreFinanceAmount}
            onChange={(e) => setCoreFinanceAmount(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 rounded-lg mb-2"
          />
        </div>
        <h3>Выберите иконку</h3>
        <div className="flex flex-nowrap gap-4 mt-2 mb-2">
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
        <h3>Выберите цвет иконки</h3>
        <div className="flex flex-nowrap gap-4 mt-2 mb-4">
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
