import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";
import notificationReducer from "./slices/notificationSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    notification: notificationReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
