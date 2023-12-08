import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        error: {
          style: {
            background: "hsl(var(--destructive-foreground))",
            color: "hsl(var(--destructive))",
          },
        },
        success: {
          style: {
            background: "hsl(var(--secondary))",
            color: "hsl(var(--secondary-foreground))",
          },
        },
      }}
    />
  );
};
