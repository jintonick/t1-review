// EventInfo.tsx

import React from "react";
import { EventProps } from "react-big-calendar";
import { IEventInfo } from "./types";

const EventInfo: React.FC<EventProps<IEventInfo>> = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong>
      <div>{event.description}</div>
    </div>
  );
};

export default EventInfo;
