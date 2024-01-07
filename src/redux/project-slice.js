import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProject: [],
  projectCategoryArr: [],
  projectDetail: "",
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setListProject: (state, action) => {
      state.listProject = action.payload;
    },
    setprojectCategoryArr: (state, action) => {
      state.projectCategoryArr = action.payload;
    },
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
});

export const projectReducer =  projectSlice.reducer;

export const { setListProject, setprojectCategoryArr, setProjectDetail } =
  projectSlice.actions;

