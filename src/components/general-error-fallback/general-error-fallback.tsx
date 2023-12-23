import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { Button } from "../ui/button";
import styles from "./general-error-fallback.module.css";

const getErrorProps = (error: Error) => {
  if (isRouteErrorResponse(error)) {
    const { data, status, statusText } = error;

    return {
      label: status,
      title: statusText,
      message: data?.message ? data.message : data,
    };
  }

  return {
    label: 500,
    title: "Nothing To See Here 😰",
    message: error.message ?? JSON.stringify(error),
  };
};

type ErrorProps = {
  isNotFound?: boolean;
};
export const GeneralErrorElement = ({ isNotFound = false }: ErrorProps) => {
  const error = useRouteError() as Error;

  if (isNotFound) {
    return (
      <div className={styles.wrapper}>
        <h1>
          <span className={styles.statusCode}>404</span>
        </h1>
        <h3 className="text-2xl font-semibold">Page Not Found</h3>
        <p>The page you are looking for does not exist.</p>
        <Button
          className="mt-4 px-10 py-6 text-xl font-bold"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Homepage
        </Button>
      </div>
    );
  }
  const { message, title, label } = getErrorProps(error);

  // VITE BUILD ERROR
  if (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Importing a module script failed")
  ) {
    window.location.reload();
  }

  return (
    <div className={styles.wrapper}>
      <h1>
        <span className={styles.statusCode}>{label}</span>
      </h1>

      <div className="max-w-[500px] space-y-4 rounded-lg border-2 bg-primary/80 p-4 text-center text-xl text-primary-foreground">
        <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
        <p>{message}</p>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant={"secondary"}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Homepage
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload App
          </Button>
        </div>
      </div>
    </div>
  );
};
