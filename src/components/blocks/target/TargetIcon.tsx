import { TargetIconProps } from "../../../types/TargetTypes/TargetTypes";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublicIcon from "@mui/icons-material/Public";

const iconMapping: Record<string, JSX.Element> = {
  add: <AddIcon style={{ color: "white", fontSize: "35px" }} />,
  home: <HomeIcon style={{ color: "white", fontSize: "35px" }} />,
  phone: <PhoneAndroidIcon style={{ color: "white", fontSize: "35px" }} />,
  travel: <PublicIcon style={{ color: "white", fontSize: "35px" }} />,
};

export const TargetIcon = ({
  selectedIcon,
  selectedColor,
}: TargetIconProps) => {
  return (
    <div
      className={`flex h-[45px] w-[45px] ${selectedColor} rounded-full justify-center items-center`}
    >
      {iconMapping[selectedIcon] || iconMapping.add}
    </div>
  );
};
