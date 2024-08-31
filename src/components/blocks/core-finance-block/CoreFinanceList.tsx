import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { formatNumber } from "../../../utils/formatingNumbers";
import { SelectedIcon } from "../SelectedIcon";

export const CoreFinanceList = ({
  coreFinanceData,
}: {
  coreFinanceData: CoreFinanceProps[];
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {coreFinanceData.map((coreFinance) => (
        <div
          key={coreFinance.title}
          className="flex flex-nowrap gap-2 p-2 border border-gray-300 hover:bg-blue-600 hover:bg-opacity-20 hover:border-blue-600 rounded-lg w-[185px] cursor-pointer"
        >
          <SelectedIcon
            selectedIcon={coreFinance.icon.type}
            selectedColor={coreFinance.icon.background}
          />
          <div className="flex flex-col">
            <p className="font-bold">
              {formatNumber(coreFinance.amount)} {coreFinance.currency}
            </p>
            <p>{coreFinance.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
