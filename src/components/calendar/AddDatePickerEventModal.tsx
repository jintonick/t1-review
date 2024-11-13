import React, { Dispatch, SetStateAction, ChangeEvent, useMemo, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import { Reviewer } from "@app/interfaces/user.type";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePickerEventFormData, ITodo } from "./types";
import { useBookMeetingMutation, useCreateSlotMutation } from "@app/store/api/auth.api";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  handleClose: () => void;
  datePickerEventFormData: DatePickerEventFormData;
  setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>;
  onAddEvent: () => void;
  todos: ITodo[];
  type: "select" | "set";
  freeTime?: Date;
  busyTime?: Date;
  selectedReviewer: Reviewer | null;
  userId: number;
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  type,
  selectedReviewer,
  userId,
}: IProps) => {
  const { description, start, end, link } = datePickerEventFormData;

  const [bookMeeting, { isLoading: isBooking }] = useBookMeetingMutation();
  const [createSlot, { isLoading: isCreatingSlot }] = useCreateSlotMutation();

  const onClose = () => {
    handleClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const isFormValid = useMemo(() => {
    if (type === "select") {
      return (
        link.trim() !== "" &&
          description.trim() !== "" &&
          start !== undefined &&
          end !== undefined
      );
    } else if (type === "set") {
      return start !== undefined && end !== undefined;
    }
    return false;
  }, [type, link, description, start, end]);

  useEffect(() => {
    console.log("Type:", type);
    console.log("Is Form Valid:", isFormValid);
  }, [type, isFormValid]);

  const handleAddMeeting = async () => {
    if (!userId) {
      console.error("User ID is missing");
      toast.error("Не удалось получить идентификатор пользователя.");
      return;
    }

    const { start, end } = datePickerEventFormData;

    if (!start || !end) {
      console.error("Start or end date is missing");
      toast.error("Пожалуйста, выберите дату начала и окончания.");
      return;
    }

    if (type === "set") {
      const slotData = {
        name: "Свободный слот",
        expertId: userId,
        description: "Выбрать дату",
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      };

      try {
        const response = await createSlot(slotData).unwrap();
        console.log("Slot created successfully:", response);
        toast.success("Свободное время успешно добавлено!");
        handleClose();
      } catch (error) {
        console.error("Failed to create slot:", error);
        toast.error("Не удалось добавить свободное время. Попробуйте ещё раз.");
      }
    } else if (type === "select") {
      if (!selectedReviewer) {
        console.error("Reviewer is missing");
        toast.error("Рецензент не выбран.");
        return;
      }

      if (!link || !description) {
        console.error("Не все поля заполнены");
        toast.error("Пожалуйста, заполните все необходимые поля.");
        return;
      }

      const meetingData = {
        name: link,
        expertId: selectedReviewer.expertId,
        userId,
        description,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      };

      try {
        const response = await bookMeeting(meetingData).unwrap();
        console.log("Meeting booked successfully:", response);
        toast.success("Встреча успешно забронирована!");
        handleClose();
      } catch (error) {
        console.error("Failed to book meeting:", error);
        toast.error("Не удалось забронировать встречу. Попробуйте ещё раз.");
      }
    }
  };

  return (
    <Dialog style={{ padding: "0px 40px", borderRadius: "20px" }} open={open} onClose={onClose}>
      <Box px={5}>
        <DialogTitle>
          {type === "select" ? "Забронируйте встречу" : "Выберите свободное время"}
        </DialogTitle>
        <DialogContent>
          <Box component="form">
            {type === "select" && (
              <>
                <Box mb={1} mt={2}>
                  <TextField
                    name="link"
                    value={link}
                    margin="dense"
                    id="link"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={onChange}
                  />
                </Box>
                <TextField
                  name="description"
                  value={description}
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={onChange}
                />
              </>
            )}

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box mb={3} mt={2}>
                <MobileDateTimePicker
                  label="Дата начала"
                  value={start || null}
                  minutesStep={30}
                  onChange={(newValue) => {
                    setDatePickerEventFormData((prevState) => ({
                      ...prevState,
                      start: newValue ? new Date(newValue) : undefined,
                    }));
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Box>

              <MobileDateTimePicker
                label="Дата окончания"
                minDate={start || undefined}
                minutesStep={30}
                value={end || null}
                onChange={(newValue) => {
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    end: newValue ? new Date(newValue) : undefined,
                  }));
                }}
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
        <Button
          disabled={!isFormValid || isBooking || isCreatingSlot}
          color="success"
          onClick={handleAddMeeting}
        >
          {isBooking || isCreatingSlot ? "Добавление..." : "Добавить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDatePickerEventModal;







