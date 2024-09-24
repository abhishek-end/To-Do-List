import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});
export const { loginAction, logoutAction } = loginSlice.actions;
export default loginSlice.reducer;
