import { useState, useEffect, useRef } from "react";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../../hooks/useTheme";

export const EditCoreModal = ({
  blockTitle,
  onClose,
  data,
  onSave,
}: {
  blockTitle: string;
  onClose: () => void;
  data: CoreFinanceProps;
  onSave: (data: CoreFinanceProps) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(data.amount || "");
  const [currency, setCurrency] = useState(data.currency);
  const { theme } = useTheme();

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
      amount: Number(amount) || 0,
      currency,
    };
    onSave(updatedData);
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and empty string
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const editTitle = (blockTitle: string) => {
    switch (blockTitle) {
      case "Источники дохода":
        return "Источника дохода";
      case "Счета":
        return "Счёта";
      case "Расходы":
        return "Расхода";
    }
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
        <h1 className="text-xl font-bold mb-4">
          Редактирование {editTitle(blockTitle)}
        </h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          className="bg-background-theme w-full border border-gray-300 rounded p-2 mb-2"
        />
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Сумма"
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
              color: theme === "dark" ? "white" : "black",
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="RUB">RUB</MenuItem>
            <MenuItem value="UAH">UAH</MenuItem>
          </Select>
        </FormControl>
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
