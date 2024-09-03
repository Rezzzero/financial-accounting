import { useState, useEffect } from "react";
import { apiKey } from "../../../utils/apiKeys";
import { formatNumber } from "../../../utils/formatingNumbers";
import { RootState } from "../../../store/types";
import { useSelector } from "react-redux";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import "./FinanceSummary.css";

const convertToRUB = (amount: number, currency: string, rates: any) => {
  if (!rates) return 0;

  const conversionRates: { [key: string]: number } = {
    RUB: rates.RUB,
    USD: rates.USD,
    EUR: rates.EUR,
    UAH: rates.UAH,
  };

  const amountInRUB = amount / conversionRates[currency];

  return amountInRUB;
};

export const FinanceSummary = () => {
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const currentMonth = new Date().toLocaleString("ru-RU", { month: "long" });

  const incomeList = useSelector((state: RootState) => state.income.list);
  const expenseList = useSelector((state: RootState) => state.expenses.list);
  const accountsList = useSelector((state: RootState) => state.accounts.list);
  const debtList = useSelector((state: RootState) => state.debts.list);

  const total = (list: CoreFinanceProps[]) => {
    return list.reduce(
      (acc, item) =>
        acc + convertToRUB(item.amount, item.currency, exchangeRates),
      0
    );
  };

  const totalDebts = (list: DebtProps[]) => {
    return list.reduce((acc, item) => acc + item.remainValue, 0);
  };

  const financeSummaryData = [
    {
      title: "Доход",
      amount: total(incomeList),
    },
    {
      title: "Расход",
      amount: total(expenseList),
    },
    {
      title: "Баланс",
      amount: total(accountsList),
    },
    {
      title: "Долги",
      amount: totalDebts(debtList),
    },
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/RUB`
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Ошибка при получении курса валют:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="bg-finance-changer w-[100%] md:w-[75%] md:h-[150px] md:text-white py-4 px-5 border border-gray-300 rounded-lg shadow-lg shadow-gray-300 md:mb-[80px]">
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-xl">
          {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
        </h1>
        <p className="bg-currency-changer text-sm font-semibold md:bg-gray-200 bg-opacity-10 rounded-lg px-2 py-1">
          {exchangeRates
            ? `1 USD = ${(exchangeRates.RUB / exchangeRates.USD).toFixed(
                2
              )} рубля`
            : "Загрузка..."}
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        {financeSummaryData.map((item) => (
          <div
            className="w-[45%] md:w-[24%] bg-gray-200 bg-opacity-10 rounded-lg p-2"
            key={item.title}
          >
            <p className="text-xl font-bold">{formatNumber(item.amount)} ₽</p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
