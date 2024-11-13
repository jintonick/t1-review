import { SetStateAction, MouseEvent, Dispatch } from "react";
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography } from "@mui/material";
import { IEventInfo } from "./types";

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void
  currentEvent: IEventInfo | null
}

const EventInfoModal = ({ open, handleClose, onDeleteEvent, currentEvent }: IProps) => {
  const onClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Информация о встрече</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h1>Описание:</h1>
          <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
            {currentEvent?.description}
          </Typography>
        </DialogContentText>
        <Box component="form"></Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Закрыть
        </Button>
        <Button color="info" onClick={onDeleteEvent}>
          Удалить встречу
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventInfoModal;