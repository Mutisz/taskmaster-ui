import { useApolloClient } from "@apollo/react-hooks";
import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import React, { FunctionComponent, useState } from "react";
import { DrawerState } from "../AppContainer";

interface NavigationBarProps {
  drawerTemporary: DrawerState;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      gridArea: "bar",
      justifyContent: "center"
    },
    menuIconButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    title: {
      flexGrow: 1
    }
  })
);

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  drawerTemporary
}) => {
  const client = useApolloClient();
  const classes = useStyles();
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | undefined>();

  const openAccountMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAccountAnchor(event.currentTarget);
  };

  const closeAccountMenu = (): void => {
    setAccountAnchor(undefined);
  };

  const logout = (): void => {
    closeAccountMenu();
    client.writeData({ data: { token: null } });
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="application navigation drawer toggle"
          className={classes.menuIconButton}
          onClick={drawerTemporary.toggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          Taskmaster
        </Typography>
        <IconButton
          color="inherit"
          aria-label="account menu toggle"
          aria-controls="menu-account"
          aria-haspopup="true"
          onClick={openAccountMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-account"
          keepMounted
          anchorEl={accountAnchor}
          open={Boolean(accountAnchor)}
          onClose={closeAccountMenu}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
