import { useApolloClient } from "@apollo/react-hooks";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React, { ReactElement } from "react";
import { FieldValues, OnSubmit, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../../consts/paths";
import {
  useRegisterMutation,
  UserValidationEmailDocument,
  UserValidationEmailQuery,
  UserValidationEmailQueryVariables,
  UserValidationNicknameDocument,
  UserValidationNicknameQuery,
  UserValidationNicknameQueryVariables
} from "../../../generator/output/operations";
import { useValidationQuery } from "../../../hooks/useValidationHook";
import InputTextField from "../../Form/InputTextField";

interface RegistrationFormFields extends FieldValues {
  nickname: string;
  email: string;
  password: string;
  passwordRepeat: string;
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

const useRegistrationSubmit = (): OnSubmit<RegistrationFormFields> => {
  const apolloClient = useApolloClient();
  const [executeMutation] = useRegisterMutation({
    fetchPolicy: "no-cache"
  });

  return async (formFields: RegistrationFormFields): Promise<void> => {
    const { data } = await executeMutation({
      variables: formFields
    });

    apolloClient.writeData({
      data: { token: data ? data.register.token : null }
    });
  };
};

const RegistrationForm = (): ReactElement => {
  // Material UI hook
  const classes = useStyles();

  // Form hooks
  const onSubmitCallback = useRegistrationSubmit();
  const { handleSubmit, register, watch, errors } = useForm<
    RegistrationFormFields
  >({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  // Custom validation functions
  const validationNickname = useValidationQuery<
    UserValidationNicknameQuery,
    UserValidationNicknameQueryVariables
  >(
    UserValidationNicknameDocument,
    data => {
      return { nickname: String(data) };
    },
    result =>
      result.data.userNicknameExists
        ? "User with this nickname already exists"
        : true
  );

  const validationEmail = useValidationQuery<
    UserValidationEmailQuery,
    UserValidationEmailQueryVariables
  >(
    UserValidationEmailDocument,
    data => {
      return { email: String(data) };
    },
    result =>
      result.data.userEmailExists ? "User with this email already exists" : true
  );

  const passwordValue = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmitCallback)} className={classes.form}>
      <Typography variant="h2">Taskmaster.</Typography>
      <Divider />
      <InputTextField
        id="input-nickname"
        name="nickname"
        label="Nickname"
        loading={validationNickname.loadingState}
        error={errors.nickname}
        inputRef={register({
          required: "Nickname is required",
          minLength: {
            value: 3,
            message: "Nickname must contain at least 3 characters"
          },
          validate: validationNickname.validate
        })}
      />
      <InputTextField
        id="input-email"
        name="email"
        label="Email"
        loading={validationEmail.loadingState}
        error={errors.email}
        inputRef={register({
          required: "Email is required",
          pattern: {
            value: /@/,
            message: "Invalid email address"
          },
          validate: validationEmail.validate
        })}
      />
      <InputTextField
        id="input-password"
        type="password"
        name="password"
        label="Password"
        error={errors.password}
        inputRef={register({
          required: "Password is required"
        })}
      />
      <InputTextField
        id="input-password-repeat"
        type="password"
        name="passwordRepeat"
        label="Repeat password"
        error={errors.passwordRepeat}
        inputRef={register({
          required: "Repeat your password",
          validate: value =>
            value === passwordValue ? true : "Password does not match"
        })}
      />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
      <Button color="primary" component={Link} to={LOGIN_PATH}>
        I already have an account
      </Button>
    </form>
  );
};

export default RegistrationForm;
