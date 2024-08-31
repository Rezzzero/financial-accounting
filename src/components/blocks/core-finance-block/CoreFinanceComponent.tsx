import { useState } from "react";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { BlockFormComponent } from "../BlockFormComponent";
import { CoreFinanceList } from "./CoreFinanceList";
import { CoreFinanceModal } from "./CoreFinanceModal";
import { RootState } from "../../../store/types";
import { useSelector, useDispatch } from "react-redux";
import { addExpense } from "../../../store/slices/expensesSlice";
import { addIncome } from "../../../store/slices/incomeSlice";
import { addAccount } from "../../../store/slices/accountsSlice";

export const CoreFinanceComponent = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coreFinanceData = useSelector((state: RootState) => {
    switch (title) {
      case "Источники дохода":
        return state.income.list;
      case "Счета":
        return state.accounts.list;
      case "Расходы":
        return state.expenses.list;
      default:
        return [];
    }
  });

  const handleAddFinanceCore = (newCoreFinance: CoreFinanceProps) => {
    switch (title) {
      case "Источники дохода":
        dispatch(addIncome(newCoreFinance));
        break;
      case "Счета":
        dispatch(addAccount(newCoreFinance));
        break;
      case "Расходы":
        dispatch(addExpense(newCoreFinance));
        break;
      default:
        break;
    }
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
