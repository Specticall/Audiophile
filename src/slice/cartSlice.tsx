import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TImage, TProduct } from "../data/data";

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
};

const initialState: TinitialState = {
  cart: [],
  currentPageProduct: null,
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
    },
    removeItem(state, action: PayloadAction<TProductId>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    addQuantity(state, action: PayloadAction<TProductId>) {
      const target = state.cart.find((item) => item.id === action.payload);
      if (!target) {
        cartSlice.caseReducers.addItem(state);
        return;
      }

      target.quantity++;
    },
    substractQuantity(state, action: PayloadAction<TProductId>) {
      const target = state.cart.find((item) => item.id === action.payload);
      if (!target) return;

      if (target.quantity - 1 == 0) {
        cartSlice.caseReducers.removeItem(state, action);
        return;
      }

      target.quantity--;
    },
    clearItem(state) {
      state.cart = [];
    },
    updateLoadedProductData(state, action) {
      state.currentPageProduct = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  addQuantity,
  substractQuantity,
  clearItem,
  updateLoadedProductData,
} = cartSlice.actions;

export default cartSlice.reducer;
