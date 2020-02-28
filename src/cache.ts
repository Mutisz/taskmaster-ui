import { ApolloCache } from "apollo-cache";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { PersistedData, PersistentStorage } from "apollo-cache-persist/types";
import { defaults } from "./state";

export type NormalizedCache = ApolloCache<NormalizedCacheObject>;

export type NormalizedCachePersistentStorage = PersistentStorage<
  PersistedData<NormalizedCacheObject>
>;

export const createCache = (): NormalizedCache => {
  const cache = new InMemoryCache();
  cache.writeData({ data: defaults });

  return cache;
};
