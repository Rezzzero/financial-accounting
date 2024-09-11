export interface TargetProps {
  icon: {
    type: string;
    background: string;
  };
  currentValue: number;
  targetValue: number;
  title: string;
  currency: string;
  id: string;
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
