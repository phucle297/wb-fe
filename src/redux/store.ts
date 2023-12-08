import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { wbApi } from "./api-slices/wb-api";
import { rtkQueryErrorLogger } from "./error-handler/error-logger";
// REDUCERS
import sidebarCollapseReducer from "./state-slices/sidebar-collapse-slice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [wbApi.reducerPath]: wbApi.reducer,
    // local-state slices
    sidebarCollapse: sidebarCollapseReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wbApi.middleware).concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
