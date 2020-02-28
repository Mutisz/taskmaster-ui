import { TextField } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { FieldError } from "react-hook-form";
import { TaskmasterForm } from "../../types/taskmasterForm";
import ValidationAdornment from "./ValidationAdornment";

interface InputTextFieldProps extends TaskmasterForm.InputProps {
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  loading?: boolean;
  error?: FieldError | undefined;
}

const getErrorMessage = (
  loading: boolean,
  error?: FieldError
): string | undefined => (loading ? undefined : error?.message);

const InputTextField: FunctionComponent<InputTextFieldProps> = ({
  id,
  name,
  label,
  size = "small",
  autoFocus = false,
  autoComplete = undefined,
  inputRef = undefined,
  type = undefined,
  loading = false,
  error = undefined
}) => {
  const errorMessage = getErrorMessage(loading, error);
  return (
    <TextField
      variant="outlined"
      id={id}
      name={name}
      label={label}
      size={size}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      type={type}
      error={errorMessage !== undefined}
      helperText={errorMessage}
      inputRef={inputRef}
      InputProps={{
        endAdornment: (
          <ValidationAdornment loading={loading} error={errorMessage} />
        )
      }}
    />
  );
};

export default InputTextField;
