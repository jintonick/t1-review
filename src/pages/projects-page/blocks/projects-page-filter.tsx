import React from "react";
import {Button, DatePicker, Input} from "antd";
import CustomSelect from "@app/components/select/select";
import search from "../../../imgs/search.icon.svg";
import dayjs from "dayjs";

const options = [
  { value: "option1", label: "Junior" },
  { value: "option2", label: "Middle" },
  { value: "option3", label: "Senior" },
];

const ProjectsPageFilter = () => {
  const dateFormat = "MM.DD.YY";

  return (
    <div className="bg-white flex-grow w-full  max-w-[291px] py-[24px] pr-[27px] pl-[34px] flex flex-col">
      <h1 className="font-bold text-[24px]">Фильтр</h1>
      <div className="pt-[18px] flex flex-col gap-[18px]">
        <div>
          <label className="text-[15px] text-[#2E3842] font-medium ml-[4px]">Найти ревьювера</label>
          <Input className="h-[34px] rounded-[10px] border-[#DCE0E5]" placeholder="Найти" />
        </div>
        <div className='flex flex-col'>
          <label className="text-[15px] text-[#2E3842] font-medium ml-[4px]">Компетенция</label>
          <CustomSelect
            options={options}
            placeholder="Выберите компетенцию"
            height="34px"
          />
        </div>
      </div>
      <div className="flex justify-between mt-[20px]">
        <DatePicker className="border-[#DCE0E5] w-[108px] h-[34px] rounded-[10px]" defaultValue={dayjs("2015/01/01", dateFormat)} format={dateFormat} />
        <DatePicker className="border-[#DCE0E5] w-[108px] h-[34px] rounded-[10px]" defaultValue={dayjs("2015/01/01", dateFormat)} format={dateFormat} />
      </div>
      <Button className="mt-[20px] h-[34px] border-none bg-[#598BF2] rounded-[10px] text-white font-bold text-[15px]"><img src={search}/><h1>Поиск</h1></Button>
    </div>
  );
};

export default ProjectsPageFilter;