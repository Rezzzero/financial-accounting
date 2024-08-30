import { useState } from "react";
import { BlockFormComponent } from "../BlockFormComponent";
import { IncomeProps } from "../../../types/IncomeTypes/IncomeTypes";
import { IncomeList } from "./IncomeList";
import { IncomeModal } from "./IncomeModal";

export const IncomeBlock = () => {
  const [incomeData, setIncomeData] = useState([] as IncomeProps[]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddIncome = (newIncome: IncomeProps) => {
    setIncomeData([...incomeData, newIncome]);
  };

  return (
    <>
      <BlockFormComponent
        title="Источники Дохода"
        onAddItem={() => setIsModalOpen(true)}
      >
        <IncomeList incomeData={incomeData} />
      </BlockFormComponent>

      <IncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddIncome}
      />
    </>
  );
};
