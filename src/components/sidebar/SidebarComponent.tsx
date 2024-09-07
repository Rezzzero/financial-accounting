import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import { m } from "framer-motion";

export const SidebarComponent = ({
  onToggleSidebar,
}: {
  onToggleSidebar: (collapsed: boolean) => void;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
    onToggleSidebar(!toggleSidebar);
  };

  return (
    <m.div
      animate={{
        width: isMobile ? "100%" : toggleSidebar ? "60px" : "250px",
        transition: { duration: 0.6, type: "spring" },
      }}
      className="flex flex-row justify-center h-[80px] md:flex-col md:justify-between md:font-bold md:h-[100vh] py-4 px-2 shadow-xl shadow-gray-500"
    >
      <div>
        <div className="flex justify-end pr-2 py-2 md:flex hidden">
          {toggleSidebar ? (
            <ArrowForwardIosIcon
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          ) : (
            <ArrowBackIosNewIcon
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="flex px-2 items-center justify-between md:flex hidden">
          <Link to="/" className="flex items-center py-3 gap-2">
            <img src="../../../media/YoneyLogo.svg" alt="YoneyLogo" />
            {!toggleSidebar && <p>Yoney</p>}
          </Link>
          {!toggleSidebar && <Switch defaultChecked />}
        </div>
        <div className="flex md:flex-col text-sm md:text-base justify-center">
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
          >
            <AccountBalanceWalletIcon style={{ color: "#60A5FA" }} />
            {!toggleSidebar && <p>Операции</p>}
          </Link>
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
          >
            <WatchLaterIcon style={{ color: "#60A5FA" }} />
            {!toggleSidebar && <p>История</p>}
          </Link>
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 hover:text-blue-400 hover:bg-gray-200"
          >
            <BusinessCenterIcon style={{ color: "#60A5FA" }} />
            {!toggleSidebar && <p>Аналитика</p>}
          </Link>
        </div>
      </div>
      {!toggleSidebar && (
        <div className="flex flex-col items-center gap-2 md:flex hidden">
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
    </m.div>
  );
};
