import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreFinanceProps } from "../../types/CoreFinanceTypes/CoreFinanceTypes";

interface accountsState {
  list: CoreFinanceProps[];
}

const initialState: accountsState = {
  list: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<CoreFinanceProps>) => {
      state.list.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.title !== action.payload);
    },
    updateAccount: (state, action: PayloadAction<CoreFinanceProps>) => {
      const index = state.list.findIndex(
        (income) => income.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addAccount, removeAccount, updateAccount } =
  accountsSlice.actions;
export default accountsSlice.reducer;
