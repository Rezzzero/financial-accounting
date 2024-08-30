import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinearWithValueLabel from "../ProgressBar";
import { useState } from "react";
import { formatNumber } from "../../../utils/formatingNumbers";

export const DebtsList = ({
  debtsData,
  setDebtsData,
}: {
  debtsData: DebtProps[];
  setDebtsData: React.Dispatch<React.SetStateAction<DebtProps[]>>;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPayment, setNewPayment] = useState<number | null>(null);

  const handleSavePayment = (index: number) => {
    if (newPayment !== null) {
      const updatedDebts = debtsData.map((debt, i) => {
        if (i === index) {
          const updatedPaidValue = debt.paidValue + newPayment;
          return {
            ...debt,
            paidValue: updatedPaidValue,
            remainValue: debt.remainValue - updatedPaidValue,
          };
        }
        return debt;
      });

      setDebtsData(updatedDebts);
      setNewPayment(null);
      setEditingIndex(null);
    }
  };

  return (
    <>
      {debtsData.map((debt, index) => {
        const percentage = (debt.paidValue / debt.currValue) * 100;

        return (
          <div
            key={index}
            className="flex flex-col border border-gray-400 hover:bg-blue-600 hover:bg-opacity-20 hover:border-blue-600 rounded-lg p-2 mb-2 cursor-pointer"
          >
            <div className="flex gap-2">
              <div className="flex h-[45px] w-[45px] bg-red-500 text-white rounded-full justify-center items-center cursor-pointer">
                <AttachMoneyIcon />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{formatNumber(debt.currValue)} ₽</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-bold">Выплачено:</p>
                <p>Осталось:</p>
                <p>Вернуть до:</p>
              </div>
              <div className="flex flex-col gap-2">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={newPayment || ""}
                    onChange={(e) => setNewPayment(parseFloat(e.target.value))}
                    onBlur={() => handleSavePayment(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSavePayment(index);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <p
                    className="font-bold cursor-pointer"
                    onClick={() => setEditingIndex(index)}
                  >
                    {formatNumber(debt.paidValue)} ₽
                  </p>
                )}
                <p>{formatNumber(debt.remainValue)} ₽</p>
                <p>{new Date(debt.returnTo).toLocaleDateString()}</p>
              </div>
            </div>
            <LinearWithValueLabel percentage={percentage} />
            <p>{debt.name}</p>
          </div>
        );
      })}
    </>
  );
};
