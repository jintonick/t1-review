import React, { useState } from "react";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import { Upload, Input, Switch, Button } from "antd";
import CustomSelect from "@app/components/select/select";
import ArrowsLeftRigthIcon from "@app/imgs/icons/arrows-left-rigth.icon";

const { Dragger } = Upload;
const { TextArea } = Input;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const MyDeviceForm: React.FC = () => {
  const [uploadSubtitles, setUploadSubtitles] = useState<boolean>(false);
  const onChange = () => {
    setUploadSubtitles(true);
  };

  return (
    <div className="w-[513px] bg-[#F5F5F7] rounded-r-[16px] px-[36px] pt-[32px] flex flex-col gap-[16px]">
      <div>
        <h1 className="font-medium mb-[8px] ">1. Add your file</h1>
        <div className="pl-[1px]">
          <Dragger>
            <div className="flex flex-col justify-between items-center">
              <p className="ant-upload-drag-icon">
                <InboxOutlined size={24} />
              </p>
              <p className="text-[#598BF2]">Click to add file or drag and drop MOV, MP4, WEBM</p>
            </div>
          </Dragger>
        </div>
      </div>
      <div>
        <h1 className="font-medium mb-[16px] ">2. Specify the project name</h1>
        <Input className="rounded-[10px] border-[#DCE0E5] text-[14px]" placeholder="Enter your name"/>
      </div>
      <div>
        <h1 className="font-medium mb-[16px] ">3. Specify the source and destination language of the video</h1>
        <div className="flex justify-between items-center">
          <CustomSelect
            options={options}
            placeholder="Language"
            width="197px"
            height="34px"
          />
          <ArrowsLeftRigthIcon size={24}/>
          <CustomSelect
            options={options}
            placeholder="Language"
            width="197px"
            height="34px"
          />
        </div>
      </div>
      <div>
        <h1 className="font-medium mb-[16px] ">4. Please provide a description of the project</h1>
        <TextArea
          placeholder="Enter.."
          style={{ height: 107, resize: "none", borderRadius: "10px" }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Switch className="bg-[#E3E6ED] bg:active-[#598BF2] w-[29px]" onChange={onChange} size="small"/>
          <h1 className=" text-[14px] text-[#A6ABBA]">Use your own subtitles (SRT/VTT)</h1>
        </div>
        <div>
          {uploadSubtitles &&
                        <Upload>
                          <Button className="shadow-none border-none bg-[#F5F5F7] text-[14px] text-[#A6ABBA]" icon={<DownloadOutlined />}>Select from device</Button>
                        </Upload>
          }
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="w-[117px] h-[34px] rounded-[10px] text-white bg-[#598BF2] shadow-none border-none font-medium">Add</Button>
      </div>
    </div>
  );
};

export default MyDeviceForm;
