"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { motion, Variants, Target } from "framer-motion";
import { allVariants } from "@/Constants/FramerAnimationVariants";

interface CardAnimationProps {
  index: number;
  transitionTime: number; // ms
  variantKey: string; // e.g. 'fade', 'slideLeft', etc.
  onFinish: (loadTime: number, index: number) => void;
}

export default function CardAnimation({
  index,
  transitionTime,
  variantKey,
  onFinish,
}: CardAnimationProps) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  // Grab the base variant or fallback to 'fade'
  const baseVariant = allVariants[variantKey] ?? allVariants["fade"];

  /**
   * Merge dynamic duration into the baseVariant's "visible" and "exit" states,
   * while preserving the rest of their structure. Then cast to "Variants".
   */
  const chosenVariant: Variants = useMemo(() => {
    // Safe merges for the "visible" state
    let mergedVisible: Target | undefined = undefined;
    if (baseVariant.visible) {
      // Copy the entire visible state
      mergedVisible = { ...baseVariant.visible };

      // If there's a transition object, override the duration
      // (Framer allows .transition in a Variant if it's not a function-based variant)
      if ("transition" in mergedVisible && mergedVisible.transition) {
        mergedVisible.transition = {
          ...mergedVisible.transition,
          duration: transitionTime / 1000,
        };
      }
    }

    // Safe merges for the "exit" state, if it exists
    let mergedExit: Target | undefined = undefined;
    if (baseVariant.exit) {
      mergedExit = { ...baseVariant.exit };

      if ("transition" in mergedExit && mergedExit.transition) {
        mergedExit.transition = {
          ...mergedExit.transition,
          duration: transitionTime / 1000,
        };
      }
    }

    // Return a new object with hidden / visible / exit
    return {
      ...baseVariant,
      visible: mergedVisible,
      exit: mergedExit,
    } as Variants;
  }, [baseVariant, transitionTime]);

  return (
    <motion.div
      variants={chosenVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={() => {
        const endTime = performance.now();
        const startTime = startTimeRef.current || endTime;
        const loadTime = endTime - startTime;
        onFinish(loadTime, index);
      }}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "#ff79c6",
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
      Card {index + 1}
    </motion.div>
  );
}
