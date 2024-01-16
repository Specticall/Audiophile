import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slice/modalSlice";
import appSlice from "./slice/appSlice";
import cartSlice from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    app: appSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
