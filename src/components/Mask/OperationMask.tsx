import React, { FunctionComponent } from "react";
import LoadingMask from "./LoadingMask";

interface OperationMaskProps {
  loadingMessage?: string;
  errorMessage?: string;
}

const OperationMask: FunctionComponent<OperationMaskProps> = ({
  children,
  loadingMessage,
  errorMessage
}) => {
  if (loadingMessage !== undefined) {
    return <LoadingMask message={loadingMessage} />;
  }
  if (errorMessage !== undefined) {
    return <div>Error occured, please try refreshing the page.</div>;
  }

  return <>{children}</>;
};

export default OperationMask;
