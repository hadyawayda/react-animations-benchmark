"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface GsapAnimationProps {
  index: number;
  transitionTime: number; // ms
  onFinish: (loadTime: number, index: number) => void;
}

export default function GsapAnimation({
  index,
  transitionTime,
  onFinish,
}: GsapAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Mark the start time
    startTimeRef.current = performance.now();

    if (containerRef.current) {
      // Example: fade + slide + scale
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: -100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: transitionTime / 1000,
          ease: "power2.out",

          // Once the tween is done, measure the time
          onComplete: () => {
            const endTime = performance.now();
            const startTime = startTimeRef.current || endTime;
            const loadTime = endTime - startTime;
            onFinish(loadTime, index);
          },
        }
      );
    }
  }, [index, transitionTime, onFinish]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "#8be9fd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
        borderRadius: "8px",
        color: "#1a1a1a",
        fontWeight: "bold",
        fontSize: "1.2rem",
      }}
    >
      GSAP Card {index + 1}
    </div>
  );
}
