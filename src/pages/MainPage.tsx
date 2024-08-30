import { SidebarComponent } from "../components/sidebar/SidebarComponent";
import { TargetBlockComponent } from "../components/blocks/target/TargetComponent";
import { DebtsBlock } from "../components/blocks/debt/DebtsBlock";
import { FinanceSummary } from "../components/blocks/finance-summary/FinanceSummary";
import { IncomeBlock } from "../components/blocks/income/IncomeBlock";
const MainPage = () => {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: "13% 84%" }}>
      <SidebarComponent />
      <div className="mt-5">
        <FinanceSummary />
        <h1 className="text-3xl font-bold mb-5">Операции</h1>
        <div
          className="div grid gap-2"
          style={{ gridTemplateColumns: "75% 25%" }}
        >
          <div className="grid">
            <IncomeBlock />
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
