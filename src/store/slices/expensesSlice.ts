import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreFinanceProps } from "../../types/CoreFinanceTypes/CoreFinanceTypes";

interface ExpensesState {
  list: CoreFinanceProps[];
}

const initialState: ExpensesState = {
  list: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<CoreFinanceProps>) => {
      state.list.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.title !== action.payload);
    },
    updateExpense: (state, action: PayloadAction<CoreFinanceProps>) => {
      const index = state.list.findIndex(
        (income) => income.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addExpense, removeExpense, updateExpense } =
  expensesSlice.actions;
export default expensesSlice.reducer;
