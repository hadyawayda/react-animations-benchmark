"use client";

import React from "react";
import TransitionConfig from "../TransitionConfig/TransitionConfig";

interface TransitionDataProps {
  lastAnimIndex: number;
  lastLoadTime: number;
  totalTime: number;
  finishedCount: number;
  animationCount: number;
  isStarted: boolean;
  handleStartOrRestart: () => void;
}

const TransitionData: React.FC<TransitionDataProps> = ({
  lastAnimIndex,
  lastLoadTime,
  totalTime,
  finishedCount,
  animationCount,
  isStarted,
  handleStartOrRestart,
}) => {
  const averageTime = finishedCount === 0 ? 0 : totalTime / finishedCount;

  const allDone = finishedCount === animationCount && animationCount > 0;
  const buttonLabel =
    !isStarted || allDone ? "Start Animations" : "Restart Animations";
  const buttonColor = !isStarted || allDone ? "bg-green-500" : "bg-amber-400";

  return (
    <div className="flex justify-center items-center gap-16 w-full whitespace-nowrap pr-60">
      <TransitionConfig />

      <button
        onClick={handleStartOrRestart}
        className={`px-6 py-1.5 ${buttonColor} rounded-xl cursor-pointer font-black text-white text-xl whitespace-nowrap`}
      >
        {buttonLabel}
      </button>

      <div className="w-72">
        <p>
          Animation {lastAnimIndex} load time:{" "}
          <strong>{lastLoadTime.toFixed(2)} ms</strong>
        </p>
        <p>
          Total time: <strong>{totalTime.toFixed(2)} ms</strong>
        </p>
        <p>
          Average time per animation:{" "}
          <strong>{averageTime.toFixed(2)} ms</strong>
        </p>
      </div>
    </div>
  );
};

export default TransitionData;
