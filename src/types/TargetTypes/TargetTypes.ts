export interface TargetProps {
  icon: {
    type: string;
    background: string;
  };
  currentValue: number;
  targetValue: number;
  name: string;
}

export interface IconPickerProps {
  selectedIcon: string;
  selectedColor: string;
  onIconSelect: (icon: string, color: string) => void;
}
