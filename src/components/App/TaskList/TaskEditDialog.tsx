import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DataProxy } from "apollo-cache";
import { FetchResult } from "apollo-link";
import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { taskCategoryOptionList } from "../../../consts/taskCategory";
import {
  GetTaskListDocument,
  GetTaskListQuery,
  GetTaskListQueryResult,
  GetTaskListQueryVariables,
  TaskCategory,
  TaskCreateMutation,
  useTaskCreateMutation
} from "../../../generator/output/operations";
import InputSelect from "../../Form/InputSelect";
import InputTextField from "../../Form/InputTextField";
import NotificationError from "../../Notification/ErrorNotification";

interface TaskEditDialogProps {
  task?: GetTaskListQueryResult;
  open: boolean;
  onClose: () => void;
}

interface TaskEditFormFields {
  name: string;
  description: string;
  category: TaskCategory;
}

const useStyles = makeStyles(theme =>
  createStyles({
    formContent: {
      display: "flex",
      flexDirection: "column",
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2),
        width: 256
      }
    }
  })
);

const getOptimisticResponse = (
  formFields: TaskEditFormFields
): TaskCreateMutation => {
  return {
    __typename: "Mutation",
    taskCreate: {
      __typename: "Task",
      id: 0,
      name: formFields.name,
      description: formFields.description,
      category: formFields.category,
      workInProgress: false,
      elapsedTime: "P0D"
    }
  };
};

const updateCacheOnTaskCreate = (
  proxy: DataProxy,
  result: FetchResult<TaskCreateMutation>
): void => {
  const cachedQuery = proxy.readQuery<
    GetTaskListQuery,
    GetTaskListQueryVariables
  >({
    query: GetTaskListDocument
  });
  if (cachedQuery && result.data) {
    proxy.writeQuery<GetTaskListQuery, GetTaskListQueryVariables>({
      query: GetTaskListDocument,
      data: {
        ...cachedQuery,
        personalTaskList: [
          ...cachedQuery.personalTaskList,
          result.data.taskCreate
        ]
      }
    });
  }
};

const TaskEditDialog: FunctionComponent<TaskEditDialogProps> = ({
  task,
  open,
  onClose
}) => {
  // Material UI hooks
  const theme = useTheme();
  const smOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  // Task edit mutation hook
  const [createTask, { error }] = useTaskCreateMutation();

  // Form hook
  const { handleSubmit, register, errors } = useForm<TaskEditFormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  const newTask = task === undefined;
  const onSubmit = handleSubmit((formFields: TaskEditFormFields): void => {
    createTask({
      variables: formFields,
      optimisticResponse: getOptimisticResponse(formFields),
      update: updateCacheOnTaskCreate
    });

    onClose();
  });

  return (
    <>
      <Dialog
        aria-labelledby="task-edit-dialog-title"
        fullScreen={smOrSmaller}
        open={open}
        onClose={onClose}
      >
        <form onSubmit={onSubmit}>
          <DialogTitle id="task-edit-dialog-title">
            {newTask ? "Create Task" : "Edit Task"}
          </DialogTitle>
          <DialogContent className={classes.formContent} dividers>
            <InputTextField
              id="input-name"
              name="name"
              label="Name"
              autoFocus={true}
              error={errors.name}
              inputRef={register({
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must contain at least 3 characters"
                }
              })}
            />
            <InputTextField
              id="input-description"
              name="description"
              label="Description"
              inputRef={register}
            />
            <InputSelect
              id="input-category"
              name="category"
              label="Category"
              valueList={taskCategoryOptionList}
              defaultValue={TaskCategory.DevelopmentFeature}
              inputRef={register}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <NotificationError
        error={error ? `Error occured while creating new task.` : undefined}
      />
    </>
  );
};

export default TaskEditDialog;
