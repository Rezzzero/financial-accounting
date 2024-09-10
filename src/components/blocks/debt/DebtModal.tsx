import { useEffect, useState } from "react";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import { FormControl, MenuItem, Select } from "@mui/material";

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debt: DebtProps) => void;
}

export const DebtModal = ({ isOpen, onClose, onSave }: AddDebtModalProps) => {
  const [currValue, setCurrValue] = useState("");
  const [paidValue, setPaidValue] = useState("");
  const [returnTo, setReturnTo] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCurrValue("");
      setPaidValue("");
      setReturnTo(new Date().toISOString().split("T")[0]);
      setTitle("");
      setCurrency("");
    }
  }, [isOpen]);

  const handleSave = () => {
    const newDebt: DebtProps = {
      currValue: Number(currValue),
      paidValue: Number(paidValue),
      remainValue: Number(currValue) - Number(paidValue),
      returnTo: new Date(returnTo),
      title,
      currency,
    };
    onSave(newDebt);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background-theme p-4 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Добавить долг</h2>
        <div className="flex flex-col">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 mb-2 rounded-lg"
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
                color: "text-theme",
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
              <MenuItem value="UAH">UAH</MenuItem>
            </Select>
          </FormControl>

          <label htmlFor="currValue">Сумма долга</label>
          <input
            type="text"
            placeholder="Сумма долга"
            value={currValue}
            onChange={(e) => setCurrValue(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 mb-2 rounded-lg"
          />

          <label htmlFor="paidValue">Выплачено</label>
          <input
            type="text"
            placeholder="Выплачено"
            value={paidValue}
            onChange={(e) => setPaidValue(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 mb-2 rounded-lg"
          />
          <input
            type="date"
            value={returnTo}
            onChange={(e) => setReturnTo(e.target.value)}
            className="bg-background-theme border border-gray-500 p-2 rounded-lg"
          />
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
