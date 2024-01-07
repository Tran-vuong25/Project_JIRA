import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  projectValue: null,
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.visible = true;
      state.projectValue = action.payload;
    },
    closeDrawer: (state) => {
      state.visible = false;
    },
  },
});

export const drawerReducer = drawerSlice.reducer;

export const { openDrawer, closeDrawer } = drawerSlice.actions;

