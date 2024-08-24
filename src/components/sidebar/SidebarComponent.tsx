import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

export const SidebarComponent = () => {
  return (
    <div className="flex flex-col justify-between font-bold h-[100vh] pb-4 shadow-xl shadow-gray-500">
      <div className="px-2">
        <div className="flex px-2 items-center justify-between">
          <p>Yoney</p>
          <Switch defaultChecked />
        </div>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <AccountBalanceWalletIcon style={{ color: "#60A5FA" }} />
          <p>Операции</p>
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <WatchLaterIcon style={{ color: "#60A5FA" }} />
          <p>История</p>
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <BusinessCenterIcon style={{ color: "#60A5FA" }} />
          <p>Аналитика</p>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          className="w-[180px] bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Приложение
        </button>
        <button
          type="button"
          className="w-[180px] border border-blue-500 text-blue-500 py-2 px-4 rounded-lg"
        >
          Подписаться
        </button>
      </div>
    </div>
  );
};
