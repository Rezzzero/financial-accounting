import { useState } from "react";
import { TargetList } from "./TargetList";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";
import { BlockFormComponent } from "../BlockFormComponent";
import { TargetModal } from "./TargetModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types";
import { addGoal, removeGoal } from "../../../store/slices/goalsSlice";
import { CurrencyState } from "../../../store/slices/currencySlice";

interface TargetBlockProps {
  selectedCurrency: CurrencyState["selectedCurrency"];
  exchangeRates: any;
}

export const TargetBlockComponent = ({
  selectedCurrency,
  exchangeRates,
}: TargetBlockProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targetData = useSelector((state: RootState) => {
    return state.goals.list;
  });

  const handleAddTarget = (newTarget: TargetProps) => {
    dispatch(addGoal(newTarget));
  };

  const handleRemoveTarget = (itemTitle: string) => {
    dispatch(removeGoal(itemTitle));
  };

  return (
    <>
      <BlockFormComponent title="Цели" onAddItem={() => setIsModalOpen(true)}>
        <TargetList
          targetData={targetData}
          removeTarget={handleRemoveTarget}
          selectedCurrency={selectedCurrency}
          exchangeRates={exchangeRates}
        />
      </BlockFormComponent>

      <TargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTarget}
      />
    </>
  );
};
