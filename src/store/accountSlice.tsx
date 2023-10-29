import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
 account: { id: string; nameAccount: string; fund: any; imageBg: any }[];
};

const initialState: AccountState = {
 account: [],
};
const accountSlice = createSlice({
 name: "account",
 initialState,
 reducers: {
  addAccount(state,action) {
    state.account.push({
    id: new Date().toISOString(),
    nameAccount: action.payload.nameAccount,
    fund: action.payload.fund,
    imageBg: action.payload.selectedImage,
   });
  },
 },
});

export const { addAccount: addAccount } = accountSlice.actions;

export default accountSlice.reducer;
