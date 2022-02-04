import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartItemNumber: 0,
  cartTotalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const selectedCake = state.cartItems?.filter(
        (cake) => cake.id !== action.payload?.id
      );
      state.cartItems = selectedCake;
      state.cartItems.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(
        `"${
          action.payload?.name?.charAt(0).toUpperCase() +
          action.payload?.name?.slice(1)
        }" added to Cart`
      );
    },
    removeFromCart: (state, action) => {
      const updatedList = state.cartItems?.filter(
        (cake) => cake?.id !== action.payload?.id
      );
      state.cartItems = updatedList;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(
        `Removed "${
          action.payload?.name?.charAt(0).toUpperCase() +
          action.payload?.name?.slice(1)
        }" `
      );
    },
    increaseCartQty: (state, action) => {
      const updatedCart = state.cartItems?.map((cake) => {
        if (cake.id === action.payload?.id) {
          cake.qty += 1;
        }
        return cake;
      });
      state.cartItems = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQty: (state, action) => {
      const updatedCart = state.cartItems?.map((cake) => {
        if (cake.id === action.payload?.id) {
          if (cake.qty > 1) {
            cake.qty -= 1;
          } else {
            cake.qty = 1;
          }
        }
        return cake;
      });
      state.cartItems = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartNumbers: (state) => {
      const cartNumbers = state.cartItems.reduce(
        (accum, current) => {
          accum.totalQty += current.qty;
          accum.totalPrice += current.qty * current.price;
          return accum;
        },
        {
          totalQty: 0,
          totalPrice: 0,
        }
      );
      state.cartItemNumber = cartNumbers.totalQty;
      state.cartTotalCost = cartNumbers.totalPrice;
    },
    emptyCart: (state) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
      state.cartItemNumber = 0;
      state.cartTotalCost = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCartQty,
  decreaseCartQty,
  updateCartNumbers,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
