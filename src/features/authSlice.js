import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.admin = action.payload;
    },
    removeAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { addAdmin, removeAdmin } = authSlice.actions;
export default authSlice.reducer;
