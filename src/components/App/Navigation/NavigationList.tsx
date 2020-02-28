import { List } from "@material-ui/core";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import React, { FunctionComponent } from "react";
import { TASK_LIST_PATH } from "../../../consts/paths";
import NavigationListItem from "./NavigationListItem";

const NavigationList: FunctionComponent = () => {
  return (
    <List>
      <NavigationListItem
        icon={<FormatListBulletedIcon />}
        label="Task List"
        to={TASK_LIST_PATH}
      />
    </List>
  );
};

export default NavigationList;
