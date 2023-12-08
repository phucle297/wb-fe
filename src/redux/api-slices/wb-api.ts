// Need to use the React-specific entry point to import createApi
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_SERVER_API,
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const access_token = localStorage["ACCESS_TOKEN"];

      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
    paramsSerializer: queryString.stringify,
  }),
  {
    maxRetries: 1,
  }
);

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.clear();
  }
  return result;
};
// Define a service using a base URL and expected endpoints
export const wbApi = createApi({
  reducerPath: "wbApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
