import React from "react";
import ProjectTabelBlock from "@app/pages/projects-page/blocks/project-tabel.block";

const HomeProjectPage = () => {

  return (
    <div className="pl-[22px] pr-[30px] py-[28px] w-full flex flex-col ">
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="font-bold text-[24px]">Ревьюверы</h1>
      </div>
      <ProjectTabelBlock />
    </div>
  );
};

export default HomeProjectPage;
