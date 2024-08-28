import { useState } from "react";
import { BlockFormComponent } from "../BlockFormComponent";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import { DebtsList } from "./DebtsList";
import { DebtModal } from "./DebtModal";

export const DebtsBlock = () => {
  const [debtsData, setDebtsData] = useState([] as DebtProps[]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDebt = (newDebt: DebtProps) => {
    setDebtsData([...debtsData, newDebt]);
  };

  return (
    <>
      <BlockFormComponent title="Долги" onAddItem={() => setIsModalOpen(true)}>
        <DebtsList debtsData={debtsData} setDebtsData={setDebtsData} />
      </BlockFormComponent>

      <DebtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDebt}
      />
    </>
  );
};
