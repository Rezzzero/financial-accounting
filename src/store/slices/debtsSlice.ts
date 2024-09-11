import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebtProps } from "../../types/DebtTypes/DebtTypes";

interface DebtsState {
  list: DebtProps[];
}

const initialState: DebtsState = {
  list: [],
};

const debtsSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    addDebt: (state, action: PayloadAction<DebtProps>) => {
      state.list.push(action.payload);
    },
    removeDebt: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.title !== action.payload);
    },
    updateDebt: (state, action: PayloadAction<DebtProps>) => {
      const index = state.list.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addDebt, removeDebt, updateDebt } = debtsSlice.actions;
export default debtsSlice.reducer;
