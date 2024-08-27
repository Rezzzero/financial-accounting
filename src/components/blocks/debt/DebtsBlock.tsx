import { useState } from "react";
import { BlockFormComponent } from "../BlockFormComponent";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import { DebtsList } from "./DebtsList";

export const DebtsBlock = () => {
  const [debtsData, setDebtsData] = useState([] as DebtProps[]);
  console.log(debtsData);

  const handleAddDebt = () => {
    const newDebt = {
      currValue: 0,
      paidValue: 0,
      remainValue: 0,
      returnTo: new Date(),
      name: "Название долга",
    };

    setDebtsData([...debtsData, newDebt]);
  };

  return (
    <BlockFormComponent title="Долги" onAddItem={handleAddDebt}>
      <DebtsList debtsData={debtsData} setDebtsData={setDebtsData} />
    </BlockFormComponent>
  );
};
