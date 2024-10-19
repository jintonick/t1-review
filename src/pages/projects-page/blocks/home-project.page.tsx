import React, { useState } from "react";
import { Button } from "antd";
import plus_curcle from "../../../imgs/plus-curcle.icon.svg";
import ProjectTabelBlock from "@app/pages/projects-page/blocks/project-tabel.block";
import ProjectModal from "@app/pages/projects-page/blocks/project-modal";

const HomeProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pl-[22px] pr-[30px] py-[28px] w-full flex flex-col ">
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="font-bold text-[24px]">Home</h1>
        <Button
          onClick={handleOpenModal}
          className="w-[128px] h-[29px] border-none bg-[#598BF2] text-white rounded-[10px]"
        >
          <img src={plus_curcle} alt="New video" />
          <h1 className=" font-bold">New video</h1>
        </Button>
      </div>
      <ProjectTabelBlock />

      <ProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default HomeProjectPage;
