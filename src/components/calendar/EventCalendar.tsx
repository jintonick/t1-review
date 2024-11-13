import React, { useState, useMemo } from "react";
import { Box, Card, CardContent, Container, Divider } from "@mui/material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { Button as ButtonAnt } from "antd";
import moment from "moment";
import "moment/locale/ru";

import "react-big-calendar/lib/css/react-big-calendar.css";

import EventInfo from "./EventInfo";
import EventInfoModal from "./EventInfoModal";
import { AddTodoModal } from "./AddTodoModal";
import AddDatePickerEventModal from "./AddDatePickerEventModal";
import { DatePickerEventFormData, IEventInfo, ITodo } from "./types";
import {
  useBookMeetingMutation,
  useGetExpertSlotsQuery,
  useCreateSlotMutation,
  useGetMeetingsQuery,
  useDeleteMeetingMutation, // Добавлен хук для удаления встречи
} from "@app/store/api/auth.api";
import { Reviewer } from "@app/interfaces/user.type";
import { useAuthContext } from "@app/utils/auth-provider";
import { toast } from "react-toastify";
import { BookMeetingRequest, CreateSlotRequest, Meeting } from "@app/interfaces/api.types";
import { skipToken } from "@reduxjs/toolkit/query/react";

moment.locale("ru");
const localizer = momentLocalizer(moment);

const messages = {
  week: "Неделя",
  month: "Месяц",
  day: "День",
  previous: "<",
  next: ">",
  today: "Сегодня",
};

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const initialDatePickerEventFormData: DatePickerEventFormData = {
  description: "",
  link: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
  type: "select",
};

interface CalendarBoxProps {
  selectedReviewer: Reviewer;
  userId: number;
  mode: "slots" | "meetings";
}

