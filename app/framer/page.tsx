"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/**
 * This component:
 *  - Uses a parent container with "hidden" and "show" states
 *  - Staggers multiple child lines of text
 *  - Includes keyframes for scale, rotate, etc.
 *  - Bounces the entire container at the end
 *  - Auto-plays as soon as it's rendered
 */
export default function ComplexFramerTextAnimation() {
  // Parent container variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 1, // We keep container visible so we can see the child lines animate
    },
    show: {
      // no direct animation on the container except the bounce at the end
      transition: {
        // This triggers child lines in a staggered fashion
        staggerChildren: 0.3,
      },
    },
    bounce: {
      // A small bounce for the entire container after all children are shown
      y: [0, -10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  // Each line's default fade+slide+some transform
  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // A "fancy" variant using keyframes for scale + rotation
  const fancyWordVariants: Variants = {
    hidden: { scale: 0.5, rotate: 0, opacity: 0 },
    show: {
      scale: [0.5, 1.2, 1],
      rotate: [0, 360, 720],
      opacity: 1,
      transition: {
        duration: 1.6,
        times: [0, 0.4, 1],
        ease: "easeOut",
      },
    },
  };

  // Another line with a scale bounce
  const lastLineVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };

  // We'll manually trigger the final bounce once all lines are shown
  // by toggling a local state that sets the container to "bounce"
  const [animationState, setAnimationState] = React.useState<
    "hidden" | "show" | "bounce"
  >("hidden");

  useEffect(() => {
    // Start the container in "show" state once mounted
    // to trigger the child animations
    setAnimationState("show");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#282a36",
        color: "#f8f8f2",
        padding: "2rem",
        borderRadius: "8px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <AnimatePresence>
        <motion.div
          // The container
          variants={containerVariants}
          initial="hidden"
          animate={animationState}
          onAnimationComplete={(definition) => {
            // If we've just completed the "show" state, trigger "bounce"
            if (definition === "show") {
              setAnimationState("bounce");
            }
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Line 1 */}
          <motion.div variants={lineVariants} style={{ fontSize: "1.5rem" }}>
            This is the <strong>First</strong> line of text
          </motion.div>

          {/* Line 2 */}
          <motion.div variants={lineVariants} style={{ fontSize: "1.5rem" }}>
            Another <em>Layer</em> of{" "}
            <span style={{ textDecoration: "underline" }}>animated</span> text
          </motion.div>

          {/* Fancy Word */}
          <motion.div variants={fancyWordVariants} style={{ fontSize: "2rem" }}>
            FANCY
          </motion.div>

          {/* Last Line */}
          <motion.div
            variants={lastLineVariants}
            style={{ fontSize: "1.5rem" }}
          >
            Finally, the <strong>Last</strong> line appears
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import CardAnimation from "@/components/CardAnimation/CardAnimation";
// import { useAppSelector } from "@/redux/hooks";
// import TransitionData from "@/components/TransitionData/TransitionData";

// export default function FramerSequencePage() {
//   const { animationCount, transitionTime, animationType } = useAppSelector(
//     (state) => state.transition
//   );

//   const [lastAnimIndex, setLastAnimIndex] = useState(0);
//   const [lastLoadTime, setLastLoadTime] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [finishedCount, setFinishedCount] = useState(0);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [isStarted, setIsStarted] = useState(false);

//   useEffect(() => {
//     resetAllStates();
//   }, [animationCount]);

//   const resetAllStates = () => {
//     setLastAnimIndex(0);
//     setLastLoadTime(0);
//     setTotalTime(0);
//     setFinishedCount(0);
//     setCurrentIndex(0);
//     setIsStarted(false);
//   };

//   const handleFinish = (rawLoadTime: number, index: number) => {
//     const adjustedLoadTime = rawLoadTime - transitionTime;
//     const finalLoadTime = adjustedLoadTime < 0 ? 0 : adjustedLoadTime;

//     setLastAnimIndex(index + 1);
//     setLastLoadTime(finalLoadTime);
//     setTotalTime((prev) => prev + finalLoadTime);
//     setFinishedCount((prev) => prev + 1);

//     if (index < animationCount - 1) {
//       setCurrentIndex(index + 1);
//     } else {
//       setIsStarted(false);
//     }
//   };

//   const handleStartOrRestart = () => {
//     if (!isStarted || finishedCount === animationCount) {
//       resetAllStates();
//       setIsStarted(true);
//     } else {
//       resetAllStates();
//     }
//   };

//   return (
//     <main style={{ padding: "2rem" }}>
//       <TransitionData
//         lastAnimIndex={lastAnimIndex}
//         lastLoadTime={lastLoadTime}
//         totalTime={totalTime}
//         finishedCount={finishedCount}
//         animationCount={animationCount}
//         isStarted={isStarted}
//         handleStartOrRestart={handleStartOrRestart}
//       />

//       {isStarted &&
//         Array.from({ length: animationCount }, (_, i) => {
//           if (i === currentIndex) {
//             return (
//               <CardAnimation
//                 key={i}
//                 index={i}
//                 transitionTime={transitionTime}
//                 variantKey={animationType}
//                 onFinish={handleFinish}
//               />
//             );
//           }
//           return null;
//         })}
//     </main>
//   );
// }
