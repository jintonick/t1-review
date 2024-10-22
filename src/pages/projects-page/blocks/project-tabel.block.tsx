import React, { useState } from "react";
import { Button, Pagination, Modal } from "antd";
import RubberTable from "@app/components/rubber-table";
import data from "./data.mock.json";
import CalendarBox from "@app/components/calendar/EventCalendar";

type DataItem = {
  id: string;
  name: string;
  spec: string;
  comp: string;
};

const ProjectTabelBlock = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
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
    {
      title: "БРОНЬ",
      index: "action",
      maxWidth: 230,
    },
  ];

  const transformedData = data.map((item) => ({
    ...item,
    name: (
      <div>
        <h1 className="text-[16px]">{item.name}</h1>
      </div>
    ),
    spec: (
      <div>
        <h1 className="text-[16px]">{item.spec}</h1>
      </div>
    ),
    comp: (
      <div>
        <h1 className="text-[16px]">{item.comp}</h1>
      </div>
    ),
    action: (
      <div>
        <Button type="text" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setSelectedItem(item);
        }}>
            Выбрать доступное время
        </Button>
      </div>
    ),
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = transformedData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
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
      <Modal
        visible={!!selectedItem}
        width={1000}
        title="Выбор доступного времени"
        onCancel={handleModalClose}
        footer={null}
      >
        <CalendarBox />
      </Modal>
    </div>
  );
};

export default ProjectTabelBlock;

