import { makeStyles, Typography, CircularProgress } from "@material-ui/core";
import React, { ReactElement } from "react";

interface LoadingMaskProps {
  message: string;
}

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
}));

const LoadingMask = ({ message }: LoadingMaskProps): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress />
      <Typography variant="subtitle1">{message}</Typography>
    </div>
  );
};

export default LoadingMask;
