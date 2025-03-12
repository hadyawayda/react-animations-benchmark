"use client";

import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";

type AnimationType = "fade" | "slide" | "scale";

interface CardAnimationProps {
  index: number;
  transitionTime: number; // in ms
  onFinish: (loadTime: number, index: number) => void;
  animationType: AnimationType;
}

export default function CardAnimation({
  index,
  transitionTime,
  onFinish,
  animationType,
}: CardAnimationProps) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: transitionTime / 1000, ease: "easeOut" },
      },
    },
    slide: {
      hidden: { opacity: 0, x: -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: transitionTime / 1000, ease: "easeOut" },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: transitionTime / 1000, ease: "easeOut" },
      },
    },
  };

  const chosenVariant = variants[animationType] ?? variants.fade;

  return (
    <motion.div
      variants={chosenVariant}
      initial="hidden"
      animate="visible"
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
