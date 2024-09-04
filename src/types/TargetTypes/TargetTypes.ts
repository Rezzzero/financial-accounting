export interface TargetProps {
  icon: {
    type: string;
    background: string;
  };
  currentValue: number;
  targetValue: number;
  name: string;
  currency: string;
}

export interface TargetIconProps {
  selectedIcon: string;
  selectedColor: string;
}

export interface AddTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (target: TargetProps) => void;
}
