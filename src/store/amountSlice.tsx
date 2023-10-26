import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 account: {} as { id: string; title: string; amount: number; image: any }[],
};

const amountSlice = createSlice({
 name: "account",
 initialState,
 reducers: {
  addAccount(state, action) {
   state.account.push({
    id: new Date().toISOString(),
    title: action.payload.title,
    amount: action.payload.amount,
    image: action.payload.selectedImage,
   });
  },
 },
});

export const { addAccount: addAccount } = amountSlice.actions;

export default amountSlice.reducer;
