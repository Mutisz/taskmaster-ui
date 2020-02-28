import { makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import TaskListToolbar from "./TaskListToolbar";
import { Divider } from "@material-ui/core";
import { useGetTaskListQuery } from "../../../generator/output/operations";
import LoadingMask from "../../Mask/LoadingMask";
import TaskListGrid from "./TaskListGrid";

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

  const { data, error, loading } = useGetTaskListQuery();

  if (loading === true) {
    return <LoadingMask message="Loading..." />;
  }
  if (error !== undefined) {
    return <div>Error occured, please try refreshing the page.</div>;
  }

  return (
    <div className={classes.panel}>
      <TaskListToolbar />
      <Divider />
      <TaskListGrid taskList={data.personalTaskList} />
    </div>
  );
};

export default TaskListPanel;
