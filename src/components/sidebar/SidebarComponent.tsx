import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { motion } from "framer-motion";

export const SidebarComponent = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <motion.div
      animate={{
        width: toggleSidebar ? "60px" : "250px",
        transition: { duration: 0.7, type: "spring" },
      }}
      className="flex flex-col justify-between font-bold h-[100vh] py-4 px-2 shadow-xl shadow-gray-500"
    >
      <div>
        <div className="flex justify-end pr-2 py-2">
          {toggleSidebar ? (
            <ArrowForwardIosIcon
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className="cursor-pointer"
            />
          ) : (
            <ArrowBackIosNewIcon
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="flex px-2 items-center justify-between">
          <Link to="/" className="flex items-center py-3 gap-2">
            <img src="../../../media/YoneyLogo.svg" alt="YoneyLogo" />
            {!toggleSidebar && <p>Yoney</p>}
          </Link>
          {!toggleSidebar && <Switch defaultChecked />}
        </div>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <AccountBalanceWalletIcon style={{ color: "#60A5FA" }} />
          {!toggleSidebar && <p>Операции</p>}
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <WatchLaterIcon style={{ color: "#60A5FA" }} />
          {!toggleSidebar && <p>История</p>}
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
        >
          <BusinessCenterIcon style={{ color: "#60A5FA" }} />
          {!toggleSidebar && <p>Аналитика</p>}
        </Link>
      </div>
      {!toggleSidebar && (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="w-[180px] bg-blue-500 text-white p-2 rounded-lg"
          >
            Приложение
          </button>
          <button
            type="button"
            className="w-[180px] border border-blue-500 text-blue-500 p-2 rounded-lg"
          >
            Подписаться
          </button>
        </div>
      )}
    </motion.div>
  );
};
