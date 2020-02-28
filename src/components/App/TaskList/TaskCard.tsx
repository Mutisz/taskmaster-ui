import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import clsx from "clsx";
import moment from "moment";
import React, { FunctionComponent } from "react";
import { useTimer } from "react-compound-timer";
import { getTaskCategoryDescription } from "../../../consts/taskCategory";
import {
  GetTaskListQuery,
  TaskIntervalEndMutation,
  TaskIntervalStartMutation,
  useTaskIntervalEndMutation,
  useTaskIntervalStartMutation
} from "../../../generator/output/operations";
import NotificationError from "../../Notification/ErrorNotification";
import humanizeDuration from "humanize-duration";

interface TaskCardProps {
  task: GetTaskListQuery["personalTaskList"][0];
}

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column"
    },
    descriptionToggleButton: {
      transition: theme.transitions.create("transform"),
      transform: "rotate(0deg)",
      marginLeft: "auto"
    },
    descriptionToggleButtonOpen: {
      transform: "rotate(180deg)"
    }
  })
);

const getOptimisticResponseStart = (
  taskId: number
): TaskIntervalStartMutation => {
  return {
    taskIntervalStart: {
      __typename: "Task",
      id: taskId,
      workInProgress: true
    }
  };
};

const getOptimisticResponseEnd = (
  taskId: number,
  elapsedTimeSeconds: number
): TaskIntervalEndMutation => {
  return {
    taskIntervalEnd: {
      __typename: "Task",
      id: taskId,
      workInProgress: false,
      elapsedTime: moment.duration(elapsedTimeSeconds, "seconds").toISOString()
    }
  };
};

const TaskCard: FunctionComponent<TaskCardProps> = ({ task }) => {
  // State hooks
  const [descriptionOpen, setDescriptionOpen] = React.useState(false);

  // Material UI styles hook
  const classes = useStyles();

  // Timer hook
  const elapsedTimeMs = moment.duration(task.elapsedTime).asMilliseconds();
  const { controls: timerControls } = useTimer({
    startImmediately: task.workInProgress,
    lastUnit: "h",
    initialTime: elapsedTimeMs
  });

  // Task interval mutation hooks
  const [start, { error: startError }] = useTaskIntervalStartMutation({
    onError: timerControls.stop
  });
  const [end, { error: endError }] = useTaskIntervalEndMutation({
    onError: timerControls.start
  });
  const error = task.workInProgress ? endError : startError;

  const descriptionToggle = (): void => {
    setDescriptionOpen(!descriptionOpen);
  };

  const startEndToggle = (): void => {
    const variables = { taskId: String(task.id) };
    if (task.workInProgress) {
      timerControls.stop();
      end({
        variables,
        optimisticResponse: getOptimisticResponseEnd(
          task.id,
          timerControls.getTime()
        )
      });
    } else {
      timerControls.start();
      start({
        variables,
        optimisticResponse: getOptimisticResponseStart(task.id)
      });
    }
  };

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          title={task.name}
          subheader={getTaskCategoryDescription(task.category)}
          action={
            <IconButton aria-label="show task actions">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography paragraph>
            {timerControls.getTime() > 0
              ? humanizeDuration(timerControls.getTime(), {
                  units: ["h", "m", "s"],
                  round: true
                })
              : "Not worked on"}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <IconButton aria-label="start task" onClick={startEndToggle}>
            {task.workInProgress ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton
            aria-label="task description"
            aria-expanded={descriptionOpen}
            className={clsx(classes.descriptionToggleButton, {
              [classes.descriptionToggleButtonOpen]: descriptionOpen
            })}
            onClick={descriptionToggle}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse timeout="auto" unmountOnExit in={descriptionOpen}>
          <CardContent>
            <Typography paragraph>{task.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <NotificationError
        error={
          error ? `Error occured while updating ${task.name} task.` : undefined
        }
      />
    </>
  );
};

export default TaskCard;
