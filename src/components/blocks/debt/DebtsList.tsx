import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const DebtsList = ({
  debtsData,
  setDebtsData,
}: {
  debtsData: DebtProps[];
  setDebtsData: React.Dispatch<React.SetStateAction<DebtProps[]>>;
}) => {
  return (
    <>
      {debtsData.map((debt, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-400 rounded-lg p-2 mb-2"
        >
          <div className="flex gap-2">
            <div className="flex h-[45px] w-[45px] bg-red-500 text-white rounded-full justify-center items-center cursor-pointer">
              <AttachMoneyIcon />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{debt.currValue} ₽</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Выплачено:</p>
              <p>Осталось:</p>
              <p>Вернуть до:</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{debt.paidValue} ₽</p>
              <p>{debt.remainValue} ₽</p>
              <p>{new Date(debt.returnTo).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
