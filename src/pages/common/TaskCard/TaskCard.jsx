import React from "react";
import PropTypes from "prop-types";
import FormDialog from "../FormDialog";
import DeleteDialog from "../DeleteDialog";
import { Item, Header, Text } from "./Task.styles";

const TaskCard = ({ list, onSubmit, onStatusChange, onDelete }) => (
  <>
    {!!list.length &&
      list.map((task) => {
        return (
          <Item key={task.id} elevation={3}>
            <Header>
              <Text variant="subtitle2">{task.name}</Text>
              {/**
               * Delete task dialog box
               */}
              <DeleteDialog task={task} onDelete={onDelete} />

              {/**
               * Dialog box to create or edit a task
               */}
              <FormDialog
                onSubmit={onSubmit}
                formValues={task}
                onStatusChange={onStatusChange}
                edit
              />
            </Header>
            <Text variant="body2">{task.description}</Text>
          </Item>
        );
      })}
  </>
);

export default TaskCard;

TaskCard.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      deadline: PropTypes.string,
      status: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onSubmit: PropTypes.func,
  onStatusChange: PropTypes.func,
  onDelete: PropTypes.func,
};
