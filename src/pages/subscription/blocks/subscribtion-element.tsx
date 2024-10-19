import React from "react";
import {Button, Collapse} from "antd";
import type { CollapseProps } from "antd";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "View benefits",
    children: <div></div>,
  }
];

const SubscribtionElement = () => {
  return (
    <div className="w-[269px] min-h-[360px] border-[1px] border-[#DDE1E6] pt-[27px] flex flex-col items-center text-[#21272A] text-center">
      <h1 className="font-bold text-[28px]">Beginner</h1>
      <h2 className="mt-[4px]">Suitable for familiarization with the service</h2>
      <p className="font-bold text-[30px]  text-[#A2A9B0] line-through mt-[10px]">$35</p>
      <p className="font-bold text-[58px] mt-[-19px]">$25</p>
      <p className="mt-[-11px]">$25 USD monthly</p>
      <Button className="w-[139px] h-[58px] mt-[18px] border-none shadow-none bg-[#598BF2] rounded-[12px] text-white font-medium text-[20px]">Purchase</Button>
      <Collapse className="text-[18px] mt-[2px]" ghost items={items} />
    </div>
  );
};

export default SubscribtionElement;