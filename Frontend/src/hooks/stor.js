import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
  },
});

export default store;
