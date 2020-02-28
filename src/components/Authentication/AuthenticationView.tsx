import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { APP_PATH } from "../../consts/paths";
import { useGetTokenQuery } from "../../generator/output/operations";
import LoadingMask from "../Mask/LoadingMask";
import AuthenticationContainer from "./AuthenticationContainer";

const AuthenticationView: FunctionComponent = () => {
  const { data, loading, error } = useGetTokenQuery();
  if (loading === true) {
    return <LoadingMask message="Authenticating..." />;
  }
  if (error !== undefined) {
    return <div>Error occured, please try refreshing the page.</div>;
  }

  const isAuthenticated = data !== undefined ? Boolean(data.token) : false;
  return isAuthenticated === false ? (
    <AuthenticationContainer />
  ) : (
    <Redirect
      to={{
        pathname: APP_PATH
      }}
    />
  );
};

export default AuthenticationView;
