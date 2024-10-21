import React from "react";
import { Typography } from "@mui/material";
import { IEventInfo } from "./EventCalendar";

interface IProps {
    event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
  return (
    <div>
      <Typography>{event.description}</Typography>
    </div>
  );
};

export default EventInfo;