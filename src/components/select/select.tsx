import React, { useState } from "react";
import {DownGrayIcon} from "@icons/";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder?: string;
    onChange?: (value: string) => void;
    width?: string;
    height?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "",
  onChange,
  width = "100%",
  height = "40px",
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative" style={{ width }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full  text-[14px] flex items-center justify-between px-2 py-2 text-left bg-white border border-[#DCE0E5] rounded-[10px] focus:outline-none hover:border-[#598BF2] focus:border-[#598BF2]"
        style={{ height }}
      >
        <span className={selectedValue ? "" : "text-[#A6ABBA]"}>
          {selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder}
        </span>
        <span className="w-[16px] h-[16px]  flex justify-center items-center ">
          <DownGrayIcon size={14} />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute text-[14px] z-10 w-full bg-white border border-[#DCE0E5] rounded-[10px] shadow-lg mt-1 max-h-60 overflow-auto">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 cursor-pointer hover:bg-[#598BF2] hover:text-white"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

