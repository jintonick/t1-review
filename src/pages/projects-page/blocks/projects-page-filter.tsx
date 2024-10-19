import React, {useState} from "react";
import {Button, DatePicker, Input, InputNumber, Slider} from "antd";
import CustomSelect from "@app/components/select/select";
import search from "../../../imgs/search.icon.svg";
import dayjs from "dayjs";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const ProjectsPageFilter = () => {
  const [stepsCount, setStepsCount] = useState<number>(5);
  const dateFormat = "MM.DD.YY";

  return (
    <div className="bg-white flex-grow w-full  max-w-[291px] py-[24px] pr-[27px] pl-[34px] flex flex-col">
      <h1 className="font-bold text-[24px]">Filters</h1>
      <div className="flex justify-between mt-[20px]">
        <DatePicker className="border-[#DCE0E5] w-[108px] h-[34px] rounded-[10px]" defaultValue={dayjs("2015/01/01", dateFormat)} format={dateFormat} />
        <DatePicker className="border-[#DCE0E5] w-[108px] h-[34px] rounded-[10px]" defaultValue={dayjs("2015/01/01", dateFormat)} format={dateFormat} />
      </div>
      <div className='mt-[20px] pb-[25px] border-b-[1px] border-[#DCE0E5]'>
        <div className="flex justify-between items-center font-medium text-[#5D697E]">
          <h1 className="text-[14px]">Duration project (min):</h1>
          <InputNumber className="border-[#DCE0E5] w-[75px] h-[34px] rounded-[10px]" min={1} max={10} defaultValue={3} />
        </div>
        <Slider className="fill-[#598BF2]" min={2} max={10} value={stepsCount} onChange={setStepsCount} />
      </div>
      <div className="pt-[18px] flex flex-col gap-[18px]">
        <div>
          <label className="text-[15px] text-[#2E3842] font-medium ml-[4px]">Name</label>
          <Input className="h-[34px] rounded-[10px] border-[#DCE0E5]" placeholder="Enter" />
        </div>
        <div className='flex flex-col'>
          <label className="text-[15px] text-[#2E3842] font-medium ml-[4px]">Status</label>
          <CustomSelect
            options={options}
            placeholder="Choose an option"
            height="34px"
          />
        </div>
      </div>
      <Button className="mt-[20px] h-[34px] border-none bg-[#598BF2] rounded-[10px] text-white font-bold text-[15px]"><img src={search}/><h1>Search</h1></Button>
    </div>
  );
};

export default ProjectsPageFilter;