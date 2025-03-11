"use client";

import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";

interface CardAnimationProps {
  index: number;
  onFinish: (loadTime: number, index: number) => void;
  transitionTime: number;
}

export default function CardAnimation({
  index,
  transitionTime,
  onFinish,
}: CardAnimationProps) {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: transitionTime / 1000, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
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
