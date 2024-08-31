import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./types";

function saveStateToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("financeState", serializedState);
  } catch (e) {
    console.warn("Не удалось сохранить состояние в localStorage:", e);
  }
}

function loadStateFromLocalStorage(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem("financeState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Не удалось загрузить состояние из localStorage:", e);
    return undefined;
  }
}

const preloadedState = loadStateFromLocalStorage();

export const financeStore = configureStore({
  reducer: rootReducer,
  preloadedState,
});

financeStore.subscribe(() => {
  saveStateToLocalStorage(financeStore.getState() as RootState);
});
