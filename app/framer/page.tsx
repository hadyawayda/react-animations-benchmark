"use client";

import React, { useState } from "react";
import CardAnimation from "@/components/CardAnimation/CardAnimation";
import { useAppSelector } from "@/redux/hooks";
import TransitionConfig from "@/components/TransitionConfig/TransitionConfig";

export default function FramerSequencePage() {
  // Read from Redux
  const { animationCount, transitionTime } = useAppSelector(
    (state) => state.transition
  );

  // Current index for the active animation
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track load times for each animation
  const [times, setTimes] = useState<(number | null)[]>(
    Array(animationCount).fill(null)
  );

  // Called when each CardAnimation finishes
  const handleFinish = (rawLoadTime: number, index: number) => {
    // Optionally subtract the transitionTime from the measured load
    // e.g. if you want to exclude the overhead from the measured load
    const adjustedLoadTime = rawLoadTime - transitionTime;
    const finalLoadTime = adjustedLoadTime < 0 ? 0 : adjustedLoadTime;

    setTimes((prev) => {
      const updated = [...prev];
      updated[index] = finalLoadTime;
      return updated;
    });

    // Move on to next animation
    if (index < animationCount - 1) {
      setCurrentIndex(index + 1);
    }
  };

  // Re-compute arrays if the user changes animationCount mid-run
  // (Or you can handle that differently if you like)
  React.useEffect(() => {
    setTimes(Array(animationCount).fill(null));
    setCurrentIndex(0);
  }, [animationCount]);

  // Calculate total/average
  const totalTime = times.reduce((acc, t) => acc + (t ?? 0), 0);
  const finishedCount = times.filter((t) => t !== null).length;
  const averageTime = finishedCount > 0 ? totalTime / finishedCount : 0;

  const handleRestart = () => {
    setTimes(Array(animationCount).fill(null));
    setCurrentIndex(0);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Framer Motion Benchmark</h1>

      {/* Let the user pick animationCount and transitionTime */}
      <TransitionConfig />

      {/* Restart Button */}
      <button
        onClick={handleRestart}
        className="px-8 py-3 bg-amber-400 rounded-2xl mb-4 cursor-pointer font-black text-white text-2xl"
      >
        Restart Animations
      </button>

      {/* Show times so far */}
      <div style={{ marginBottom: "1.5rem" }}>
        {times.map((time, i) =>
          time !== null ? (
            <p key={i}>
              Animation {i + 1} load time: <strong>{time.toFixed(2)} ms</strong>
            </p>
          ) : null
        )}

        {/* If they're all done, show total & average */}
        {times.every((t) => t !== null) && (
          <div>
            <p>
              <strong>Total time:</strong> {totalTime.toFixed(2)} ms
            </p>
            <p>
              <strong>Average time per animation:</strong>{" "}
              {averageTime.toFixed(2)} ms
            </p>
          </div>
        )}
      </div>

      {/* Render the 'active' animation */}
      {Array.from({ length: animationCount }, (_, i) => {
        if (i === currentIndex) {
          return (
            <CardAnimation
              key={i}
              index={i}
              // We'll pass the transitionTime as a prop
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
