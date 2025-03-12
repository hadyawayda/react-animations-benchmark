// app/redux/features/transitionSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransitionState {
  animationCount: number;
  transitionTime: number;
  selectedVariantName: string; // e.g. 'fade', 'slideLeft', etc.
}

const initialState: TransitionState = {
  animationCount: 10,
  transitionTime: 300,
  selectedVariantName: "fade",
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
    setSelectedVariantName(state, action: PayloadAction<string>) {
      state.selectedVariantName = action.payload;
    },
  },
});

export const { setAnimationCount, setTransitionTime, setSelectedVariantName } =
  transitionSlice.actions;

export default transitionSlice.reducer;
