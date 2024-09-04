import { useDispatch } from "react-redux";
import { setCurrency } from "../../store/slices/currencySlice";

export const ChangeCurrency = () => {
  const dispatch = useDispatch();

  const currencies = [
    { label: "Рубли", value: "RUB", symbol: "₽" },
    { label: "Гривны", value: "UAH", symbol: "₴" },
    { label: "Доллары", value: "USD", symbol: "$" },
    { label: "Евро", value: "EUR", symbol: "€" },
  ];

  const handleCurrencyChange = (currency: {
    label: string;
    value: string;
    symbol: string;
  }) => {
    dispatch(setCurrency(currency));
  };
  return (
    <div className="w-[380px] text-blue-400 text-center md:border border-gray-300 rounded-lg p-4 md:block md:h-[150px]">
      <h1 className="text-xl font-bold mb-4">Выберите валюту</h1>
      <div className="flex justify-center space-x-4">
        {currencies.map((currency) => (
          <button
            key={currency.value}
            className="px-3 py-2 rounded-lg border hover:bg-blue-400 hover:text-white"
            onClick={() => handleCurrencyChange(currency)}
          >
            {currency.label}
          </button>
        ))}
      </div>
    </div>
  );
};
