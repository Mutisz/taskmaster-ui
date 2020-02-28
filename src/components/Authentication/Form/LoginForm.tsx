import { useApolloClient } from "@apollo/react-hooks";
import { Button, Divider, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { FieldValues, OnSubmit, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { REGISTRATION_PATH } from "../../../consts/paths";
import { useLoginMutation } from "../../../generator/output/operations";
import InputTextField from "../../Form/InputTextField";

interface LoginFormFields extends FieldValues {
  email: string;
  password: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      "& .MuiFormControl-root, & .MuiTypography-root, & .MuiDivider-root": {
        marginBottom: theme.spacing(2)
      }
    }
  })
);

const useLoginSubmit = (): OnSubmit<LoginFormFields> => {
  const apolloClient = useApolloClient();
  const [executeMutation] = useLoginMutation({
    fetchPolicy: "no-cache"
  });

  return async (formFields: LoginFormFields): Promise<void> => {
    const { data } = await executeMutation({
      variables: formFields
    });

    apolloClient.writeData({
      data: { token: data ? data.login.token : null }
    });
  };
};

const LoginForm: FunctionComponent = () => {
  // Material UI hooks
  const classes = useStyles();

  // Form hooks
  const onSubmit = useLoginSubmit();
  const { handleSubmit, register, errors } = useForm<LoginFormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Typography variant="h2">Taskmaster.</Typography>
      <Divider />
      <InputTextField
        id="input-email"
        name="email"
        label="Email"
        size="medium"
        error={errors.email}
        inputRef={register({ required: "Email is required" })}
      />
      <InputTextField
        id="input-password"
        name="password"
        type="password"
        label="Password"
        size="medium"
        autoComplete="current-password"
        error={errors.password}
        inputRef={register({ required: "Password is required" })}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
      <Button color="primary" component={Link} to={REGISTRATION_PATH}>
        Register
      </Button>
    </form>
  );
};

export default LoginForm;
