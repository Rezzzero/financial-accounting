import { useEffect, useState } from "react";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { availableColors, iconMapping } from "../SelectedIcon";

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
  const [coreFinanceAmount, setCoreFinanceAmount] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-gray-400");

  useEffect(() => {
    if (!isOpen) {
      setCoreFinanceTitle("");
      setCoreFinanceCurrency("");
      setCoreFinanceAmount(0);
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
      amount: coreFinanceAmount,
      icon: { type: selectedIcon, background: selectedColor },
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center justify-center">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2>{modalTitle}</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            placeholder="Название"
            value={coreFinanceTitle}
            onChange={(e) => setCoreFinanceTitle(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
          />
          <label htmlFor="name">Валюта</label>
          <input
            type="text"
            placeholder="Валюта"
            value={coreFinanceCurrency}
            onChange={(e) => setCoreFinanceCurrency(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
          />
          <label htmlFor="name">Сумма</label>
          <input
            type="number"
            placeholder="Сумма"
            value={coreFinanceAmount}
            onChange={(e) => setCoreFinanceAmount(Number(e.target.value))}
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
