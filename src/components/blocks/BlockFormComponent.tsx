import { ReactNode } from "react";

type BlockProps = {
  title: string;
  children: ReactNode;
  onAddItem: () => void;
};

export const BlockFormComponent = ({
  title,
  children,
  onAddItem,
}: BlockProps) => {
  return (
    <div className="w-[100%] max-h-[300px] py-5 px-4 rounded-lg border border-theme-border-color shadow-md shadow-theme-shadow-color mb-5">
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-2xl">{title}</h1>
        <button
          type="button"
          onClick={onAddItem}
          className="text-theme-add-button-color"
        >
          Добавить
        </button>
      </div>
      {children}
    </div>
  );
};
