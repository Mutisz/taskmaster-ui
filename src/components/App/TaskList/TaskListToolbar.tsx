import { Button, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { FunctionComponent, useState } from "react";
import TaskEditDialog from "./TaskEditDialog";

const TaskListToolbar: FunctionComponent = () => {
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
        open={createTaskDialogOpen}
        onClose={closeCreateTaskDialog}
      />
    </Toolbar>
  );
};

export default TaskListToolbar;
