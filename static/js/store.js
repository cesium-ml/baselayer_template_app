import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers.js";

export const store = configureStore({
  reducer: rootReducer,
});
