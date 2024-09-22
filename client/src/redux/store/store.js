import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Slice/createSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
