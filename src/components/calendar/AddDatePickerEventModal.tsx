import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent, useState, useMemo } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Button,
  Box,
  // Checkbox,
  // Typography,
} from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
// import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePickerEventFormData, IEventInfo, ITodo } from "./types";

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  datePickerEventFormData: DatePickerEventFormData
  setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  todos: ITodo[]
  type: "select" | "set"
  freeTime?: IEventInfo[]
  busyTime?: IEventInfo[]
}

// moment.locale("ru");

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  type,
  freeTime,
  busyTime
}: IProps) => {
  const [startSelectDate, setStartSelectDate] = useState<Date | null>(null);
  const [endSelectDate, setEndSelectDate] = useState<Date | null>(null);
  const { description, start, end, link } = datePickerEventFormData;

  const onClose = () => {
    handleClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const disabled = useMemo(() => {
    if (!freeTime) return false;

    return freeTime.some((item) => {
      const startFreeTime = item.start?.getTime();
      const endFreeTime = item.end?.getTime();

      if (startFreeTime && startSelectDate && endFreeTime && endSelectDate &&
        (startFreeTime <= startSelectDate.getTime() && startSelectDate.getTime() < endFreeTime)
        && (endFreeTime >= endSelectDate.getTime() && startFreeTime < endSelectDate.getTime())
        && startSelectDate.getTime() !== endSelectDate.getTime()) {
        if (busyTime && busyTime.length > 0) {
          return busyTime.some((elem) => {
            const startBusyTime = elem.start?.getTime();
            const endBusyTime = elem.end?.getTime();

            if (startBusyTime && endBusyTime && ((startSelectDate.getTime() < startBusyTime && endSelectDate.getTime() <= startBusyTime) || startSelectDate.getTime() >= endBusyTime)
              && ((endSelectDate.getTime() > endBusyTime && startSelectDate.getTime() >= endBusyTime) || endSelectDate.getTime() <= startBusyTime)) {
              return true;
            }
          });
        } else return true;
      }
    });

  }, [freeTime, startSelectDate, endSelectDate]);

  // const isDisabled = () => {
  //   if ((type === "select" && description === "") || start === null) {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <Dialog style={{ padding: "0px 40px" }} open={open} onClose={onClose}>
      <Box px={5}>
        <DialogTitle>{type === "select" ? "Забронируйте встречу" : "Выберите свободное время"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>To add a event, please fill in the information below.</DialogContentText> */}
          <Box component="form">
            {type === "select" &&
              <Box mb={1} mt={2}>
                <TextField
                  name="link"
                  value={link}
                  margin="dense"
                  id="link"
                  label="Link"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={onChange}
                />
              </Box>}
            {type === "select" && <TextField
              name="description"
              value={description}
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              onChange={onChange}
            />}

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box mb={3} mt={2}>
                <MobileDateTimePicker
                  label="Дата начала"
                  value={start || ""}
                  minutesStep={30}
                  onChange={(newValue) => {
                    setStartSelectDate(new Date(newValue!));
                    setDatePickerEventFormData((prevState) => {
                      return ({
                        ...prevState,
                        start: new Date(newValue!),
                      });
                    });
                  }
                  }
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Box>

              <MobileDateTimePicker
                label="Дата окончания"
                minDate={start}
                minutesStep={30}
                value={end || ""}
                onChange={(newValue) => {
                  setEndSelectDate(new Date(newValue!));
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    end: new Date(newValue!),
                  }));
                }
                }
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
      </Box>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Отменить
        </Button>
        <Button disabled={type === "select" && !disabled} color="success" onClick={onAddEvent}>
          Добавить
        </Button>
      </DialogActions>

    </Dialog>
  );
};
// AddDatePickerEventModal.displayName = "AddDatePickerEventModal";

export default AddDatePickerEventModal;