import { IncomeProps } from "../../../types/IncomeTypes/IncomeTypes";
import { SelectedIcon } from "../SelectedIcon";

export const IncomeList = ({ incomeData }: { incomeData: IncomeProps[] }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num);
  };

  return (
    <>
      {incomeData.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 p-2 border border-gray-300 rounded-lg w-[200px]"
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
