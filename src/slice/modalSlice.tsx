import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NavbarMobile } from "../ui/NavbarMobile";

type TinitialState = {
  state: "open" | "closed";
  elementName: "NavbarMobile" | "";
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
    default:
      throw new Error(
        `Component with the name ${componentName} not found! Check the helper.tsx file`
      );
  }
}
