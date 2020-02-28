import { Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { GetTaskListQuery } from "../../../generator/output/operations";
import TaskCard from "./TaskCard";

interface TaskListGridProps {
  taskList: GetTaskListQuery["personalTaskList"];
}

interface TaskListGridItemProps {
  task: GetTaskListQuery["personalTaskList"][0];
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: 24
    },
    cell: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

const TaskListGridItem: FunctionComponent<TaskListGridItemProps> = ({
  task
}) => {
  return (
    <Grid item xs={12} sm={task.workInProgress ? 6 : 3}>
      <TaskCard task={task} />
    </Grid>
  );
};

const TaskListGrid: FunctionComponent<TaskListGridProps> = ({ taskList }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {taskList.map(task => (
          <TaskListGridItem key={task.id} task={task} />
        ))}
      </Grid>
    </div>
  );
};

export default TaskListGrid;
