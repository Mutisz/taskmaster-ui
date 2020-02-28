import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { APP_PATH, AUTHENTICATION_PATH } from "../consts/paths";
import AppView from "./App/AppView";
import AuthenticationView from "./Authentication/AuthenticationView";

const RootRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path={AUTHENTICATION_PATH}>
        <AuthenticationView />
      </Route>
      <Route path={APP_PATH}>
        <AppView />
      </Route>
      <Route path="*">
        <Redirect to={APP_PATH} />
      </Route>
    </Switch>
  );
};

export default RootRouter;
