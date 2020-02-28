import {
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React, { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";

interface NavigationListItemProps {
  icon: ReactElement;
  label: string;
  to: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    listItemText: {
      whiteSpace: "nowrap",
      overflowX: "hidden"
    }
  })
);

const NavigationListItem: FunctionComponent<NavigationListItemProps> = ({
  icon,
  label,
  to
}) => {
  const classes = useStyles();

  return (
    <ListItem key={label} button component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} className={classes.listItemText} />
    </ListItem>
  );
};

export default NavigationListItem;
