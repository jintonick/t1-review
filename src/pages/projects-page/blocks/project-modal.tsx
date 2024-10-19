import React, { useState } from "react";
import Modal from "@app/components/modal/modal";
import { MonitorIcon, YoutubeIcon } from "@icons/";
import { Button } from "antd";
import MyDeviceForm from "./my-device-form";
import YoutubeLinkForm from "./youtube-link-form";

const ProjectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState<"device" | "youtube">("device");

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={"823px"}>
      <div className="w-[823px] h-[640px] flex p-[1px]">
        <div className="w-[310px] pl-[36px] pt-[32px] flex flex-col">
          <h2 className="text-[24px] font-bold mb-4">Adding a Project</h2>
          <Button
            className={`border-none shadow-none flex font-medium items-center pl-[16px] justify-start gap-[16px] w-[194px] h-[48px] rounded-[16px] ${
              activeForm === "device" ? "bg-[#F5F5F7]" : ""
            }`}
            onClick={() => setActiveForm("device")}
          >
            <MonitorIcon size={24} />
            <h1>My device</h1>
          </Button>
          <Button
            className={`border-none shadow-none mt-[8px] flex font-medium items-center pl-[16px] justify-start gap-[16px] w-[194px] h-[48px] rounded-[16px] ${
              activeForm === "youtube" ? "bg-[#F5F5F7]" : ""
            }`}
            onClick={() => setActiveForm("youtube")}
          >
            <YoutubeIcon size={24} />
            <h1>Youtube link</h1>
          </Button>
        </div>

        {activeForm === "device" ? <MyDeviceForm /> : <YoutubeLinkForm />}
      </div>
    </Modal>
  );
};

export default ProjectModal;