const CalendarBox: React.FC<CalendarBoxProps> = ({ selectedReviewer, userId, mode }) => {
  const [openModalSelectDate, setOpenModalSelectDate] = useState(false);
  const [openModalSetDate, setOpenModalSetDate] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEventInfo | null>(null);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [datePickerDataSelected, setDatePickerDataSelected] =
      useState<DatePickerEventFormData>(initialDatePickerEventFormData);
  const [datePickerDataSet, setDatePickerDataSet] =
      useState<DatePickerEventFormData>(initialDatePickerEventFormData);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const [bookMeeting] = useBookMeetingMutation();
  const [createSlot] = useCreateSlotMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();

  const { data: slotsData, refetch: refetchSlots } = useGetExpertSlotsQuery(
    mode === "slots" ? selectedReviewer.expertId : skipToken
  );
  const { data: meetingsData, refetch: refetchMeetings } = useGetMeetingsQuery(
    mode === "meetings" ? undefined : skipToken
  );

  const auth = useAuthContext();
  const userType = auth?.userType;
  const userName = auth?.sub;

  const handleDatePickerClose = () => {
    setDatePickerDataSelected(initialDatePickerEventFormData);
    setOpenModalSelectDate(false);

    setDatePickerDataSet(initialDatePickerEventFormData);
    setOpenModalSetDate(false);
  };

  const handleAddMeeting = async () => {
    if (mode !== "slots") return;

    if (!selectedReviewer || !userId) {
      toast.error("Не удалось получить идентификатор пользователя или рецензента.");
      return;
    }

    const { link, description, start, end } = datePickerDataSelected;

    if (!link || !description || !start || !end) {
      toast.error("Пожалуйста, заполните все необходимые поля.");
      return;
    }

    const meetingData: BookMeetingRequest = {
      name: link,
      expertId: selectedReviewer.expertId,
      userId,
      description,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    console.log("Meeting Data:", meetingData);

    try {
      const response = await bookMeeting(meetingData).unwrap();
      toast.success(`Встреча успешно забронирована!${response}`);
      handleDatePickerClose();
      refetchMeetings();
    } catch (error) {
      toast.error(`Не удалось забронировать встречу. Попробуйте ещё раз.${error}`);
    }
  };

  const handleAddAvailableTime = async () => {
    if (mode !== "meetings") return;

    if (!userId) {
      toast.error("Не удалось получить идентификатор пользователя.");
      return;
    }

    const { start, end } = datePickerDataSet;

    if (!start || !end) {
      toast.error("Пожалуйста, выберите дату начала и окончания.");
      return;
    }

    const slotData: CreateSlotRequest = {
      name: "Свободный слот",
      expertId: userId, // Number
      description: "Выбрать дату",
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    try {
      const response = await createSlot(slotData).unwrap();
      toast.success(`Свободное время успешно добавлено!${response}`);
      handleDatePickerClose();
      refetchSlots();
    } catch (error) {
      toast.error(`Не удалось добавить свободное время. Попробуйте ещё раз.${error}`);
    }
  };

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleDeleteEvent = async () => {
    if (!currentEvent) return;

    try {
      await deleteMeeting({ meetingId: Number(currentEvent.id) }).unwrap();
      toast.success("Встреча успешно удалена!");
      setEventInfoModal(false);
      refetchMeetings();
    } catch (error) {
      toast.error(`Не удалось удалить встречу. Попробуйте ещё раз.${error}`);
    }
  };

  const slotEvents: IEventInfo[] = useMemo(() => {
    if (mode !== "slots" || !slotsData) return [];

    return slotsData.map((slot) => ({
      id: slot.id.toString(),
      _id: slot.id.toString(),
      title: slot.name,
      start: new Date(slot.startTime),
      end: new Date(slot.endTime),
      allDay: false,
      description: slot.description,
      eventType: "set",
    }));
  }, [slotsData, mode]);

  const meetingEvents: IEventInfo[] = useMemo(() => {
    if (mode !== "meetings" || !meetingsData) return [];
    let filteredMeetings: Meeting[] = [];
    if (userType === "client") {
      filteredMeetings = meetingsData.filter(
        (meeting) => meeting.userName === userName
      );
    } else if (userType === "expert") {
      filteredMeetings = meetingsData.filter(
        (meeting) => meeting.expertName === userName
      );
    }

    return filteredMeetings.map((meeting) => ({
      id: meeting.meetingId.toString(),
      _id: meeting.meetingId.toString(),
      title: meeting.name,
      start: new Date(meeting.startTime),
      end: new Date(meeting.endTime),
      allDay: false,
      description: meeting.description,
      eventType: "select",
    }));
  }, [meetingsData, userType, userName, mode]);

  const calendarEvents: IEventInfo[] = useMemo(() => {
    return mode === "slots" ? slotEvents : meetingEvents;
  }, [slotEvents, meetingEvents, mode]);

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              {mode === "meetings" && userType === "expert" ? (
                <ButtonAnt
                  onClick={() => {
                    console.log("Нажата кнопка 'Добавить свободное время'");
                    setOpenModalSetDate(true);
                    setDatePickerDataSet((prevState) => ({
                      ...prevState,
                      type: "set",
                    }));
                  }}
                  className="border-none shadow-none h-[38px] rounded-[10px] mr-[10px] bg-[#588BF2] text-white font-normal text-[15px]"
                >
                      Добавить свободное время
                </ButtonAnt>
              ) : (
                <div></div>
              )}
              {mode === "slots" ? (
                <ButtonAnt
                  onClick={() => {
                    console.log("Нажата кнопка 'Добавить встречу'");
                    setOpenModalSelectDate(true);
                    setDatePickerDataSelected((prevState) => ({
                      ...prevState,
                      type: "select",
                    }));
                  }}
                  className="border-none shadow-none h-[38px] rounded-[10px] mr-[10px] bg-[#588BF2] text-white font-normal text-[15px]"
                >
                      Добавить встречу
                </ButtonAnt>
              ) : (
                <div></div>
              )}
            </Box>
            <Divider style={{ margin: 10 }} />
            {mode === "meetings" && (
              <AddDatePickerEventModal
                open={openModalSetDate}
                handleClose={handleDatePickerClose}
                datePickerEventFormData={datePickerDataSet}
                setDatePickerEventFormData={setDatePickerDataSet}
                onAddEvent={handleAddAvailableTime}
                todos={todos}
                type="set"
                selectedReviewer={selectedReviewer}
                userId={userId}
              />
            )}
            {mode === "slots" && (
              <AddDatePickerEventModal
                open={openModalSelectDate}
                handleClose={handleDatePickerClose}
                datePickerEventFormData={datePickerDataSelected}
                setDatePickerEventFormData={setDatePickerDataSelected}
                onAddEvent={handleAddMeeting}
                todos={todos}
                type="select"
                selectedReviewer={selectedReviewer}
                userId={userId}
              />
            )}
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={handleDeleteEvent} // Передаем функцию удаления
              currentEvent={currentEvent}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
            />
            <Calendar<IEventInfo>
              localizer={localizer}
              events={calendarEvents}
              onSelectEvent={handleSelectEvent}
              startAccessor="start"
              endAccessor="end"
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              messages={messages}
              components={{ event: EventInfo }}
              eventPropGetter={(event) => {
                let backgroundColor = "#00AAE6";
                if (event.eventType === "set") {
                  backgroundColor = "#C6C6C6";
                } else if (event.eventType === "select") {
                  backgroundColor = "#FF5733";
                }
                return {
                  style: {
                    backgroundColor,
                    border: "1px solid #0090C4",
                    borderRadius: "10px",
                    zIndex: 6,
                  },
                };
              }}
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CalendarBox;














