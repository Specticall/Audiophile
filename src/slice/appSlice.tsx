import { createSelector, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TinitialState = {
  status: "loading" | "idle";
  initialRenderCompleted: boolean;
  initialLoaderCompleted: boolean;
  invalidRoute: boolean;
};

const initialState: TinitialState = {
  status: "idle",
  // This will flag whenever react router's first data load has finished (We use this instead of the fallback element because we want to use framer motion animations)
  initialRenderCompleted: false,
  // This will flag whether the loader animation for the load has been completed or not.
  initialLoaderCompleted: false,
  // Will flag whenever a page is not found.
  invalidRoute: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateState(state, action: PayloadAction<TinitialState["status"]>) {
      state.status = action.payload;
    },
    initialRenderIsCompleted(state) {
      state.initialRenderCompleted = true;
    },
    initialLoaderIsCompleted(state) {
      state.initialLoaderCompleted = true;
    },
    setRouteStateTo(state, action: PayloadAction<"valid" | "invalid">) {
      state.invalidRoute = action.payload === "invalid" ? true : false;
    },
  },
});

export const getItemQuantityInCart = createSelector(
  [(state: RootState) => state.cart.cart, (_, id) => id],
  (cart, id) => cart.find((item) => item.id === id)?.quantity
);

export const {
  updateState,
  initialRenderIsCompleted,
  initialLoaderIsCompleted,
  setRouteStateTo,
} = appSlice.actions;
export default appSlice.reducer;
