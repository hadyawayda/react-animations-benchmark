"use client";
import { allVariants } from "@/Constants/FramerAnimationVariants";
import {
  setAnimationCount,
  setAnimationType,
  setTransitionTime,
} from "@/redux/features/transitionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function TransitionConfig() {
  const dispatch = useAppDispatch();
  const { animationCount, transitionTime, animationType } = useAppSelector(
    (state) => state.transition
  );

  const variantKeys = Object.keys(allVariants);

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
            value={animationType}
            onChange={(e) => dispatch(setAnimationType(e.target.value))}
            className="ml-2 border-[1.5px] border-gray-300 rounded-lg px-1"
          >
            {variantKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
