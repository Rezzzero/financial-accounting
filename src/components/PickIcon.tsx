import { availableColors, iconMapping } from "./blocks/SelectedIcon";

interface PickIconProps {
  selectedColor: string;
  selectedIcon: string;
  handleColorClick: (color: string) => void;
  handleIconClick: (icon: string) => void;
}

export const PickIcon = ({
  selectedColor,
  selectedIcon,
  handleColorClick,
  handleIconClick,
}: PickIconProps) => {
  return (
    <div>
      <h3>Выберите иконку</h3>
      <div className="flex flex-nowrap gap-4 mt-2 mb-2">
        {Object.keys(iconMapping).map((icon) => (
          <div
            key={icon}
            className={`flex h-[45px] w-[45px] bg-gray-400 rounded-full justify-center items-center cursor-pointer ${
              icon === selectedIcon ? "ring-2 ring-target-color" : ""
            }`}
            onClick={() => handleIconClick(icon)}
          >
            {iconMapping[icon]}
          </div>
        ))}
      </div>
      <h3>Выберите цвет иконки</h3>
      <div className="flex flex-nowrap gap-4 mt-2 mb-4">
        {availableColors.map((color) => (
          <div
            key={color}
            className={`h-[45px] w-[45px] rounded-full cursor-pointer ${color} ${
              color === selectedColor ? "ring-2 ring-target-color" : ""
            }`}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
};
