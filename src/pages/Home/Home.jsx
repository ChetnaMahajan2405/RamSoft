import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { FormDialog, TaskCard } from "../common";
import { ListHeader, PageHeader } from "./Home.styles";
import { Sort } from "@mui/icons-material";
import Tasks from "../../constants";

const getInitialState = () => {
  // returns app state from localStorage or sets initial value
  const data = localStorage.getItem("list");
  if (data) return JSON.parse(data);
  return {
    todo: [],
    inprogress: [],
    done: [],
  };
};

const Home = () => {
  const [list, updateList] = useState(getInitialState);

  const createNewTask = (task) => {
    // method to create a new task
    updateList((prevState) => ({
      ...prevState,
      [task.status]: [task, ...prevState[task.status]],
    }));
  };

  const onSubmit = (task) => {
    // method to update an existing task
    updateList((prevState) => {
      const updatedTask = prevState[task.status].map((prevTask) => {
        if (prevTask.id === task.id) {
          return task;
        } else return prevTask;
      });
      return {
        ...prevState,
        [task.status]: updatedTask,
      };
    });
  };

  const onStatusChange = (prevStatus, updatedTask) => {
    // method to change status of the task.
    // It  deletes from the previous list and then updates to new list
    updateList((prevState) => {
      const removedPrevTask = prevState[prevStatus].filter(
        (_) => _.id !== updatedTask.id
      );
      return {
        ...prevState,
        [prevStatus]: removedPrevTask,
        [updatedTask.status]: [updatedTask, ...prevState[updatedTask.status]],
      };
    });
  };

  const onDelete = (task) => {
    // delete the task based on id and task status
    updateList((prevState) => {
      const removedPrevTask = prevState[task.status].filter(
        (_) => _.id !== task.id
      );
      return {
        ...prevState,
        [task.status]: removedPrevTask,
      };
    });
  };

  const sortList = (status) => {
    // sorts each column by task name
    updateList((prevState) => {
      const sortedList = prevState[status].sort((a, b) => {
        if (a.name > b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
      });
      return {
        ...prevState,
        [status]: sortedList,
      };
    });
  };

  useEffect(() => {
    // updates localStorage whenever list is updated
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      {/**
       * Page Header helps to create a task
       */}
      <PageHeader>
        <Typography variant="h2" component="h1">
          Task Board
        </Typography>
        <FormDialog
          onSubmit={createNewTask}
          updateTaskStatus={onStatusChange}
        />
      </PageHeader>

      {/**
       * Responsive Grid to list tasks
       */}
      <Grid container>
        {Object.keys(list).map((key) => (
          <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
            {/**
             * List Header that allows to sort tasks by name
             */}
            <ListHeader>
              <Typography variant="h6" textAlign="center">
                {Tasks[key]}
              </Typography>
              <IconButton size="small" onClick={() => sortList(key)}>
                <Sort fontSize="inherit" />
              </IconButton>
            </ListHeader>

            {/**
             * Task Card list the tasks based on status and allows to delete and edit tasks
             */}
            <TaskCard
              list={list[key]}
              onSubmit={onSubmit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
