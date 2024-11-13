export interface DatePickerEventFormData {
  description: string;
  link: string;
  todoId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
  type?: "set" | "select";
}

export interface ITodo {
  _id: string;
  title: string;
  color?: string;
}

export interface IEventInfo {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description: string;
  _id: string;
  todoId?: string;
  eventType?: "set" | "select" | "slot" | "meeting";
}

export interface EventFormData {
  description: string;
  todoId?: string;
}

