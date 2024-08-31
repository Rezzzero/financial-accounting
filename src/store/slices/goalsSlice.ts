import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TargetProps } from "../../types/TargetTypes/TargetTypes";

interface GoalsState {
  list: TargetProps[];
}

const initialState: GoalsState = {
  list: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<TargetProps>) => {
      state.list.push(action.payload);
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.name !== action.payload);
    },
    updateGoal: (state, action: PayloadAction<TargetProps>) => {
      const index = state.list.findIndex(
        (goal) => goal.name === action.payload.name
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addGoal, removeGoal, updateGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
