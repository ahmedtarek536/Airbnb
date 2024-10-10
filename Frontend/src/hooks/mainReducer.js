import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = mainSlice.actions;
export default mainSlice.reducer;
