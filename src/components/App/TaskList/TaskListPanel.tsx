import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { usePersonalTaskListQuery } from "../../../generator/output/operations";
import LoadingMask from "../../Mask/LoadingMask";
import TaskListGrid from "./TaskListGrid";
import TaskListToolbar from "./TaskListToolbar";

const useStyles = makeStyles({
  panel: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

const TaskListPanel: FunctionComponent = () => {
  // Material UI hook
  const classes = useStyles();

  // Query hook
  const { data, error, loading } = usePersonalTaskListQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading === true) {
    return <LoadingMask message="Loading..." />;
  }
  if (error !== undefined) {
    return <div>Error occured, please try refreshing the page.</div>;
  }
  if (data === undefined) {
    throw new Error("Data object not returned from query.");
  }

  const taskList = data.personalTaskList;
  taskList.sort((task1, task2) => {
    if (task1.workInProgress && !task2.workInProgress) {
      return -1;
    } else if (!task1.workInProgress && task2.workInProgress) {
      return 1;
    }

    return task1.name.localeCompare(task2.name);
  });

  return (
    <div className={classes.panel}>
      <TaskListToolbar />
      <Divider />
      <TaskListGrid taskList={taskList} />
    </div>
  );
};

export default TaskListPanel;
