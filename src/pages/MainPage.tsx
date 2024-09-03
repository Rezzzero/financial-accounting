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
      className="md:grid md:gap-5 relative pb-[60px] md:pb-0"
      style={{ gridTemplateColumns: isSidebarCollapsed ? "3% 92%" : "13% 84%" }}
    >
      <div className="absolute bg-white left-0 bottom-0 w-full md:static md:w-[250px]">
        <SidebarComponent onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className="mt-5">
        <div className="w-full">
          <FinanceSummary />
        </div>
        <h1 className="text-3xl font-bold mb-5 hidden md:block">Операции</h1>
        <div
          className="md:grid md:gap-5"
          style={{ gridTemplateColumns: "75% 25%" }}
        >
          <div className="grid">
            <CoreFinanceComponent title={"Источники дохода"} />
            <CoreFinanceComponent title={"Счета"} />
            <CoreFinanceComponent title={"Расходы"} />
          </div>
          <div className="mb-[45px] md:mb-0">
            <TargetBlockComponent />
            <DebtsBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
