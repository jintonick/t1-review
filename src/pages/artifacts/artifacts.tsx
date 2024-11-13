import React, { useState } from "react";
import { Card, Button, Input, Pagination, Spin, Alert } from "antd";
import { useGetMeetingsQuery, useUpdateMeetingCommentMutation } from "@app/store/api/auth.api";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { useAuthContext } from "@app/utils/auth-provider";

const { TextArea } = Input;

type Artifact = {
  meetingId: number;
  name: string;
  expertName: string;
  userName: string;
  comment: string | null;
  description: string;
  startTime: string;
  endTime: string;
};

const Artifacts: React.FC = () => {
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [expandedMeetingId, setExpandedMeetingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: meetingsData, isLoading, error } = useGetMeetingsQuery();
  const [updateMeetingComment, { isLoading: isUpdating }] = useUpdateMeetingCommentMutation();

  const auth = useAuthContext();
  const userType = auth?.userType;
  const userName = auth?.sub;

  const now = moment().tz("Europe/Moscow");

  const pastMeetings: Artifact[] = meetingsData
    ? meetingsData.filter((meeting) => {
      const meetingStartTime = moment(meeting.startTime).tz("Europe/Moscow");
      const isPast = meetingStartTime.isBefore(now);

      if (userType === "client") {
        return isPast && meeting.userName === userName;
      } else if (userType === "expert") {
        return isPast && meeting.expertName === userName;
      }
      return false;
    })
    : [];

  const pageSize = 7;
  const total = pastMeetings.length;
  const startIndex = (currentPage - 1) * pageSize;
  const currentMeetings = pastMeetings.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleComment = (meetingId: number, currentComment: string | null) => {
    if (expandedMeetingId === meetingId) {
      setExpandedMeetingId(null);
    } else {
      setExpandedMeetingId(meetingId);
      setComments({
        ...comments,
        [meetingId]: currentComment || "",
      });
    }
  };
  const handleCommentChange = (meetingId: number, value: string) => {
    setComments({
      ...comments,
      [meetingId]: value,
    });
  };

  const handleSaveComment = async (meetingId: number) => {
    const comment = comments[meetingId];
    try {
      await updateMeetingComment({ meetingId, comment }).unwrap();
      toast.success("Комментарий успешно сохранён!");
      setExpandedMeetingId(null);
    } catch {
      toast.error("Не удалось сохранить комментарий. Попробуйте ещё раз.");
    }
  };

  const handleCancelComment = (meetingId: number) => {
    const originalComment = pastMeetings.find((m) => m.meetingId === meetingId)?.comment || "";
    setComments({
      ...comments,
      [meetingId]: originalComment,
    });
    setExpandedMeetingId(null);
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center">
        <Spin tip="Загрузка..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4">
        <Alert
          message="Ошибка"
          description="Не удалось загрузить данные о встречах."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-center my-[50px]">
        <h1 className="text-2xl font-bold">Артефакты</h1>
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex justify-start gap-32 w-[1000px] px-4 mb-2">
          <strong>Название встречи:</strong>
          <strong>Имя ревьювера:</strong>
          <strong>Дата:</strong>
        </div>
        <div>
          {currentMeetings.map((meeting) => (
            <Card
              key={meeting.meetingId}
              style={{ marginBottom: 16, width: "1000px" }}
              bodyStyle={{ padding: 16 }}
            >
              <div>
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="w-[270px]">{meeting.name}</p>
                      <p className="w-[255px]">{meeting.expertName}</p>
                      <p>
                        {moment(meeting.startTime)
                          .tz("Europe/Moscow")
                          .format("DD.MM.YYYY HH:mm")}
                      </p>
                    </div>
                    <Button
                      type="link"
                      onClick={() => toggleComment(meeting.meetingId, meeting.comment)}
                    >
                      {meeting.comment ? "Редактировать комментарий" : "Оставить комментарий"}
                    </Button>
                  </div>
                  <p>{meeting.comment || "Нет комментариев"}</p>
                </div>

                {expandedMeetingId === meeting.meetingId && (
                  <div className="mt-4">
                    <TextArea
                      rows={4}
                      value={comments[meeting.meetingId] || ""}
                      onChange={(e) => handleCommentChange(meeting.meetingId, e.target.value)}
                      placeholder="Введите ваш комментарий"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        type="primary"
                        onClick={() => handleSaveComment(meeting.meetingId)}
                        loading={isUpdating}
                        className="bg-blue-600 hover:bg-blue-700"
                        style={{ marginRight: 8 }}
                      >
                              Сохранить
                      </Button>
                      <Button
                        onClick={() => handleCancelComment(meeting.meetingId)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                              Отменить
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Artifacts;




