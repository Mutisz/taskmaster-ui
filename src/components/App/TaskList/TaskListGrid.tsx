import { Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { PersonalTaskListQuery } from "../../../generator/output/operations";
import TaskCard from "./TaskCard";

interface TaskListGridProps {
  taskList: PersonalTaskListQuery["personalTaskList"];
}

interface TaskListGridItemProps {
  task: PersonalTaskListQuery["personalTaskList"][0];
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
    <Grid item xs={12} sm={6} lg={3}>
      <TaskCard task={task} />
    </Grid>
  );
};

const TaskListGrid: FunctionComponent<TaskListGridProps> = ({ taskList }) => {
  // Material UI styles hook
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
