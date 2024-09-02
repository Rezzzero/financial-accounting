import { useEffect, useState } from "react";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debt: DebtProps) => void;
}

export const DebtModal = ({ isOpen, onClose, onSave }: AddDebtModalProps) => {
  const [currValue, setCurrValue] = useState(0);
  const [paidValue, setPaidValue] = useState(0);
  const [returnTo, setReturnTo] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCurrValue(0);
      setPaidValue(0);
      setReturnTo(new Date().toISOString().split("T")[0]);
      setTitle("");
    }
  }, [isOpen]);

  const handleSave = () => {
    const newDebt: DebtProps = {
      currValue,
      paidValue,
      remainValue: currValue - paidValue,
      returnTo: new Date(returnTo),
      title,
    };
    onSave(newDebt);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Добавить долг</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
          />

          <label htmlFor="currValue">Сумма долга</label>
          <input
            type="number"
            placeholder="Сумма долга"
            value={currValue}
            onChange={(e) => setCurrValue(Number(e.target.value))}
            className="border border-gray-500 p-2 rounded-lg"
          />

          <label htmlFor="paidValue">Выплачено</label>
          <input
            type="number"
            placeholder="Выплачено"
            value={paidValue}
            onChange={(e) => setPaidValue(Number(e.target.value))}
            className="border border-gray-500 p-2 rounded-lg"
          />
          <input
            type="date"
            value={returnTo}
            onChange={(e) => setReturnTo(e.target.value)}
            className="border border-gray-500 p-2 rounded-lg"
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
