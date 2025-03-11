import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransitionState {
  animationCount: number;
  transitionTime: number;
}

const initialState: TransitionState = {
  animationCount: 10,
  transitionTime: 300,
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
  },
});

export const { setAnimationCount, setTransitionTime } = transitionSlice.actions;
export default transitionSlice.reducer;
