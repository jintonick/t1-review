import { configureStore } from "@reduxjs/toolkit";
import { UserApi } from "@app/store/api/auth.api";

export const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});
