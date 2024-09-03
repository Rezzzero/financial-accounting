import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinearWithValueLabel from "../ProgressBar";
import { useState } from "react";
import { formatNumber } from "../../../utils/formatingNumbers";
import { useDispatch } from "react-redux";
import { updateDebt } from "../../../store/slices/debtsSlice";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export const DebtsList = ({
  debtsData,
  removeDebt,
}: {
  debtsData: DebtProps[];
  removeDebt: (itemTitle: string) => void;
}) => {
  const dispatch = useDispatch();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPayment, setNewPayment] = useState<number | null>(null);

  const handleSavePayment = (index: number) => {
    if (newPayment !== null) {
      const updatedDebt = { ...debtsData[index] };
      updatedDebt.paidValue += newPayment;
      updatedDebt.remainValue = updatedDebt.currValue - updatedDebt.paidValue;

      dispatch(updateDebt(updatedDebt));

      setNewPayment(null);
      setEditingIndex(null);
    }
  };

  return (
    <Slider {...sliderSettings}>
      {debtsData.map((debt, index) => {
        const percentage = (debt.paidValue / debt.currValue) * 100;

        return (
          <div
            key={index}
            className="flex flex-col relative border border-gray-400 hover:bg-blue-600 hover:bg-opacity-20 hover:border-blue-600 rounded-lg p-2 mb-2 cursor-pointer"
          >
            <CloseIcon
              className="absolute right-1 top-1 cursor-pointer hover:text-red-600"
              onClick={() => removeDebt(debt.title)}
            />
            <div className="flex gap-2">
              <div className="flex h-[45px] w-[45px] bg-red-500 text-white rounded-full justify-center items-center cursor-pointer">
                <AttachMoneyIcon />
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{formatNumber(debt.currValue)} ₽</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-bold">Выплачено:</p>
                <p>Осталось:</p>
                <p>Вернуть до:</p>
              </div>
              <div className="flex flex-col gap-2">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={newPayment || ""}
                    onChange={(e) => setNewPayment(parseFloat(e.target.value))}
                    onBlur={() => handleSavePayment(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSavePayment(index);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <p
                    className="font-bold cursor-pointer"
                    onClick={() => setEditingIndex(index)}
                  >
                    {formatNumber(debt.paidValue)} ₽
                  </p>
                )}
                <p>{formatNumber(debt.remainValue)} ₽</p>
                <p>{new Date(debt.returnTo).toLocaleDateString()}</p>
              </div>
            </div>
            <LinearWithValueLabel percentage={percentage} />
            <p>{debt.title}</p>
          </div>
        );
      })}
    </Slider>
  );
};
