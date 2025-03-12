"use client";

import {
  setAnimationCount,
  setTransitionTime,
  setAnimationType,
} from "@/redux/features/transitionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

export default function TransitionConfig() {
  const dispatch = useAppDispatch();
  const { animationCount, transitionTime, animationType } = useAppSelector(
    (state) => state.transition
  );

  return (
    <div className="flex justify-center items-center">
      <div className="font-bold w-fit px-4 py-2 rounded-lg flex justify-center">
        <label style={{ marginRight: "1rem" }}>
          Number of Animations:
          <input
            type="number"
            value={animationCount}
            onChange={(e) =>
              dispatch(setAnimationCount(Number(e.target.value)))
            }
            className="w-14 ml-4 border-[1.5px] border-gray-300 rounded-lg px-1"
          />
        </label>

        <label>
          Transition Time (ms):
          <input
            type="number"
            value={transitionTime}
            onChange={(e) =>
              dispatch(setTransitionTime(Number(e.target.value)))
            }
            className="w-14 ml-4 border-[1.5px] border-gray-300 rounded-lg px-1"
          />
        </label>

        <label className="ml-4">Animation Type:</label>
        <select
          value={animationType}
          onChange={(e) => dispatch(setAnimationType(e.target.value as any))}
          className="w-40 ml-4 border-[1.5px] border-gray-300 rounded-lg px-1"
        >
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
          <option value="scale">Scale</option>
        </select>
      </div>
    </div>
  );
}
