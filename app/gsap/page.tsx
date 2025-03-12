"use client";

import React, { useState, useEffect } from "react";
import TransitionData from "@/components/TransitionData/TransitionData"; // same UI
import { useAppSelector } from "@/redux/hooks";
import GsapAnimation from "@/components/GSAP/GsapAnimation";

export default function GsapSequencePage() {
  const { animationCount, transitionTime } = useAppSelector(
    (state) => state.transition
  );

  const [lastAnimIndex, setLastAnimIndex] = useState(0);
  const [lastLoadTime, setLastLoadTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [finishedCount, setFinishedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    resetAllStates();
  }, [animationCount]);

  function resetAllStates() {
    setLastAnimIndex(0);
    setLastLoadTime(0);
    setTotalTime(0);
    setFinishedCount(0);
    setCurrentIndex(0);
    setIsStarted(false);
  }

  // Called when each GsapAnimation finishes
  const handleFinish = (rawLoadTime: number, index: number) => {
    const adjustedLoadTime = rawLoadTime - transitionTime;
    const finalLoadTime = adjustedLoadTime < 0 ? 0 : adjustedLoadTime;

    setLastAnimIndex(index + 1);
    setLastLoadTime(finalLoadTime);
    setTotalTime((prev) => prev + finalLoadTime);
    setFinishedCount((prev) => prev + 1);

    if (index < animationCount - 1) {
      setCurrentIndex(index + 1);
    } else {
      // Last animation done
      setIsStarted(false);
    }
  };

  const handleStartOrRestart = () => {
    if (!isStarted || finishedCount === animationCount) {
      resetAllStates();
      setIsStarted(true);
    } else {
      resetAllStates();
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>GSAP Benchmark</h1>

      <TransitionData
        lastAnimIndex={lastAnimIndex}
        lastLoadTime={lastLoadTime}
        totalTime={totalTime}
        finishedCount={finishedCount}
        animationCount={animationCount}
        isStarted={isStarted}
        handleStartOrRestart={handleStartOrRestart}
      />

      {isStarted &&
        Array.from({ length: animationCount }, (_, i) => {
          if (i === currentIndex) {
            return (
              <GsapAnimation
                key={i}
                index={i}
                transitionTime={transitionTime}
                onFinish={handleFinish}
              />
            );
          }
          return null;
        })}
    </main>
  );
}
