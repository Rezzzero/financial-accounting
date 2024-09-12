import { useState } from "react";

export const useIcon = (data?: {
  icon?: { type?: string; background?: string };
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>(
    data?.icon?.type || "Add"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    data?.icon?.background || "bg-gray-400"
  );

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
