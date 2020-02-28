import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LOGIN_PATH, REGISTRATION_PATH } from "../../consts/paths";
import LoginForm from "./Form/LoginForm";
import RegistrationForm from "./Form/RegistrationForm";

const AuthenticationRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path={LOGIN_PATH}>
        <LoginForm />
      </Route>
      <Route path={REGISTRATION_PATH}>
        <RegistrationForm />
      </Route>
      <Route path="*">
        <Redirect to={LOGIN_PATH} />
      </Route>
    </Switch>
  );
};

export default AuthenticationRouter;
