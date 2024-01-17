import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NavbarMobile } from "../ui/NavbarMobile";
import { CartModal } from "../ui/CartModal";

type TinitialState = {
  state: "open" | "closed";
  elementName: "NavbarMobile" | "Cart" | "";
};

const initialState: TinitialState = {
  state: "closed",
  elementName: "",
};

const modalSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openModal(state, action) {
      if (state.state === "open") {
        modalSlice.caseReducers.closeModal(state);
        return;
      }
      state.elementName = action.payload;
      state.state = "open";
    },
    closeModal(state) {
      state.state = "closed";
    },
  },
});

export const getModalData = createSelector(
  [(state: RootState) => state],
  (state) => state.modal
);

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

export function getComponentFromString(componentName: string) {
  switch (componentName) {
    case "NavbarMobile":
      return <NavbarMobile />;
    case "Cart":
      return <CartModal />;
    default:
      throw new Error(
        `Component with the name ${componentName} not found! Check the helper.tsx file`
      );
  }
}
