import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "@/store/slices";

export const store = configureStore({
  reducer: {
    [currentUserSlice.name]: currentUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "@/store/slices";
