import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import Tasks from "../../../constants";
import useFormControls from "./useForm";

const inputFieldValues = [
  {
    label: "Task Name",
    id: "name",
    type: "text",
  },
  {
    label: "Task Description",
    id: "description",
    type: "text",
    multiline: true,
    rows: 5,
  },
  {
    label: "Task Deadline",
    id: "deadline",
    type: "date",
  },
];

const FormDialog = ({ onSubmit, formValues, onStatusChange, edit = false }) => {
  // custom hook to handle form activities
  const {
    handleInputValue,
    handleAddAttachments,
    handleRemoveAttachments,
    handleStatusChange,
    handleClearForm,
    formIsValid,
    errors,
    values,
    setValues,
    validate,
  } = useFormControls(formValues, onStatusChange);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // opens the forms dialog and sets intial value
    setOpen(true);
    if (formValues) {
      setValues(formValues);
    }
  };

  const handleClose = () => {
    // closes the form and resets form errors
    setOpen(false);
    handleClearForm();
  };

  const handleSubmit = () => {
    // submits the form to be created or updated
    if (edit) {
      onSubmit(values);
    } else {
      onSubmit({ id: new Date().toISOString(), status: "todo", ...values });
    }
    handleClose();
  };

  return (
    <>
      {/**
       * Displays edit button or create button based on edit prop
       */}
      {edit ? (
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <Edit fontSize="inherit" />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          sx={{ height: (theme) => theme.spacing(4) }}
          data-testid="create-task"
        >
          Create Task
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        {/**
         * Form Header
         */}
        <DialogTitle>{edit ? "Edit" : "Create"} Task Form</DialogTitle>
        <DialogContent>
          {/**
           * Form Description
           */}
          <DialogContentText gutterBottom>
            Please {edit ? "edit" : "add"} the task details
          </DialogContentText>

          {/**
           * Form Select to set or update task status
           */}
          <FormControl>
            <InputLabel id="task-status">Task Status</InputLabel>
            <Select
              labelId="task-status"
              id="status"
              onChange={handleStatusChange}
              value={values.status}
              label="Task Status"
              inputProps={{ "data-testid": "status" }}
            >
              {Object.keys(Tasks).map((key) => (
                <MenuItem key={key} value={key}>
                  {Tasks[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/**
           * Form inputs for name, description and date
           */}
          {inputFieldValues.map((inputFieldValue) => {
            return (
              <TextField
                key={inputFieldValue.id}
                id={inputFieldValue.id}
                value={values[inputFieldValue.id]}
                type={inputFieldValue.type}
                onChange={handleInputValue}
                onBlur={validate}
                label={inputFieldValue.label}
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                margin="dense"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputProps={{ "data-testid": inputFieldValue.id }}
                {...(errors[inputFieldValue.id] && {
                  error: true,
                  helperText: errors[inputFieldValue.id],
                })}
              />
            );
          })}

          {/**
           * Form input to add image attachments
           */}
          <TextField
            id="images"
            type="file"
            onChange={handleAddAttachments}
            label="Add Image Attachments"
            margin="dense"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            inputProps={{ "data-testid": "images" }}
            {...(errors.images && {
              error: true,
              helperText: errors.images,
            })}
          />

          {/**
           * Displays all attached images
           */}
          {!!values.images.length && (
            <ImageList variant="masonry" cols={3} gap={8}>
              {values.images.map((path, key) => (
                <ImageListItem key={key}>
                  <img src={path} alt="attachment" loading="lazy" />
                  <ImageListItemBar
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        onClick={() => handleRemoveAttachments(key)}
                      >
                        {/**
                         * Action to delete attachments
                         */}
                        <Close />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>

        {/**
         * Action to close and create/edit the task dialog
         */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!formIsValid()}
            data-testid="submit"
          >
            {edit ? "Done" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;

FormDialog.propTypes = {
  formValues: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    status: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func,
  onStatusChange: PropTypes.func,
  edit: PropTypes.bool,
};
