import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const initialState = {
  item: {},
  status: null,
  error: null,
};

export const cakeFetch = createAsyncThunk(
  "cake/cakeFetch",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "cakes", id);
      const docSnap = await getDoc(docRef);
      return { id, ...docSnap.data(), qty: 1 };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    increaseCakeQty: (state, action) => {
      if (state.item.id === action.payload?.id) {
        state.item.qty += 1;
      }
    },
    decreaseCakeQty: (state, action) => {
      if (state.item.qty > 1) {
        state.item.qty -= 1;
      } else {
        state.item.qty = 1;
      }
    },
    clearCakeDetails: (state) => {
      state.item = {};
    },
  },
  extraReducers: {
    [cakeFetch.pending]: (state) => {
      state.status = "Loading";
    },
    [cakeFetch.fulfilled]: (state, action) => {
      state.item = action.payload;
      state.status = null;
    },
    [cakeFetch.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = null;
    },
  },
});

export const { increaseCakeQty, decreaseCakeQty, clearCakeDetails } =
  cakeSlice.actions;
export default cakeSlice.reducer;
