import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    email: "",
    listUserSearch: [],
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.login.email = action.payload.email;
    },
    setListUserSearch: (state, action) => {
      state.listUserSearch = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { userLogin, setListUserSearch } = userSlice.actions;
