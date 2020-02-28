import { ApolloProvider } from "@apollo/react-hoc";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { BrowserRouter } from "react-router-dom";
import { createClientWithPersistedCache } from "../client";
import LoadingMask from "./Mask/LoadingMask";
import RootRouter from "./RootRouter";

type ClientState = ApolloClient<NormalizedCacheObject> | null;
type ClientStateDispatch = Dispatch<SetStateAction<ClientState>>;

const setClientWithPersistedCache = async (
  setClient: ClientStateDispatch
): Promise<void> => {
  const client = await createClientWithPersistedCache();
  setClient(client);
};

const Root: FunctionComponent = () => {
  // State hook for Apollo client
  const [client, setClient] = useState<ClientState>(null);

  // Effect hook for loading persisted cache
  useEffect(() => {
    setClientWithPersistedCache(setClient);
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: { main: "#000" },
      secondary: { main: "#666" }
    }
  });

  const content =
    client === null ? (
      <LoadingMask message="Loading cache..." />
    ) : (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
      </ApolloProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{content}</CssBaseline>
    </ThemeProvider>
  );
};

export default Root;
