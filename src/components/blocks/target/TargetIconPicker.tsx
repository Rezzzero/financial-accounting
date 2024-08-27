import { useState } from "react";
import { IconPickerProps } from "../../../types/TargetTypes/TargetTypes";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublicIcon from "@mui/icons-material/Public";

const iconMapping: Record<string, JSX.Element> = {
  add: <AddIcon style={{ color: "white", fontSize: "35px" }} />,
  home: <HomeIcon style={{ color: "white", fontSize: "35px" }} />,
  phone: <PhoneAndroidIcon style={{ color: "white", fontSize: "35px" }} />,
  travel: <PublicIcon style={{ color: "white", fontSize: "35px" }} />,
};

const availableColors = [
  "bg-gray-400",
  "bg-red-600",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
];

export const TargetIconPicker = ({
  selectedIcon,
  selectedColor,
  onIconSelect,
}: IconPickerProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIconState, setSelectedIconState] = useState(selectedIcon);
  const [selectedColorState, setSelectedColorState] = useState(selectedColor);

  const handleIconClick = (icon: string) => {
    setSelectedIconState(icon);
  };

  const handleColorClick = (color: string) => {
    setSelectedColorState(color);
  };

  const handleSave = () => {
    onIconSelect(selectedIconState, selectedColorState);
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex h-[45px] w-[45px] ${selectedColor} rounded-full justify-center items-center cursor-pointer`}
        onClick={() => setModalOpen(true)}
      >
        {iconMapping[selectedIcon]
          ? iconMapping[selectedIcon]
          : iconMapping.add}
      </div>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col max-w-sm mx-auto my-10 p-4 bg-white rounded">
          <h2>Выберите иконку</h2>
          <div className="flex gap-4 mt-2 mb-2">
            {Object.keys(iconMapping).map((icon) => (
              <div
                key={icon}
                className={`flex h-[45px] w-[45px] bg-gray-400 rounded-full justify-center items-center cursor-pointer ${
                  icon === selectedIconState ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleIconClick(icon)}
              >
                {iconMapping[icon]}
              </div>
            ))}
          </div>
          <h2>Выберите цвет</h2>
          <div className="flex gap-4 mt-2">
            {availableColors.map((color) => (
              <div
                key={color}
                className={`h-[45px] w-[45px] rounded-full cursor-pointer ${color} ${
                  color === selectedColorState ? "ring-2 ring-black" : ""
                }`}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
            style={{ marginTop: "20px" }}
          >
            Сохранить
          </button>
        </div>
      </Modal>
    </>
  );
};
