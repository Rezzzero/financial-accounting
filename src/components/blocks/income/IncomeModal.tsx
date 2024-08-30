import { useState, useEffect } from "react";
import { IncomeProps } from "../../../types/IncomeTypes/IncomeTypes";
import { availableColors, iconMapping } from "../SelectedIcon";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newIncome: IncomeProps) => void;
}

export const IncomeModal = ({
  isOpen,
  onClose,
  onSave,
}: AddIncomeModalProps) => {
  const [incomeTitle, setIncomeTitle] = useState<string>("");
  const [incomeCurrency, setIncomeCurrency] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [selectedIcon, setSelectedIcon] = useState<string>("add");
  const [selectedColor, setSelectedColor] = useState<string>("bg-gray-400");

  useEffect(() => {
    if (!isOpen) {
      setIncomeTitle("");
      setIncomeCurrency("");
      setIncomeAmount(0);
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
    const newIncome = {
      title: incomeTitle,
      currency: incomeCurrency,
      amount: incomeAmount,
      icon: { type: selectedIcon, background: selectedColor },
    };
    onSave(newIncome);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center justify-center">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2>Добавить Источник Дохода</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            placeholder="Название"
            value={incomeTitle}
            onChange={(e) => setIncomeTitle(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
          />
          <label htmlFor="name">Валюта</label>
          <input
            type="text"
            placeholder="Валюта дохода"
            value={incomeCurrency}
            onChange={(e) => setIncomeCurrency(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
          />
          <label htmlFor="name">Сумма дохода</label>
          <input
            type="number"
            placeholder="Сумма дохода"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(Number(e.target.value))}
            className="border border-gray-500 p-2 rounded-lg"
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
