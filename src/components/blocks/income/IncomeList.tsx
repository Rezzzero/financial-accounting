import { IncomeProps } from "../../../types/IncomeTypes/IncomeTypes";
import { formatNumber } from "../../../utils/formatingNumbers";
import { SelectedIcon } from "../SelectedIcon";

export const IncomeList = ({ incomeData }: { incomeData: IncomeProps[] }) => {
  return (
    <>
      {incomeData.map((item, index) => (
        <div
          key={index}
          className="flex flex-nowrap gap-2 p-2 border border-gray-300 hover:bg-blue-600 hover:bg-opacity-20 hover:border-blue-600 rounded-lg w-[180px] cursor-pointer"
        >
          <SelectedIcon
            selectedIcon={item.icon.type}
            selectedColor={item.icon.background}
          />
          <div className="flex flex-col">
            <p className="font-bold">
              {formatNumber(item.amount)} {item.currency}
            </p>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </>
  );
};
