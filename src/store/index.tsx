import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "./amountSlice";
import accountReducer from './accountSlice';

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
 next(action);
 const stateToSave = {
    amount: store.getState().amount,
    account: store.getState().account,
 }
 localStorage.setItem("reduxState", JSON.stringify(stateToSave));
};

const loadStateFromLocalStorage = () => {
 try {
  const serializedState = localStorage.getItem("reduxState");
  if (!serializedState) return;

  return JSON.parse(serializedState);
 } catch (error) {
  console.warn(error);
 }
};

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
 reducer: {
  amount: amountReducer,
  account: accountReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(localStorageMiddleware),
 preloadedState,
});

export default store;
