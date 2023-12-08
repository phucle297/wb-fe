/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
 */

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface CustomError {
  status: number;
  data: {
    code: number;
    message: string;
    data?: string | null;
    timestamp: number;
  };
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}
/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error != null && "message" in error && typeof (error as any).message === "string";
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessageWithCode(error: unknown): error is CustomError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "data" in error &&
    typeof (error as any).data.message === "string" &&
    typeof (error as any).data.code === "number"
  );
}
