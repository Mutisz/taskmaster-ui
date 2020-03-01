import { Card, Grid } from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import React, { FunctionComponent, ReactElement } from "react";
import ContentLoader from "react-content-loader";
import { PersonalTaskListQuery } from "../../../generator/output/operations";
import TaskCard from "./TaskCard";

interface TaskListGridProps {
  loading: boolean;
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

const getGridItemPlaceholderList = (): ReactElement[] => {
  const placeholderList: ReactElement[] = [];
  for (let index = 0; index < 4; index++) {
    placeholderList.push(<TaskListGridItemPlaceHolder key={index} />);
  }

  return placeholderList;
};

const TaskListGridItemPlaceHolder: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card variant="outlined">
        <ContentLoader
          speed={2}
          viewBox="0 0 200 100"
          backgroundColor={theme.palette.primary.main}
          foregroundColor={theme.palette.secondary.main}
        >
          <rect x="10" y="10" rx="3" ry="3" width="100" height="10" />
          <rect x="10" y="25" rx="3" ry="3" width="100" height="5" />
          <rect x="10" y="50" rx="3" ry="3" width="100" height="5" />
          <circle cx="20" cy="85" r="10" />
        </ContentLoader>
      </Card>
    </Grid>
  );
};

const getGridItemList = (
  taskList: PersonalTaskListQuery["personalTaskList"]
): Array<ReactElement> =>
  taskList.map(task => <TaskListGridItem key={task.id} task={task} />);

const TaskListGridItem: FunctionComponent<TaskListGridItemProps> = ({
  task
}) => {
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <TaskCard task={task} />
    </Grid>
  );
};

const TaskListGrid: FunctionComponent<TaskListGridProps> = ({
  loading,
  taskList
}) => {
  // Material UI styles hook
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {loading ? getGridItemPlaceholderList() : getGridItemList(taskList)}
      </Grid>
    </div>
  );
};

export default TaskListGrid;
