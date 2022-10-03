import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import numReducer from "./numGen";

const store = configureStore({
  reducer: {
    auth: authReducer,
    randomNum: numReducer,
  },
});

export default store;
