import { configureStore } from "@reduxjs/toolkit";
import { CreateProductFormDataSlice, currentUserSlice } from "@/store/slices";

export const store = configureStore({
  reducer: {
    [currentUserSlice.name]: currentUserSlice.reducer,
    [CreateProductFormDataSlice.name]: CreateProductFormDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "@/store/slices";
