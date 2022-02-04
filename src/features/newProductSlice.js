import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const initialState = {
  newProduct: [],
  status: null,
  error: null,
};

export const productFetch = createAsyncThunk(
  "newProduct/productFetch",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "cakes", id);
      const docSnap = await getDoc(docRef);
      return { id, ...docSnap.data() };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {},
  extraReducers: {
    [productFetch.pending]: (state) => {
      state.status = "loading";
    },
    [productFetch.fulfilled]: (state, action) => {
      state.newProduct = action.payload;
      state.status = null;
    },
    [productFetch.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = null;
    },
  },
});

export default newProductSlice.reducer;
