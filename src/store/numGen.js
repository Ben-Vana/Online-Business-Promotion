import { createSlice } from "@reduxjs/toolkit";

const randomNum = {
  number: 0,
};

const numSlice = createSlice({
  name: "randomNum",
  initialState: randomNum,
  reducers: {
    updateNum(state, action) {
      state.number = action.payload;
    },
  },
});

export const numActions = numSlice.actions;

export default numSlice.reducer;
