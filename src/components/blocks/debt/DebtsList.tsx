import { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { DebtProps } from "../../../types/DebtTypes/DebtTypes";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinearWithValueLabel from "../ProgressBar";
import { formatNumber } from "../../../utils/formatingNumbers";
import { updateDebt } from "../../../store/slices/debtsSlice";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../styles/CustomizeSlider.css";
import { currencySymbol } from "../../../utils/constants";
import { EditDebtModal } from "./EditDebtModal";

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
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtProps>({} as DebtProps);

  const sliderSettings = {
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleSavePayment = (index: number) => {
    if (newPayment !== null && newPayment !== 0) {
      const updatedDebt = { ...debtsData[index] };
      updatedDebt.paidValue += newPayment;
      updatedDebt.remainValue =
        updatedDebt.currentValue - updatedDebt.paidValue;

      dispatch(updateDebt(updatedDebt));
    }
    setNewPayment(null);
    setEditingIndex(null);
    setIsInputFocused(false);
  };

  const handleBlur = (index: number) => {
    if (newPayment === null) {
      setNewPayment(null);
      setEditingIndex(null);
      setIsInputFocused(false);
    } else {
      handleSavePayment(index);
    }
  };

  const calculatePercentage = (
    currentValue: number,
    targetValue: number
  ): number => {
    return targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  };

  const openModalWithDebt = (debt: DebtProps) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <EditDebtModal
          onClose={() => setIsModalOpen(false)}
          data={selectedDebt}
          onSave={(debt) => {
            dispatch(updateDebt(debt));
            setIsModalOpen(false);
          }}
        />
      )}
      <Slider {...sliderSettings}>
        {debtsData.map((debt, index) => {
          return (
            <div
              key={debt.title}
              className="flex flex-col relative border border-theme-border-color hover:bg-blue-600 hover:bg-opacity-20 hover:border-theme-border-color rounded-lg p-2 mb-2 cursor-pointer"
            >
              <EditIcon
                className="absolute right-8 top-1 cursor-pointer hover:text-theme-button-color"
                onClick={() => openModalWithDebt(debt)}
              />
              <CloseIcon
                className="absolute right-1 top-1 cursor-pointer hover:text-red-600"
                onClick={() => removeDebt(debt.title)}
              />
              <div className="flex gap-2">
                <div className="flex h-[45px] w-[45px] bg-red-500 text-white rounded-full justify-center items-center cursor-pointer">
                  <AttachMoneyIcon />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">
                    {formatNumber(debt.currentValue)}{" "}
                    {currencySymbol[debt.currency]}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Выплачено:</p>
                  <p>Осталось:</p>
                  <p>Вернуть до:</p>
                </div>
                <div className="flex flex-col gap-2">
                  {editingIndex === index && isInputFocused ? (
                    <input
                      type="number"
                      value={newPayment || ""}
                      onChange={(e) =>
                        setNewPayment(parseFloat(e.target.value))
                      }
                      className="bg-background-theme"
                      onBlur={() => handleBlur(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSavePayment(index);
                        }
                      }}
                      autoFocus
                      onFocus={() => setIsInputFocused(true)}
                    />
                  ) : (
                    <p
                      className="font-bold cursor-pointer"
                      onClick={() => {
                        setEditingIndex(index);
                        setIsInputFocused(true);
                      }}
                    >
                      {formatNumber(debt.paidValue)}{" "}
                      {currencySymbol[debt.currency]}
                    </p>
                  )}
                  <p>
                    {formatNumber(debt.remainValue)}{" "}
                    {currencySymbol[debt.currency]}
                  </p>
                  <p>{new Date(debt.returnTo).toLocaleDateString()}</p>
                </div>
              </div>
              <LinearWithValueLabel
                percentage={calculatePercentage(
                  debt.paidValue,
                  debt.currentValue
                )}
              />
              <p>{debt.title}</p>
            </div>
          );
        })}
      </Slider>
    </>
  );
};
