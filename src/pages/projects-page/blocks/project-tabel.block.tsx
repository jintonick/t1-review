import React, { useState } from "react";
import { Button, Pagination, Modal } from "antd";
import RubberTable from "@app/components/rubber-table";
import CalendarBox from "@app/components/calendar/EventCalendar";
import { Reviewer } from "@app/interfaces/user.type";
import { useAuthContext } from "@app/utils/auth-provider";
import { TableItem } from "@app/components/rubber-table/table.type";
import { useGetReviewersQuery } from "@app/store/api/auth.api";

const ProjectTabelBlock: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Reviewer | null>(null);
  const itemsPerPage = 6;

  const { data: apiData, error, isLoading } = useGetReviewersQuery();

  const auth = useAuthContext();
  const userId = Number(auth?.userId);

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

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !apiData) return <div>Ошибка при загрузке данных</div>;

  const reviewersData = apiData;

  const transformedData: TableItem[] = reviewersData.map((item: Reviewer) => ({
    ...item,
    name: (
      <div>
        <h1 className="text-[16px]">{item.name}</h1>
      </div>
    ),
    spec: (
      <div>
        <h1 className="text-[16px]">{item.specialization}</h1>
      </div>
    ),
    comp: (
      <div>
        <h1 className="text-[16px]">{item.expertId}</h1>
      </div>
    ),
    action: (
      <div>
        <Button
          type="text"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}
        >
                    Выбрать доступное время
        </Button>
      </div>
    ),
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData: TableItem[] = transformedData.slice(indexOfFirstItem, indexOfLastItem);

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
        total={reviewersData.length}
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
        {selectedItem && (
          <CalendarBox
            selectedReviewer={selectedItem}
            userId={userId}
            mode="slots"
          />
        )}
      </Modal>
    </div>
  );
};

export default ProjectTabelBlock;



