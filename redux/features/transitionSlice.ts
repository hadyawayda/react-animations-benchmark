import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AnimationType = "fade" | "slide" | "scale";

interface TransitionState {
  animationCount: number;
  transitionTime: number;
  animationType: AnimationType;
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
    setAnimationType(state, action: PayloadAction<AnimationType>) {
      state.animationType = action.payload;
    },
  },
});

export const { setAnimationCount, setTransitionTime, setAnimationType } =
  transitionSlice.actions;

export default transitionSlice.reducer;
