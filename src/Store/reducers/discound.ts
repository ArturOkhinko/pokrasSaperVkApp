import { createSlice } from "@reduxjs/toolkit";
type initialStateDiscountReducer = {
  amountOfDiscount: number;
  maxDiscount: boolean;
};
export type discountReducer = {
  discount: { amountOfDiscount: number; maxDiscount: boolean };
};
const initialState: initialStateDiscountReducer = {
  amountOfDiscount: 0,
  maxDiscount: false,
};
const discountReducer = createSlice({
  name: "discountReducer",
  initialState,
  reducers: {
    incrementDiscount: (state, actions) => {
      state.amountOfDiscount =
        state.amountOfDiscount + actions.payload.amountDiscount;
    },
    setMaxDiscountInTrue: (state) => {
      state.maxDiscount = true;
    },
  },
});

export const discount = discountReducer.reducer;
export const { incrementDiscount, setMaxDiscountInTrue } =
  discountReducer.actions;
