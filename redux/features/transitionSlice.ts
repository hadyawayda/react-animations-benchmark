// app/redux/features/transitionSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransitionState {
  animationCount: number;
  transitionTime: number;
  animationType: string;
}

const initialState: TransitionState = {
  animationCount: 10,
  transitionTime: 300,
  animationType: "fade",
};

export const transitionSlice = createSlice({
  name: "transition",
  initialState,
  reducers: {
    setAnimationCount(state, action: PayloadAction<number>) {
      state.animationCount = action.payload;
    },
    setTransitionTime(state, action: PayloadAction<number>) {
      state.transitionTime = action.payload;
    },
    setAnimationType(state, action: PayloadAction<string>) {
      state.animationType = action.payload;
    },
  },
});

export const { setAnimationCount, setTransitionTime, setAnimationType } =
  transitionSlice.actions;

export default transitionSlice.reducer;
