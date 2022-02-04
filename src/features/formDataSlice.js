import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const initialState = {
  formData: localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData"))
    : {},
  orderData: localStorage.getItem("orderData")
    ? JSON.parse(localStorage.getItem("orderData"))
    : {},
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      const formData = {
        customer_details: {
          name: action.payload?.fullName,
          email: action.payload?.email,
          phone: `${action.payload?.dialerCode}-${action.payload?.phone}`,
          address: `${action.payload?.street}, ${action.payload?.city}, ${action.payload?.state}, ${action.payload?.country}, ${action.payload?.zipCode}`,
        },
        items_ordered: action.payload.purchased_items,
        delivered: action.payload.delivered,
        delivery_mode: action.payload?.deliveryMode,
      };
      state.formData = formData;
      localStorage.setItem("formData", JSON.stringify(state.formData));
    },
    addFormDataToDB: (state, action) => {
      const formData = state.formData;
      const orderData = {
        ...formData,
        payment_details: {
          payment_status: action.payload.status,
          payment_id: action.payload.paymentId,
          payment_amount: action.payload.amount / 100,
          canceled_at: action.payload.canceledAt,
          currency: action.payload.currency,
        },
      };
      state.orderData = orderData;
      localStorage.setItem("orderData", JSON.stringify(state.orderData));
      setDoc(
        doc(db, "orders", action.payload.paymentId),
        {
          ...(orderData || state.orderData),
          timeStamp: Timestamp.now(),
        },
        { merge: true }
      );
      localStorage.removeItem("formData");
      state.formData = {};
      localStorage.removeItem("orderData");
      state.orderData = {};
    },
  },
});

export const { saveFormData, addFormDataToDB } = formDataSlice.actions;
export default formDataSlice.reducer;
