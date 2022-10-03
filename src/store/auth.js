import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  logIn: false,
  userData: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login(state, action) {
      state.logIn = true;
      state.userData = action.payload;
    },
    logout: (state) => initialAuth,
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
