import { type Event } from "react-big-calendar";

export interface ITodo {
  _id: string;
  title: string;
  color?: string;
}

export interface IEventInfo extends Event {
  _id: string;
  description: string;
  todoId?: string;
  type?: "set" | "select";
}

export interface EventFormData {
  description: string;
  todoId?: string;
}

export interface DatePickerEventFormData {
  description: string;
  link: string;
  todoId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
  type?: "set" | "select",
}
