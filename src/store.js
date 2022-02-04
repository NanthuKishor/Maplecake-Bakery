import { configureStore } from "@reduxjs/toolkit";
import cakesReducer from "./features/cakesSlice";
import cakeReducer from "./features/cakeSlice";
import cartReducer from "./features/cartSlice";
import formDataReducer from "./features/formDataSlice";
import ordersReducer from "./features/ordersSlice";
import newProductReducer from "./features/newProductSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    cakes: cakesReducer,
    cake: cakeReducer,
    cart: cartReducer,
    formData: formDataReducer,
    orders: ordersReducer,
    newProduct: newProductReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
