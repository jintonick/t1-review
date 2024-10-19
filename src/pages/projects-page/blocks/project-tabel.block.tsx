import React, { useState } from "react";
import { Button, Pagination } from "antd";
import RubberTable from "@app/components/rubber-table";
import arrow_left_rigth from "../../../imgs/arrows-left-right.svg";
import video from "../../../imgs/video-preview.png";
import trash from "../../../imgs/trash.icon.svg";
import data from "./data.mock.json";

const ProjectTabelBlock = () => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Maximum items per page

  const columns = [
    {
      title: "NAME",
      index: "name",
      maxWidth: 400,
    },
    {
      title: "CREATED",
      index: "crated",
    },
    {
      title: "UPDATE",
      index: "update",
    },
    {
      title: "DURATION",
      index: "duration",
    },
    {
      title: "STATUS",
      index: "status",
      maxWidth: 200,
    },
    {
      title: "",
      index: "actions",
      maxWidth: 120,
    },
  ];

  // Transform data as before
  const transformedData = data.map((item) => ({
    ...item,
    name: (
      <div className="flex items-center gap-[32px]">
        <div className="text-[14px] pr-[20px]">
          <h1>{item.name}</h1>
          <div className="flex text-[#A6ABBA] w-[120px]">
            {item.language1}
            <img src={arrow_left_rigth} alt="Arrow" />
            {item.language2}
          </div>
        </div>
        <img src={video} alt="Video Preview" />
      </div>
    ),
    crated: (
      <div>
        <h1 className="text-[#A6ABBA] text-[14px]">{item.created}</h1>
      </div>
    ),
    update: (
      <div>
        <h1 className="text-[#A6ABBA] text-[14px]">{item.created}</h1>
      </div>
    ),
    duration: (
      <div className="max-w-[80px]">
        <div className="w-[76px] h-[26px] bg-[#F0F1F2] rounded-[34px] flex justify-center items-center text-[#1A2128] text-[13px]">
          {item.duration}
        </div>
      </div>
    ),
    status: (
      <div>
        <h1 className="mb-[4px]">Uploaded</h1>
        <div className="flex gap-[2px]">
          <div className="w-[30px] h-[3px] bg-[#598BF2] rounded-full"></div>
          <div className="w-[30px] h-[3px] bg-[#F5B60C] rounded-full"></div>
          <div className="w-[30px] h-[3px] bg-[#3BA86D] rounded-full"></div>
        </div>
      </div>
    ),
    actions: (
      <div className="flex justify-center items-center">
        <Button className="border-none rounded-full">
          <img className="h-[24px] w-[24px]" src={trash} alt="Delete" />
        </Button>
      </div>
    ),
  }));

  // Calculate the indices for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentData = transformedData.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <RubberTable columns={columns} dataSource={currentData} />
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false} // Hide the page size changer if not needed
      />
    </div>
  );
};

export default ProjectTabelBlock;
