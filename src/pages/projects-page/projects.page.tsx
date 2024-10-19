import React from "react";
import ProjectsPageFilter from "@app/pages/projects-page/blocks/projects-page-filter";
import HomeProjectPage from "@app/pages/projects-page/blocks/home-project.page";

const ProjectsPage = () => {
  return (
    <div className='flex-grow bg-[#F5F5F7] flex'>
      <ProjectsPageFilter />
      <HomeProjectPage />
    </div>
  );
};

export default ProjectsPage;