import { useState } from "react";
import LinearWithValueLabel from "../ProgressBar";
import { SelectedIcon } from "../SelectedIcon";
import { TargetProps } from "../../../types/TargetTypes/TargetTypes";
import { formatNumber } from "../../../utils/formatingNumbers";
import { useDispatch } from "react-redux";
import { updateGoal } from "../../../store/slices/goalsSlice";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { currencySymbol } from "../../../utils/constants";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export const TargetList = ({
  targetData,
  removeTarget,
}: {
  targetData: TargetProps[];
  removeTarget: (itemTitle: string) => void;
}) => {
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setInputValue(targetData[index].currentValue.toString());
  };

  const handleSave = (index: number) => {
    const updatedTarget = {
      ...targetData[index],
      currentValue: Number(inputValue),
    };
    dispatch(updateGoal(updatedTarget));
    setEditIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handleSave(index);
    }
  };

  const calculatePercentage = (
    currentValue: number,
    targetValue: number
  ): number => {
    return targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  };

  return (
    <Slider {...sliderSettings}>
      {targetData.map((target, index) => (
        <div
          key={index}
          className="flex flex-col relative border border-gray-400 hover:bg-blue-600 hover:bg-opacity-20 hover:border-blue-600 rounded-lg p-2 mb-2 cursor-pointer"
        >
          <CloseIcon
            className="absolute right-1 top-1 cursor-pointer hover:text-red-600"
            onClick={() => removeTarget(target.name)}
          />
          <div className="flex gap-2">
            <SelectedIcon
              selectedIcon={target.icon.type}
              selectedColor={target.icon.background}
            />
            <div className="flex flex-col">
              {editIndex === index ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={() => handleSave(index)}
                  className="bg-background-theme font-bold"
                  autoFocus
                />
              ) : (
                <p
                  className="font-bold cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  {formatNumber(target.currentValue)}{" "}
                  {currencySymbol[target.currency]}
                </p>
              )}
              <p className="text-sm">
                из {formatNumber(target.targetValue)}{" "}
                {currencySymbol[target.currency]}
              </p>
            </div>
          </div>
          <LinearWithValueLabel
            percentage={calculatePercentage(
              target.currentValue,
              target.targetValue
            )}
          />
          <p>{target.name}</p>
        </div>
      ))}
    </Slider>
  );
};
