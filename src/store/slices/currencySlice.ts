import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  selectedCurrency: {
    label: string;
    value: string;
    symbol: string;
  };
}

const initialState: CurrencyState = {
  selectedCurrency: {
    label: "Рубли",
    value: "RUB",
    symbol: "₽",
  },
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{ label: string; value: string; symbol: string }>
    ) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
