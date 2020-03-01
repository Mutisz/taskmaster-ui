import { ApolloCache } from "apollo-cache";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { GraphQLError } from "graphql";
import {
  createCache,
  NormalizedCache,
  NormalizedCachePersistentStorage
} from "./cache";
import { TokenDocument, TokenQuery } from "./generator/output/operations";

export type NormalizedCacheClient = ApolloClient<NormalizedCacheObject>;

const logNetworkError = ({ message }: Error): void =>
  console.error(`[Network error]: ${message}`);

const logCacheError = (error: unknown): void =>
  console.error(`[Cache error]: ${error}`);

const logGraphQlError = ({ message, path }: GraphQLError): void =>
  console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);

const fetchToken = (cache: NormalizedCache): string | undefined => {
  const tokenQueryResult = cache.readQuery<TokenQuery>({
    query: TokenDocument
  });

  return tokenQueryResult?.token;
};

const errorHandler = ({ graphQLErrors, networkError }: ErrorResponse): void => {
  if (graphQLErrors) {
    graphQLErrors.map(logGraphQlError);
  }
  if (networkError) {
    logNetworkError(networkError);
  }
};

const createLinkHttp = (): HttpLink =>
  new HttpLink({
    uri: "http://localhost:4000",
    credentials: "same-origin"
  });

const createLinkAuth = (cache: NormalizedCache): ApolloLink =>
  setContext((_, { headers }) => {
    const token = fetchToken(cache);
    return {
      headers:
        token !== undefined
          ? {
              ...headers,
              authorization: `Bearer ${token}`
            }
          : headers
    };
  });

const createLink = (cache: NormalizedCache): ApolloLink =>
  ApolloLink.from([
    onError(errorHandler),
    createLinkAuth(cache),
    createLinkHttp()
  ]);

export const createClient = (
  cache: ApolloCache<NormalizedCacheObject>
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    link: createLink(cache),
    cache
  });

export const createClientWithPersistedCache = async (): Promise<NormalizedCacheClient> => {
  const cache = createCache();
  const storage = window.localStorage as NormalizedCachePersistentStorage;
  try {
    await persistCache({
      cache,
      storage,
      key: "taskmaster-cache-v1"
    });
  } catch (error) {
    logCacheError(error);
  }

  return createClient(cache);
};
