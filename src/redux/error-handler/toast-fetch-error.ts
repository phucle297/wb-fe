import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

import { isErrorWithMessageWithCode, isFetchBaseQueryError } from "./error-helpers";

export default function toastFetchError(error: FetchBaseQueryError | SerializedError | undefined) {
  if (!error) {
    return null;
  }

  if (isErrorWithMessageWithCode(error)) {
    toast.error(error.data.message);
  } else if (isFetchBaseQueryError(error)) {
    const errorMessage = "error" in error ? error.error : JSON.stringify(error.data);
    toast.error(errorMessage);
  } else {
    toast.error(JSON.stringify(error));
  }
}
