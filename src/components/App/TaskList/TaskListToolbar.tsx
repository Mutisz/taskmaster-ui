import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { FunctionComponent, useState } from "react";
import TaskEditDialog from "./TaskEditDialog";

interface TaskListToolbarProps {
  loading: boolean;
}

const TaskListToolbar: FunctionComponent<TaskListToolbarProps> = ({
  loading
}) => {
  // Use task dialog open state hook
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState<boolean>(
    false
  );

  const openCreateTaskDialog = (): void => {
    setCreateTaskDialogOpen(true);
  };

  const closeCreateTaskDialog = (): void => {
    setCreateTaskDialogOpen(false);
  };

  return (
    <Toolbar>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={openCreateTaskDialog}
      >
        Create
      </Button>
      <TaskEditDialog
        disabled={loading}
        open={createTaskDialogOpen}
        onClose={closeCreateTaskDialog}
      />
    </Toolbar>
  );
};

export default TaskListToolbar;
