import { SidebarComponent } from "../components/sidebar/SidebarComponent";
import { TargetBlockComponent } from "../components/blocks/target/TargetComponent";
import { DebtsBlock } from "../components/blocks/debt/DebtsBlock";
import { FinanceSummary } from "../components/blocks/finance-summary/FinanceSummary";
import { useState } from "react";
import { CoreFinanceComponent } from "../components/blocks/core-finance-block/CoreFinanceComponent";
const MainPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: isSidebarCollapsed ? "3% 92%" : "13% 84%" }}
    >
      <SidebarComponent onToggleSidebar={handleToggleSidebar} />
      <div className="mt-5">
        <FinanceSummary />
        <h1 className="text-3xl font-bold mb-5">Операции</h1>
        <div
          className="div grid gap-5"
          style={{ gridTemplateColumns: "75% 25%" }}
        >
          <div className="grid">
            <CoreFinanceComponent title={"Источники дохода"} />
            <CoreFinanceComponent title={"Счета"} />
            <CoreFinanceComponent title={"Расходы"} />
          </div>
          <div>
            <TargetBlockComponent />
            <DebtsBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
