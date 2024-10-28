import React from "react";
// import { Typography } from "@mui/material";
import { IEventInfo } from "./types";

interface IProps {
  event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
  return (
    <div style={{}}>
      <p>{event.description}</p>
    </div>
  );
};

export default EventInfo;