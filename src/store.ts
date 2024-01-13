import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slice/modalSlice";
import appSlice from "./slice/appSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
