import { useState, useEffect, useMemo } from "react";
import { apiKey } from "../../../utils/apiKeys";
import { formatNumber } from "../../../utils/formatingNumbers";
import { RootState } from "../../../store/types";
import { useSelector } from "react-redux";
import { CoreFinanceProps } from "../../../types/CoreFinanceTypes/CoreFinanceTypes";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import "./FinanceSummary.css";
import { CurrencyState } from "../../../store/slices/currencySlice";

const EXCHANGE_RATE_KEY_PREFIX = "exchangeRate_";
const LAST_UPDATE_KEY_PREFIX = "lastExchangeRateUpdate_";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getExchangeRateKey = (currency: string) =>
  `${EXCHANGE_RATE_KEY_PREFIX}${currency}`;
const getLastUpdateKey = (currency: string) =>
  `${LAST_UPDATE_KEY_PREFIX}${currency}`;

export const convertToCurrency = (
  amount: number,
  currency: string,
  rates: any
) => {
  if (!rates) return 0;

  const conversionRates: { [key: string]: number } = {
    RUB: rates.RUB,
    USD: rates.USD,
    EUR: rates.EUR,
    UAH: rates.UAH,
  };

  const amountInCurrency = amount / conversionRates[currency];

  return amountInCurrency;
};

interface FinanceSummaryProps {
  selectedCurrency: CurrencyState["selectedCurrency"];
  onExchangeRatesUpdate: (rates: any) => void;
}

export const FinanceSummary = ({
  selectedCurrency,
  onExchangeRatesUpdate,
}: FinanceSummaryProps) => {
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const currentMonth = new Date().toLocaleString("ru-RU", { month: "long" });

  const incomeList = useSelector((state: RootState) => state.income.list);
  const expenseList = useSelector((state: RootState) => state.expenses.list);
  const accountsList = useSelector((state: RootState) => state.accounts.list);
  const debtList = useSelector((state: RootState) => state.debts.list);
  const USDRate = localStorage.getItem("exchangeRate_USD");
  const exchangeUSD = JSON.parse(USDRate || "{}");
  const rubRate = exchangeUSD.RUB;

  const total = useMemo(() => {
    return (list: CoreFinanceProps[]) => {
      return list.reduce(
        (acc, item) =>
          acc + convertToCurrency(item.amount, item.currency, exchangeRates),
        0
      );
    };
  }, [exchangeRates]);

  const totalDebts = useMemo(() => {
    return (list: DebtProps[]) => {
      return list.reduce(
        (acc, item) =>
          acc +
          convertToCurrency(item.remainValue, item.currency, exchangeRates),
        0
      );
    };
  }, [exchangeRates]);

  const financeSummaryData = useMemo(
    () => [
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
    ],
    [total, totalDebts, incomeList, expenseList, accountsList, debtList]
  );

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const currency = selectedCurrency.value;
        if (!currency) return;

        const storedRates = localStorage.getItem(getExchangeRateKey(currency));
        const lastUpdate = localStorage.getItem(getLastUpdateKey(currency));
        const now = new Date().getTime();

        if (storedRates && lastUpdate) {
          const storedDate = new Date(lastUpdate).getTime();
          const isUpdateNeeded = now - storedDate > ONE_DAY_MS;

          if (!isUpdateNeeded) {
            setExchangeRates(JSON.parse(storedRates));
            return;
          }
        }

        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectedCurrency?.value}`
        );
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        localStorage.setItem(
          getExchangeRateKey(currency),
          JSON.stringify(data.conversion_rates)
        );
        localStorage.setItem(
          getLastUpdateKey(currency),
          new Date().toISOString()
        );
        onExchangeRatesUpdate(data.conversion_rates);
      } catch (error) {
        console.error("Ошибка при получении курса валют:", error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrency]);

  return (
    <div className="bg-finance-changer w-[100%] md:w-[75%] md:h-[150px] md:text-white py-4 px-5 rounded-lg  md:mb-[80px]">
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-xl">
          {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
        </h1>
        <p className="bg-currency-changer text-sm font-semibold md:bg-gray-200 bg-opacity-10 rounded-lg px-2 py-1">
          {exchangeRates
            ? `1 USD = ${rubRate.toFixed(2)} рубля`
            : "Загрузка..."}
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        {financeSummaryData.map((item) => (
          <div
            className="w-[45%] md:w-[24%] bg-gray-200 bg-opacity-10 rounded-lg p-2 mb-4 md:mb-0"
            key={item.title}
          >
            <p className="text-xl font-bold">
              {formatNumber(item.amount)} {selectedCurrency?.symbol}
            </p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
