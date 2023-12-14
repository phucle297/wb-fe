/**
 * https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
 */

import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

import toastFetchError from "./toast-fetch-error";

/**
 * Log a warning and show a toast!
 */

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.error(action.payload);
    toastFetchError(action.payload as Error);
  }

  return next(action);
};
