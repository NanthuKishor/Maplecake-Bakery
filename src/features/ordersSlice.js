import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "../firebaseConfig";

const initialState = {
  deliveredOrders: [],
  deliveredOrdersCount: 0,
  newOrders: [],
  newOrdersCount: 0,
  status: null,
  error: null,
};

export const ordersFetch = createAsyncThunk(
  "orders/ordersFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "orders"), orderBy("timeStamp"));
      const querySnapshot = await getDocs(q);
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        const id = doc?.id;
        const data = doc?.data();
        return ordersArray.push({ id, ...data });
      });
      return ordersArray;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state) => {
      state.deliveredOrders = [];
      state.newOrders = [];
      state.status = "loading";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      const unDelivered = action.payload.filter((item) => {
        return item.delivered === false;
      });
      const delivered = action.payload.filter((item) => {
        return item.delivered === true;
      });
      state.deliveredOrders = delivered.sort(
        (a, b) =>
          a.delivered_time.toDate().getTime() -
          b.delivered_time.toDate().getTime()
      );
      state.deliveredOrdersCount = delivered.length;
      state.newOrders = unDelivered;
      state.newOrdersCount = unDelivered.length;
      state.status = null;
    },
    [ordersFetch.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = null;
      state.deliveredOrders = [];
      state.newOrders = [];
    },
  },
});

export const { updateDeliveryStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
