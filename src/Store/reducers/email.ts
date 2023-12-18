import { createSlice } from "@reduxjs/toolkit";

type initialStateEmailReducer = {
  email: string | null;
};
export type emailReducer = {
  email: { email: string };
};
const initialState: initialStateEmailReducer = {
  email: null,
};
const emailReducer = createSlice({
  name: "modalPageReducer",
  initialState,
  reducers: {
    saveEmailToLocalStorage: (state, actions) => {
      state.email = actions.payload.email;
    },
  },
});

export const email = emailReducer.reducer;
export const { saveEmailToLocalStorage } = emailReducer.actions;
