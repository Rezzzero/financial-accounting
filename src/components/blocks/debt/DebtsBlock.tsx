import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BlockFormComponent } from "../BlockFormComponent";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import { DebtsList } from "./DebtsList";
import { DebtModal } from "./DebtModal";
import { RootState } from "../../../store/types";
import { addDebt, removeDebt } from "../../../store/slices/debtsSlice";

export const DebtsBlock = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debtsData = useSelector((state: RootState) => {
    return state.debts.list;
  });

  const handleAddDebt = (newDebt: DebtProps) => {
    dispatch(addDebt(newDebt));
  };

  const handleRemoveDebt = (itemTitle: string) => {
    dispatch(removeDebt(itemTitle));
  };

  return (
    <>
      <BlockFormComponent title="Долги" onAddItem={() => setIsModalOpen(true)}>
        <DebtsList debtsData={debtsData} removeDebt={handleRemoveDebt} />
      </BlockFormComponent>

      <DebtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDebt}
      />
    </>
  );
};
