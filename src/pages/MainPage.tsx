import { SidebarComponent } from "../components/sidebar/SidebarComponent";
import { TargetBlockComponent } from "../components/blocks/target/TargetComponent";
import { DebtsBlock } from "../components/blocks/debt/DebtsBlock";
import { FinanceSummary } from "../components/blocks/finance-summary/FinanceSummary";
import { useState } from "react";
import { CoreFinanceComponent } from "../components/blocks/core-finance-block/CoreFinanceComponent";
import { ChangeCurrency } from "../components/blocks/ChangeCurrency";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
const MainPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<any>(null);

  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );

  const handleToggleSidebar = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleExchangeRatesUpdate = (rates: any) => {
    setExchangeRates(rates);
  };

  return (
    <div
      className="bg-background-theme duration-300 text-text-theme md:grid md:gap-5 relative pb-[60px] md:pb-0"
      style={{ gridTemplateColumns: isSidebarCollapsed ? "3% 92%" : "13% 84%" }}
    >
      <div className="absolute left-0 bottom-0 w-full md:static md:w-[250px]">
        <SidebarComponent onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className="mt-5 md:ml-[100px] xl:ml-[80px] 2xl:ml-[40px]">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-5 w-full">
          <FinanceSummary
            selectedCurrency={selectedCurrency}
            onExchangeRatesUpdate={handleExchangeRatesUpdate}
          />
          <ChangeCurrency />
        </div>
        <h1 className="text-3xl font-bold mb-5 hidden md:block">Операции</h1>
        <div className="md:flex md:flex-row md:gap-5 md:justify-between">
          <div className="grid w-full">
            <CoreFinanceComponent title={"Источники дохода"} />
            <CoreFinanceComponent title={"Счета"} />
            <CoreFinanceComponent title={"Расходы"} />
          </div>
          <div className="mb-[45px] w-full md:mb-0 lg:w-[320px] xl:w-[340px] 2xl:w-[418px]">
            <TargetBlockComponent />
            <DebtsBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
