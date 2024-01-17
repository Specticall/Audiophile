import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TImage, TProduct } from "../data/data";
import { RootState } from "../store";

export type TCartItem = {
  id: number;
  name: string;
  image: TImage;
  quantity: number;
  price: number;
};

type TProductId = number;

type TinitialState = {
  cart: TCartItem[];
  currentPageProduct: TProduct | null;
  popupMessage: string;
};

const initialState: TinitialState = {
  cart: [],
  currentPageProduct: null,
  popupMessage: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state) {
      if (!state.currentPageProduct)
        throw new Error(
          "Current page's product data (TProduct) does not exist at the time a new item is about to be added to the cart. This is an unintended behavior, please check cartSlice.tsx"
        );

      const newCartItem = {
        id: state.currentPageProduct.id,
        name: state.currentPageProduct.name,
        image: state.currentPageProduct.image,
        quantity: 1,
        price: state.currentPageProduct.price,
      };
      state.cart.push(newCartItem);
      state.popupMessage = "Item Added";
    },
    removeItem(state, action: PayloadAction<TProductId>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.popupMessage = "Item Removed";
    },
    addQuantity(state, action: PayloadAction<TProductId>) {
      const target = state.cart.find((item) => item.id === action.payload);
      if (!target) {
        cartSlice.caseReducers.addItem(state);
        return;
      }

      target.quantity++;
      state.popupMessage = "+1 Item";
    },
    substractQuantity(state, action: PayloadAction<TProductId>) {
      const target = state.cart.find((item) => item.id === action.payload);
      if (!target) return;

      if (target.quantity - 1 == 0) {
        cartSlice.caseReducers.removeItem(state, action);
        return;
      }

      target.quantity--;
      state.popupMessage = "-1 Item";
    },
    clearItem(state) {
      state.cart = [];
      state.popupMessage = "Cart Cleared";
    },
    updateLoadedProductData(state, action) {
      state.currentPageProduct = action.payload;
    },
  },
});

export const getTotalItemQuantityInCart = createSelector(
  [(state: RootState) => state.cart.cart],
  (cart) =>
    cart.reduce((total, item) => {
      return (total += item.quantity);
    }, 0)
);

export const {
  addItem,
  removeItem,
  addQuantity,
  substractQuantity,
  clearItem,
  updateLoadedProductData,
} = cartSlice.actions;

export default cartSlice.reducer;
