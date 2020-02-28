import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { FunctionComponent, useEffect } from "react";

interface TaskCardProps {
  error?: string;
}

const NotificationError: FunctionComponent<TaskCardProps> = ({ error }) => {
  // State hooks
  const [notificationOpen, setNotificationOpen] = React.useState<boolean>(
    false
  );

  // Effect hook for updating open state based on passed error
  useEffect(() => {
    setNotificationOpen(error !== undefined);
  }, [error]);

  const closeNotification = (): void => {
    setNotificationOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={4000}
      key={error}
      open={notificationOpen}
      onClose={closeNotification}
      message={error}
    >
      <Alert elevation={6} variant="filled" severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};

export default NotificationError;
