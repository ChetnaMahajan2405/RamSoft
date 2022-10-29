import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const DeleteDialog = ({ onDelete, task }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Action to delete a task and close the dialog box
    onDelete(task);
    handleClose();
  };

  return (
    <>
      {/**
       * A confirmation delete task dialog box
       */}
      <IconButton size="small" onClick={handleClickOpen}>
        <Delete fontSize="inherit" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Are you sure you want to delete the task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;

DeleteDialog.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    status: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  onDelete: PropTypes.func,
};
