import { useState } from "react";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { BlockFormComponent } from "../BlockFormComponent";
import { CoreFinanceList } from "./CoreFinanceList";
import { CoreFinanceModal } from "./CoreFinanceModal";

export const CoreFinanceComponent = ({ title }: { title: string }) => {
  const [coreFinanceData, setCoreFinanceData] = useState(
    [] as CoreFinanceProps[]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFinanceCore = (newCoreFinance: CoreFinanceProps) => {
    setCoreFinanceData([...coreFinanceData, newCoreFinance]);
  };

  return (
    <>
      <BlockFormComponent title={title} onAddItem={() => setIsModalOpen(true)}>
        <CoreFinanceList coreFinanceData={coreFinanceData} />
      </BlockFormComponent>

      <CoreFinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddFinanceCore}
        title={title}
      />
    </>
  );
};
