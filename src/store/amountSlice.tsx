import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
 account: { id: string; title: string; amount: number; image: any }[];
};

const initialState: AccountState = {
 account: [],
};
const amountSlice = createSlice({
 name: "account",
 initialState,
 reducers: {
  addAmount(state, action) {
   state.account.push({
    id: new Date().toISOString(),
    title: action.payload.title,
    amount: action.payload.amount,
    image: action.payload.selectedImage,
   });
  },
 },
});

export const { addAmount: addAmount } = amountSlice.actions;

export default amountSlice.reducer;
