import { CircularProgress } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorIcon from "@material-ui/icons/ErrorTwoTone";
import React, { FunctionComponent, ReactElement } from "react";

interface ValidationAdornmentProps {
  loading?: boolean;
  error?: string;
}

const ValidationAdornment: FunctionComponent<ValidationAdornmentProps> = ({
  loading = false,
  error = undefined
}): ReactElement | null => {
  let content = null;
  if (loading) {
    content = <CircularProgress size={24} />;
  } else if (error !== undefined) {
    content = <ErrorIcon color="error" titleAccess={error} />;
  }

  return <InputAdornment position="end">{content}</InputAdornment>;
};

export default ValidationAdornment;
