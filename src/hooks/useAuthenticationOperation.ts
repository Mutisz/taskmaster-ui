import { useGetTokenQuery } from "../generator/output/operations";

interface UseAuthenticationOperation {
  token?: string;
  loadingMessage?: string;
  errorMessage?: string;
}

const useAuthenticationOperation = (): UseAuthenticationOperation => {
  const { data, loading, error } = useGetTokenQuery();

  const token = data !== undefined ? data.token : undefined;
  const loadingMessage = loading == true ? "Authenticating..." : undefined;
  const errorMessage =
    error !== undefined
      ? "Error during authentication, try refreshing the page."
      : undefined;

  return { token, loadingMessage, errorMessage };
};

export default useAuthenticationOperation;
