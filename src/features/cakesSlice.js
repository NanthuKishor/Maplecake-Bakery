import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const cakesFetch = createAsyncThunk(
  "cakes/cakesFetch",
  async (id = null, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "cakes"), orderBy("timeStamp"));
      const querySnapshot = await getDocs(q);
      const cakeArray = [];
      querySnapshot.forEach((doc) => {
        const id = doc?.id;
        const data = doc?.data();
        return cakeArray.push({ id, ...data });
      });
      return cakeArray;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cakesSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {},
  extraReducers: {
    [cakesFetch.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [cakesFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = null;
    },
    [cakesFetch.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = null;
      state.items = [];
    },
  },
});

export default cakesSlice.reducer;
