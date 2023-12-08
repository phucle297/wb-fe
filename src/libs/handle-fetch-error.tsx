import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import status from "statuses";
import { ZodError } from "zod";

import { isErrorWithMessageWithCode, isFetchBaseQueryError } from "@/redux/error-handler/error-helpers";

export function handleFetchError(error: FetchBaseQueryError | SerializedError | undefined) {
  if (!error) {
    return;
  }
  // ZOD MESSAGE
  // INVALID DATA TYPE
  if (error instanceof ZodError) {
    console.error(error.issues);
    const temp = error.issues[0];
    throw new Response(temp.message, {
      status: 500,
      statusText: temp.message,
    });
  }

  // CUSTOM FETCH ERROR
  if (isErrorWithMessageWithCode(error)) {
    const errMsg = error.data.message;
    const errStt = error.status;
    throw new Response(errMsg, {
      status: errStt,
      statusText: status(error.status),
    });
  }
  // GENERAL FETCH ERROR
  else if (isFetchBaseQueryError(error)) {
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    const errStt = typeof error.status === "number" ? error.status : 500;

    throw new Response(errMsg, {
      status: errStt,
      statusText: status(errStt),
    });
  }
  // CATCH ALL ERROR
  else {
    const { message } = error;
    console.error({ error });
    throw new Response(message ?? "Internal Error", {
      status: 500,
      statusText: status(500),
    });
  }
}
