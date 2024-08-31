import { createSlice } from "@reduxjs/toolkit";

type AmountState = {
  amount: {
    id: string;
    nameExpenses: string;
    amountSpent: string;
    image: any;
  }[];
};

const initialState: AmountState = {
  amount: [],
};
const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    addAmount(state, action) {
      state.amount.push({
        id: new Date().toISOString(),
        nameExpenses: action.payload.nameExpenses,
        amountSpent: action.payload.amountSpent,
        image: action.payload.selectedImage,
      });
    },
    addAmountToAccount: (state, action) => {
      const { accountId, additionalAmount } = action.payload;
      const account = state.amount.find(
        (acc) => acc.nameExpenses === accountId
      );

      if (account) {
        const currentAmountSpent = parseFloat(account.amountSpent);
        const additionalAmountFloat = parseFloat(additionalAmount);

        if (!isNaN(currentAmountSpent) && !isNaN(additionalAmountFloat)) {
          const newAmountSpent = (
            currentAmountSpent + additionalAmountFloat
          ).toString();

          account.amountSpent = newAmountSpent;
        }
      }
    },
  },
});

export const { addAmount: addAmount, addAmountToAccount: addAmountToAccount } =
  amountSlice.actions;

export default amountSlice.reducer;
