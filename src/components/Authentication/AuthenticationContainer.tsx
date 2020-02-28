import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ReactElement } from "react";
import AuthenticationRouter from "./AuthenticationRouter";

const useStyles = makeStyles({
  page: {
    background: "#000"
  },
  container: {
    height: "100vh",
    paddingTop: "10vh",
    backgroundColor: "#fff"
  }
});

const AuthenticationContainer = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Container maxWidth="sm" className={classes.container}>
        <AuthenticationRouter />
      </Container>
    </div>
  );
};

export default AuthenticationContainer;
