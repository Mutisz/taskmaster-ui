import {
  createStyles,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Paper
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { DrawerState } from "../AppContainer";
import NavigationList from "./NavigationList";

interface NavigationDrawerProps {
  drawerPermanent: DrawerState;
  drawerTemporary: DrawerState;
}

const useStyles = makeStyles(theme =>
  createStyles({
    nav: {
      gridArea: "nav"
    },
    drawerPermanent: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    drawerTemporaryPaper: {
      width: 240
    },
    drawerToggleButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      height: 68
    },
    drawerToggleButton: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      transition: theme.transitions.create("transform"),
      transform: "rotate(0deg)"
    },
    drawerToggleButtonOpen: {
      transform: "rotate(180deg)"
    }
  })
);

const NavigationDrawer: FunctionComponent<NavigationDrawerProps> = ({
  drawerPermanent,
  drawerTemporary
}) => {
  // Material UI styles hook
  const classes = useStyles(drawerPermanent.open);

  return (
    <nav aria-label="application navigation drawer" className={classes.nav}>
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          open={drawerTemporary.open}
          onClose={drawerTemporary.toggle}
          ModalProps={{
            keepMounted: true
          }}
          classes={{
            paper: classes.drawerTemporaryPaper
          }}
        >
          <NavigationList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Paper elevation={16} square className={classes.drawerPermanent}>
          <div className={classes.drawerToggleButtonContainer}>
            <IconButton
              aria-label="application navigation drawer toggle"
              aria-expanded={drawerPermanent.open}
              className={clsx(classes.drawerToggleButton, {
                [classes.drawerToggleButtonOpen]: drawerPermanent.open
              })}
              onClick={drawerPermanent.toggle}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <NavigationList />
        </Paper>
      </Hidden>
    </nav>
  );
};

export default NavigationDrawer;
