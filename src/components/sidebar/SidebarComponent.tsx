import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const SidebarComponent = ({
  onToggleSidebar,
}: {
  onToggleSidebar: (collapsed: boolean) => void;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
    onToggleSidebar(!toggleSidebar);
  };

  return (
    <m.div
      animate={{
        width: isMobile ? "100%" : toggleSidebar ? "60px" : "250px",
        transition: {
          duration: 0.3,
          type: "spring",
        },
      }}
      className="flex flex-row justify-center bg-background-theme duration-300 h-[80px] md:flex-col md:justify-between md:font-bold md:h-[100vh] py-4 px-2 shadow-xl shadow-theme-shadow-color"
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
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="11"
                y1="5.5"
                x2="26"
                y2="5.5"
                stroke="var(--svg-fill-color)"
                strokeWidth="5"
              />
              <path
                d="M17.5 22L30.9234 5.5H4.07661L17.5 22Z"
                fill="var(--svg-fill-color)"
              />
              <circle
                cx="17.5"
                cy="17.5"
                r="15.5"
                stroke="var(--svg-fill-color)"
                strokeWidth="4"
              />
              <line
                x1="17.5"
                y1="3"
                x2="17.5"
                y2="32"
                stroke="var(--svg-fill-color)"
                strokeWidth="5"
              />
            </svg>

            {!toggleSidebar && <p>Yoney</p>}
          </Link>
          {!toggleSidebar && (
            <Switch defaultChecked onChange={handleThemeChange} />
          )}
        </div>
        <div className="flex md:flex-col text-sm md:text-base justify-center">
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 rounded-md hover:text-blue-400 hover:bg-hover-color"
          >
            <AccountBalanceWalletIcon style={{ color: "#60A5FA" }} />
            {!toggleSidebar && <p>Операции</p>}
          </Link>
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 rounded-md hover:text-blue-400 hover:bg-hover-color"
          >
            <WatchLaterIcon style={{ color: "#60A5FA" }} />
            {!toggleSidebar && <p>История</p>}
          </Link>
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center md:py-3 px-2 gap-2 rounded-md hover:text-blue-400 hover:bg-hover-color"
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
