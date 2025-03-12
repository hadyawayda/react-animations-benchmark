// animationVariants.ts

import { Variants } from "framer-motion";

/**
 * Each "complex" animation can have multiple states: hidden, visible, exit, etc.
 * We can define advanced transitions, keyframes, 3D transforms, and more.
 */
export const allVariants: Record<string, Variants> = {
  // 1. Simple Fade
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0 },
  },

  // 2. Slide in from Left
  slideLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },

  // 3. Slide in from Right
  slideRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },

  // 4. Scale Up
  scaleUp: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  },

  // 5. Rotate + Fade
  rotateFade: {
    hidden: { rotate: -90, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  },

  // 6. Staggered Keyframes Example
  keyframesDemo: {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: [0.8, 1.2, 1], // keyframes
      opacity: [0, 1, 1],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  },

  // 7. 3D Flip
  flip3D: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  // 8. Complex Multi-step Transitions
  complexChain: {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: [-20, 20, 0], // jump up, then down, then settle
      opacity: [0, 1, 1],
      transition: {
        duration: 1.4,
        times: [0, 0.3, 1],
      },
    },
  },

  // ... and so on, up to 50, 100, or more
};
