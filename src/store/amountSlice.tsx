import { createSlice } from "@reduxjs/toolkit";

type AmountState = {
 amount: { id: string; nameExpenses: string; amountSpent: number; image: any }[];
};

const initialState: AmountState = {
 amount: [],
};
const amountSlice = createSlice({
 name: "amount",
 initialState,
 reducers: {
  addAmount(state, action) {
   state.amount.push({
    id: new Date().toISOString(),
    nameExpenses: action.payload.nameExpenses,
    amountSpent: action.payload.amountSpent,
    image: action.payload.selectedImage,
   });
  },
 },
});

export const { addAmount: addAmount} = amountSlice.actions;

export default amountSlice.reducer;
