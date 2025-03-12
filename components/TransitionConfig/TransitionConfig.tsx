"use client";

import React from "react";
import {
  setAnimationCount,
  setTransitionTime,
  setSelectedVariantName,
} from "@/redux/features/transitionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const animationOptions = [
  { label: "Fade", value: "fade" },
  { label: "Slide", value: "slide" },
  { label: "Scale", value: "scale" },
];

export default function TransitionConfig() {
  const dispatch = useAppDispatch();
  const { animationCount, transitionTime, selectedVariantName } =
    useAppSelector((state) => state.transition);

  return (
    <div className="flex justify-center items-center">
      <div className="font-bold w-fit px-4 py-2 rounded-lg flex justify-center gap-4">
        <label>
          Number of Animations:
          <input
            type="number"
            value={animationCount}
            onChange={(e) =>
              dispatch(setAnimationCount(Number(e.target.value)))
            }
            className="w-14 ml-2 border-[1.5px] border-gray-300 rounded-lg px-1"
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
            className="w-14 ml-2 border-[1.5px] border-gray-300 rounded-lg px-1"
          />
        </label>

        <label>
          Animation Type:
          <select
            value={selectedVariantName}
            onChange={(e) => dispatch(setSelectedVariantName(e.target.value))}
            className="ml-2 border-[1.5px] border-gray-300 rounded-lg px-1"
          >
            {animationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
