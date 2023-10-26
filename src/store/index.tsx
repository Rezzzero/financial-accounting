import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./amountSlice";

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
 next(action);
 localStorage.setItem("reduxState", JSON.stringify(store.getState()));
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
  account: accountReducer,
 },
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(localStorageMiddleware),
 preloadedState,
});

export default store;
