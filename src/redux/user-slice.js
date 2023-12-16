import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    email: "",
    // name: "",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.login.email = action.payload.email;
      // state.login.name = action.payload.name;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { userLogin } = userSlice.actions;
