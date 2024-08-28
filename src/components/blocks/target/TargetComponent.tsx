import { useState } from "react";
import { TargetList } from "./TargetList";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";
import { BlockFormComponent } from "../BlockFormComponent";
import { TargetModal } from "./TargetModal";

export const TargetBlockComponent = () => {
  const [targetData, setTargetData] = useState([] as TargetProps[]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTarget = (newTarget: TargetProps) => {
    setTargetData([...targetData, newTarget]);
  };

  return (
    <>
      <BlockFormComponent title="Цели" onAddItem={() => setIsModalOpen(true)}>
        <TargetList targetData={targetData} setTargetData={setTargetData} />
      </BlockFormComponent>

      <TargetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTarget}
      />
    </>
  );
};
