import { useState } from "react";

export const useIcon = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("add");
  const [selectedColor, setSelectedColor] = useState<string>("bg-gray-400");

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return {
    selectedIcon,
    selectedColor,
    setSelectedIcon,
    setSelectedColor,
    handleIconClick,
    handleColorClick,
  };
};
