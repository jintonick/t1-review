import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@app/store/api/auth.api";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});
