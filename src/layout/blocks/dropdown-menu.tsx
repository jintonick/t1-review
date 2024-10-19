import React from "react";
import {HelpIcon, ListIcon, LogOutIcon, SettingIcon} from "@icons/";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

interface DropdownMenuProps {
    onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment-history");
  };
  return (
    <div className="absolute top-14 right-0 w-[166px] h-[231px] text-[14px] bg-white border-[#F1F2F3] border-[1px] shadow-md rounded-[12px] pl-[22px] pr-[40px] py-[18px] z-50">
      <ul className="flex flex-col gap-[12px] w-full">
        <li >
          <Button type="link" className="text-black flex items-center gap-[8px] p-0 cursor-pointer">
            <ListIcon size={24} />
            <span>Subscription</span>
          </Button>
        </li>
        <li>
          <Button onClick={handleClick} type="link" className="text-black flex items-center gap-[8px] p-0 cursor-pointer">
            <SettingIcon size={24} />
            <span>History</span>
          </Button>
        </li>
        <li >
          <Button type="link" className="text-black flex items-center gap-[8px] p-0 cursor-pointer">
            <HelpIcon size={24} />
            <span>Help</span>
          </Button>
        </li>
      </ul>
      <ul>
        <div className="border-t-[1px] border-[#DCE0E5] my-[8px]"></div>
        <li>
          <Button onClick={onLogout} className="text-black flex pt-[2px] items-center gap-[8px] p-0 cursor-pointer" type="link">
            <LogOutIcon size={24} />
            <span>Log out</span>
          </Button>
        </li>
        <li className="flex items-center pt-[14px] gap-[8px] cursor-pointer text-[#FE0E0E]">
          <span>Delete account</span>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
