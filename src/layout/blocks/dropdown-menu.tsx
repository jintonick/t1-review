import React from "react";
import {LogOutIcon} from "@icons/";
import {Button} from "antd";

interface DropdownMenuProps {
    onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  return (
    <div className="absolute top-14 right-0 w-[166px] h-[61px] text-[14px] bg-white border-[#F1F2F3] border-[1px] shadow-md rounded-[12px] pl-[22px] pr-[40px] py-[0px] z-50">
      <ul className="flex flex-col w-full">
        <div className="my-[8px]"></div>
        <li>
          <Button onClick={onLogout} className="text-black flex pt-[2px] items-center gap-[8px] p-0 cursor-pointer" type="link">
            <LogOutIcon size={24} />
            <span>Log out</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
