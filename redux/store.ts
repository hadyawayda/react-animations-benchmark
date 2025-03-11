import { configureStore } from "@reduxjs/toolkit";
import transitionReducer from "./features/transitionSlice";

export const store = configureStore({
  reducer: {
    transition: transitionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
