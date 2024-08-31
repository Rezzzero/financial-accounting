import { combineReducers } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import incomeReducer from "./slices/incomeSlice";
import debtsReducer from "./slices/debtsSlice";
import goalsReducer from "./slices/goalsSlice";
import accountsReducer from "./slices/accountsSlice";

export const rootReducer = combineReducers({
  expenses: expensesReducer,
  income: incomeReducer,
  debts: debtsReducer,
  goals: goalsReducer,
  accounts: accountsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
