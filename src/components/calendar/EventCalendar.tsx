import React, { useState } from "react";
import { Box, Card, CardContent, Container, Divider } from "@mui/material";
import { Calendar, type Event, momentLocalizer, Views } from "react-big-calendar";
import { Button as ButtonAnt } from "antd";

// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import pl from "date-fns/locale/pl";

import moment from "moment";
import "moment/locale/ru";



import "react-big-calendar/lib/css/react-big-calendar.css";

import EventInfo from "./EventInfo";
// import AddEventModal from "./AddEventModal";
import EventInfoModal from "./EventInfoModal";
import { AddTodoModal } from "./AddTodoModal";
import AddDatePickerEventModal from "./AddDatePickerEventModal";
import { DatePickerEventFormData, IEventInfo, ITodo } from "./types";

moment.locale("ru");
const localizer = momentLocalizer(moment);

const messages = {
  week: "Неделя",
  month: "Месяц",
  day: "День",
  previous: "<",
  next: ">",
  today: "Сегодня"
};

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

// const initialEventFormState: EventFormData = {
//   description: "",
//   todoId: undefined,
// };

const initialDatePickerEventFormData: DatePickerEventFormData = {
  description: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
  link: "",
};



const CalendarBox = () => {
  // const [openSlot, setOpenSlot] = useState(false);
  const [openModalSelectDate, setOpenModalSelectDate] = useState(false);
  const [openModalSetDate, setOpenModalSetDate] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null);

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [datePickerDataSelected, setDatePickerDataSelected] =
    useState<DatePickerEventFormData>(initialDatePickerEventFormData);

  const [todos, setTodos] = useState<ITodo[]>([]);

  // const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState);


  const [eventsSet, setEventsSet] = useState<IEventInfo[]>([]);
  const [datePickerDataSet, setDatePickerDataSet] =
    useState<DatePickerEventFormData>(initialDatePickerEventFormData);

  // const handleSelectSlot = (event: Event) => {
  //   setOpenSlot(true);
  //   setCurrentEvent(event);
  // };

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  // const handleClose = () => {
  //   setEventFormData(initialEventFormState);
  //   setOpenSlot(false);
  // };

  const handleDatePickerClose = () => {
    setDatePickerDataSelected(initialDatePickerEventFormData);
    setOpenModalSelectDate(false);

    setDatePickerDataSet(initialDatePickerEventFormData);
    setOpenModalSetDate(false);
  };

  // const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const data: IEventInfo = {
  //     ...eventFormData,
  //     _id: generateId(),
  //     start: currentEvent?.start,
  //     end: currentEvent?.end,
  //   };

  //   const newEvents = [...events, data];

  //   setEvents(newEvents);
  //   handleClose();
  // };

  const addHours = (date: Date | undefined, hours: number) => {
    if (!date) return undefined;

    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);

    return newDate;
  };


  const setMinToZero = (date: Date | undefined) => {
    if (!date) return undefined;

    const newDate = new Date(date);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
  };



  const onAddEventFromDatePicker = () => {
    const dataTypeSelect: IEventInfo = {
      ...datePickerDataSelected,
      _id: generateId(),
      start: setMinToZero(datePickerDataSelected.start),
      end: datePickerDataSelected.allDay
        ? addHours(datePickerDataSelected.start, 12)
        : setMinToZero(datePickerDataSelected.end),
    };

    const newEvents = [...events, dataTypeSelect];

    setEvents(newEvents);
    setDatePickerDataSelected(initialDatePickerEventFormData);
    handleDatePickerClose();
  };

  const onAddEventSetFromDatePicker = () => {
    const dataTypeSet: IEventInfo = {
      ...datePickerDataSet,
      _id: generateId(),
      start: setMinToZero(datePickerDataSet.start),
      end: datePickerDataSet.allDay
        ? addHours(datePickerDataSet.start, 12)
        : setMinToZero(datePickerDataSet.end),
    };
    const newEvents = [...eventsSet, dataTypeSet];

    setEventsSet(newEvents);
    setDatePickerDataSet(initialDatePickerEventFormData);
    handleDatePickerClose();
  };

  const onDeleteEvent = () => {
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!));
    setEventInfoModal(false);
  };
  console.log(events);

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

              <ButtonAnt onClick={() => {
                setOpenModalSelectDate(true);
                setDatePickerDataSelected((prevState) => ({
                  ...prevState,
                  type: "select",
                }));
              }} className="border-none shadow-none h-[38px] rounded-[10px] mr-[10px] bg-[#588BF2] text-white font-normal text-[15px]">Добавить встречу</ButtonAnt>
              <ButtonAnt onClick={() => {
                setOpenModalSetDate(true);
                setDatePickerDataSet((prevState) => ({
                  ...prevState,
                  type: "set",
                }));
              }} className="border-none shadow-none h-[38px] rounded-[10px] bg-[#588BF2] text-white font-normal text-[15px]">Добавить свободное время</ButtonAnt>

            </Box>
            <Divider style={{ margin: 10 }} />
            {/* <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={todos}
            /> */}
            <AddDatePickerEventModal
              open={openModalSelectDate}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerDataSelected}
              setDatePickerEventFormData={setDatePickerDataSelected}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
              type="select"
              freeTime={eventsSet}
              busyTime={events}
            />
            <AddDatePickerEventModal
              open={openModalSetDate}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerDataSet}
              setDatePickerEventFormData={setDatePickerDataSet}
              onAddEvent={onAddEventSetFromDatePicker}
              todos={todos}
              type="set"
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent as IEventInfo}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
            />
            <Calendar
              min={moment().startOf("day").toDate()}
              max={moment().endOf("day").toDate()}
              messages={messages}
              localizer={localizer}
              events={[...events, ...eventsSet]}
              onSelectEvent={handleSelectEvent}
              // onSelectSlot={handleSelectSlot}
              // selectable
              startAccessor="start"
              components={{ event: EventInfo }}
              endAccessor="end"
              defaultView="week"
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              eventPropGetter={(event: IEventInfo) => {
                return {
                  style: {
                    backgroundColor: event.type === "set" ? "#C6C6C6" : "#00AAE6",
                    border: event.type === "set" ? "1px solid #C6C6C6" : "1px solid #0090C4",
                    borderRadius: "5px",
                    zIndex: event.type === "set" ? 5 : 6,
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
