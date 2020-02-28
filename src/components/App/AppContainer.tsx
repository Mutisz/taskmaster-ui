import {
  createStyles,
  makeStyles,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import NavigationBar from "./Navigation/NavigationBar";
import NavigationDrawer from "./Navigation/NavigationDrawer";

export interface DrawerState {
  open: boolean;
  toggle: () => void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      height: "100vh",
      display: "grid",
      gridTemplateRows: "68px auto",
      gap: 0,
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
        gridTemplateAreas: `
          "bar"
          "main"
        `
      },
      [theme.breakpoints.up("sm")]: {
        transition: theme.transitions.create("grid-template-columns"),
        gridTemplateColumns: (drawerPermanentOpen: boolean): string =>
          drawerPermanentOpen ? "256px auto" : "64px auto",
        gridTemplateAreas: `
          "nav bar"
          "nav main"
        `
      }
    },
    content: {
      gridArea: "main"
    }
  })
);

const getDrawerState = (open: boolean, toggle: () => void): DrawerState => {
  return {
    open,
    toggle
  };
};

const AppContainer = (): ReactElement => {
  // State hooks
  const [drawerPermanentOpen, setDrawerPermanentOpen] = useState<boolean>(
    false
  );
  const [drawerTemporaryOpen, setDrawerTemporaryOpen] = useState<boolean>(
    false
  );

  // Hooks for updating permanent drawer state based on media query
  const theme = useTheme();
  const mediumOrLarger = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    setDrawerPermanentOpen(mediumOrLarger);
  }, [mediumOrLarger]);

  // Material UI styles hook
  const classes = useStyles(drawerPermanentOpen);

  const drawerPermanent = getDrawerState(drawerPermanentOpen, (): void => {
    setDrawerPermanentOpen(!drawerPermanentOpen);
  });

  const drawerTemporary = getDrawerState(drawerTemporaryOpen, (): void => {
    setDrawerTemporaryOpen(!drawerTemporaryOpen);
  });

  return (
    <div className={classes.container}>
      <NavigationBar drawerTemporary={drawerTemporary} />
      <NavigationDrawer
        drawerPermanent={drawerPermanent}
        drawerTemporary={drawerTemporary}
      />
      <main className={classes.content}>
        <AppRouter />
      </main>
    </div>
  );
};

export default AppContainer;
