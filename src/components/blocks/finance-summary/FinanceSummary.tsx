import { useState, useEffect } from "react";
import { apiKey } from "../../../utils/apiKeys";
import { formatNumber } from "../../../utils/formatingNumbers";

export const FinanceSummary = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const currentMonth = new Date().toLocaleString("ru-RU", { month: "long" });
  const financeSummaryData = [
    {
      title: "Доход",
      amount: 12000,
    },
    {
      title: "Расход",
      amount: 8000,
    },
    {
      title: "Баланс",
      amount: 15000,
    },
    {
      title: "Долги",
      amount: 5000,
    },
  ];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        const data = await response.json();
        setExchangeRate(data.conversion_rates.RUB.toFixed(2));
      } catch (error) {
        console.error("Ошибка при получении курса валют:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  return (
    <div
      className="w-[75%] h-[150px] text-white py-4 px-5 border border-gray-300 rounded-lg overflow-y-auto shadow-lg shadow-gray-300 mb-[80px]"
      style={{
        background: `
          linear-gradient(
            to top right, 
            #9C27B0 0%, 
            transparent 50%
          ), 
          linear-gradient(
            to right, 
            #3b82f6 8%, 
            #6366f1 100%
          )
        `,
      }}
    >
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-xl">
          {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
        </h1>
        <p className="text-sm font-semibold bg-gray-200 bg-opacity-10 rounded-lg px-2 py-1">
          {exchangeRate ? `1 USD = ${exchangeRate} рубля` : "Загрузка..."}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        {financeSummaryData.map((item) => (
          <div
            className="w-[25%] bg-gray-200 bg-opacity-10 rounded-lg p-2"
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
