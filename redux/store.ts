import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseAPI";
import userSlice from "./feature/auth/userSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    currentUser: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
