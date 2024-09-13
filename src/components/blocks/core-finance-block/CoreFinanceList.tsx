import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { formatNumber } from "../../../utils/formatingNumbers";
import { SelectedIcon } from "../SelectedIcon";
import { currencySymbol } from "../../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { EditCoreModal } from "./EditCoreModal";

export const CoreFinanceList = ({
  title,
  coreFinanceData,
  onRemoveItem,
  onUpdateItem,
}: {
  title: string;
  coreFinanceData: CoreFinanceProps[];
  onRemoveItem: (itemTitle: string) => void;
  onUpdateItem: (item: CoreFinanceProps) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFinanceCore, setSelectedFinanceCore] =
    useState<CoreFinanceProps>({} as CoreFinanceProps);

  const openModalWithFinance = (finance: CoreFinanceProps) => {
    setSelectedFinanceCore(finance);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <EditCoreModal
          blockTitle={title}
          onClose={() => setIsModalOpen(false)}
          data={selectedFinanceCore}
          onSave={onUpdateItem}
        />
      )}
      <div className="flex flex-wrap gap-3">
        {coreFinanceData.map((coreFinance) => (
          <div
            key={coreFinance.title}
            className="flex flex-nowrap relative gap-2 py-2 px-4 border border-theme-border-color hover:bg-blue-600 hover:bg-opacity-20 hover:border-theme-border-color rounded-lg w-[220px]"
          >
            <EditIcon
              className="absolute right-8 top-1 cursor-pointer hover:text-theme-button-color"
              onClick={() => openModalWithFinance(coreFinance)}
            />
            <CloseIcon
              className="absolute right-1 top-1 cursor-pointer hover:text-red-600"
              onClick={() => onRemoveItem(coreFinance.title)}
            />
            <SelectedIcon
              selectedIcon={coreFinance.icon.type}
              selectedColor={coreFinance.icon.background}
            />
            <div className="flex flex-col">
              <p className="font-bold">
                {formatNumber(coreFinance.amount)}{" "}
                {currencySymbol[coreFinance.currency]}
              </p>
              <p>{coreFinance.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
