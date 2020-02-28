import { useApolloClient } from "@apollo/react-hooks";
import { ApolloQueryResult } from "apollo-client";
import { DocumentNode } from "graphql";
import { useState } from "react";

export interface UseValidationHook {
  loadingState: boolean;
  validate: (data: unknown) => Promise<boolean | string>;
}

export const useValidation = (
  validationCallback: (data: unknown) => Promise<boolean | string>
): UseValidationHook => {
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const validate = async (data: unknown): Promise<boolean | string> => {
    setLoadingState(true);
    const validationResult = await validationCallback(data);
    setLoadingState(false);

    return validationResult;
  };

  return { loadingState, validate };
};

export const useValidationQuery = <Query, QueryVariables>(
  query: DocumentNode,
  variablesCallback: (data: unknown) => QueryVariables,
  resultCallback: (result: ApolloQueryResult<Query>) => boolean | string
): UseValidationHook => {
  const apolloClient = useApolloClient();
  const validationCallback = async (
    data: unknown
  ): Promise<boolean | string> => {
    const validationResult = await apolloClient.query<Query, QueryVariables>({
      query,
      variables: variablesCallback(data),
      fetchPolicy: "no-cache"
    });

    return resultCallback(validationResult);
  };

  return useValidation(validationCallback);
};
