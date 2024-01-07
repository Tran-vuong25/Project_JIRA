import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user-slice";
import { projectReducer } from "./project-slice";
import { drawerReducer } from "./drawer-slice";

export const store = configureStore({
  reducer: {
    userReducer,
    projectReducer,
    drawerReducer,
  },
});
