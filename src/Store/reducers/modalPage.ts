import { createSlice } from "@reduxjs/toolkit";
type initialStateModalPageReducer = {
  page: string | null;
};
export type modalPageReducer = {
  modalPage: { page: string };
};
const initialState: initialStateModalPageReducer = {
  page: null,
};
const modalPageReducer = createSlice({
  name: "modalPageReducer",
  initialState,
  reducers: {
    openPage: (state, actions) => {
      state.page = actions.payload.page;
    },
  },
});

export const modalPage = modalPageReducer.reducer;
export const { openPage } = modalPageReducer.actions;
