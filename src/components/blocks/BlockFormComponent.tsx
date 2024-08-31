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
    <div className="w-[100%] max-h-[300px] py-5 px-4 border border-gray-300 rounded-lg overflow-y-auto shadow-lg shadow-gray-300 mb-5">
      <div className="flex justify-between font-bold mb-4">
        <h1 className="text-2xl">{title}</h1>
        <button type="button" onClick={onAddItem} className="text-blue-400">
          Добавить
        </button>
      </div>
      {children}
    </div>
  );
};
