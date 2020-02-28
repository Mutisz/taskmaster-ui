import React, { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { TASK_LIST_PATH } from "../../consts/paths";
import TaskListPanel from "./TaskList/TaskListPanel";

const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path={TASK_LIST_PATH}>
        <TaskListPanel />
      </Route>
      <Route path="*">
        <Redirect to={TASK_LIST_PATH} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
