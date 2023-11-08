import { useState } from "react";
import AccountBlock from "../components/blocks/AccountBlock";
import SpendingBlock from "../components/blocks/SpendingBlock";
import ExpensesAddModal from "../components/modals/ExpensesAddModal";
import TargetBlock from "../components/blocks/TargetBlock";
const MainPage = () => {
 const [modal, toggleModal] = useState(false);

 return (
  <div className="div grid" style={{ gridTemplateColumns: "75% 25%" }}>
   <div className="grid">
    <AccountBlock text={"Счета"}></AccountBlock>
    <SpendingBlock SpendingTitle={"Расходы"}></SpendingBlock>
   </div>
   <div className=" justify-self-end">
    <TargetBlock percent={55}></TargetBlock>
   </div>
   <button className=" p-2 pr-5 pl-5 border" onClick={() => toggleModal(true)}>
    Add Expenses
   </button>
   {modal && <ExpensesAddModal toggleModal={toggleModal} />}
  </div>
 );
};

export default MainPage;
