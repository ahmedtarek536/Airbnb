import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginToken(state, action) {
      console.log(action.payload);
      state.token = JSON.stringify(action.payload);
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },

    logoutToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginToken, logoutToken } = userSlice.actions;
export default userSlice.reducer;
