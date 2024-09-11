import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreFinanceProps } from "../../types/CoreFinanceTypes/CoreFinanceTypes";

interface IncomeState {
  list: CoreFinanceProps[];
}

const initialState: IncomeState = {
  list: [],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<CoreFinanceProps>) => {
      state.list.push(action.payload);
    },
    removeIncome: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.title !== action.payload);
    },
    updateIncome: (state, action: PayloadAction<CoreFinanceProps>) => {
      const index = state.list.findIndex(
        (income) => income.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addIncome, removeIncome, updateIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
