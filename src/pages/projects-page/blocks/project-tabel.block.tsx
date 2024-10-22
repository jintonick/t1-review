import React, { useState } from "react";
import { Pagination } from "antd";
import RubberTable from "@app/components/rubber-table";
import data from "./data.mock.json";

const ProjectTabelBlock = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const columns = [
    {
      title: "ИМЯ",
      index: "name",
      maxWidth: 400,
    },
    {
      title: "СПЕЦИАЛИЗАЦИЯ",
      index: "spec",
    },
    {
      title: "КОМПЕТЕНЦИЯ",
      index: "comp",
    },
  ];

  // Transform data as before
  const transformedData = data.map((item) => ({
    ...item,
    name: (
      <div>
        <h1 className="text-[16px]">{item.name}</h1>
      </div>
    ),
    index: (
      <div>
        <h1 className="text-[16px]">{item.spec}</h1>
      </div>
    ),
    comp: (
      <div>
        <h1 className="text-[16px]">{item.comp}</h1>
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

      />
    </div>
  );
};

export default ProjectTabelBlock;
