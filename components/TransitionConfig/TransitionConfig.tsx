"use client";

import {
  setAnimationCount,
  setTransitionTime,
} from "@/redux/features/transitionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

export default function TransitionConfig() {
  const dispatch = useAppDispatch();
  const { animationCount, transitionTime } = useAppSelector(
    (state) => state.transition
  );

  return (
    <div className="mb-4 font-bold border w-fit px-4 py-2 rounded-lg flex justify-center">
      <label style={{ marginRight: "1rem" }}>
        Number of Animations:
        <input
          type="number"
          value={animationCount}
          onChange={(e) => dispatch(setAnimationCount(Number(e.target.value)))}
          className="w-14 ml-4 border-[1.5px] border-gray-300 rounded-lg px-1"
        />
      </label>

      <label>
        Transition Time (ms):
        <input
          type="number"
          value={transitionTime}
          onChange={(e) => dispatch(setTransitionTime(Number(e.target.value)))}
          className="w-14 ml-4 border-[1.5px] border-gray-300 rounded-lg px-1"
        />
      </label>
    </div>
  );
}
