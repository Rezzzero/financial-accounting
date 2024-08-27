import { useState } from "react";
import AccountBlock from "../components/blocks/AccountBlock";
import SpendingBlock from "../components/blocks/SpendingBlock";
import ExpensesAddModal from "../components/modals/ExpensesAddModal";
import { SidebarComponent } from "../components/sidebar/SidebarComponent";
import { TargetBlockComponent } from "../components/blocks/target/TargetComponent";
import { DebtsBlock } from "../components/blocks/debt/DebtsBlock";
const MainPage = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <div className="grid" style={{ gridTemplateColumns: "13% 87%" }}>
      <SidebarComponent />
      <div className="div grid" style={{ gridTemplateColumns: "75% 25%" }}>
        <div className="grid">
          <AccountBlock text={"Счета"}></AccountBlock>
          <SpendingBlock SpendingTitle={"Расходы"}></SpendingBlock>
        </div>
        <div>
          <TargetBlockComponent />
          <DebtsBlock />
        </div>
        <button
          className=" p-2 pr-5 pl-5 border"
          onClick={() => toggleModal(true)}
        >
          Add Expenses
        </button>
        {modal && <ExpensesAddModal toggleModal={toggleModal} />}
      </div>
    </div>
  );
};

export default MainPage;
