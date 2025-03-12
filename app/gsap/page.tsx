"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * This component:
 *  - Renders multiple layers of text
 *  - On page load, runs a GSAP timeline that animates each layer in sequence
 *  - No settings or user triggers; it just auto-plays
 */
export default function ComplexGsapTextAnimation() {
  // Refs for each text layer
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);
  const fancyWordRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a timeline
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.out",
      },
    });

    // 1) Fade + slide line1 from left
    tl.fromTo(line1Ref.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0 });

    // 2) Stagger each character in line2 from top
    //    If each letter is wrapped in a <span>, you could do a .querySelectorAll
    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0 },
      "<0.5" // start 0.5s after the previous anim started
    );

    // 3) Animate a fancy word in the middle
    tl.fromTo(
      fancyWordRef.current,
      { scale: 0.5, rotate: 0, opacity: 0 },
      {
        scale: 1.5,
        rotate: 360,
        opacity: 1,
        duration: 2,
        ease: "elastic.out(1, 0.7)",
      },
      "<0.5"
    );

    // 4) Scale line3 from 0, fade in
    tl.fromTo(
      line3Ref.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1 },
      "<0.5"
    );

    // 5) A little bounce at the end for the entire container
    //    once all text has appeared
    tl.to(containerRef.current, {
      y: -10,
      yoyo: true,
      repeat: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });

    // Return: If you want the timeline to reverse or clear on unmount,
    // you can do so here. For a permanent animation, no need to revert.
    return () => {
      // optional cleanup
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
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
      <div
        ref={line1Ref}
        style={{ fontSize: "1.5rem", marginBottom: "1rem", opacity: 0 }}
      >
        This is the <strong>First</strong> line of text
      </div>

      <div
        ref={line2Ref}
        style={{ fontSize: "1.5rem", marginBottom: "1rem", opacity: 0 }}
      >
        Another <em>Layer</em> of{" "}
        <span style={{ textDecoration: "underline" }}>animated</span> text
      </div>

      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        <span ref={fancyWordRef} style={{ opacity: 0 }}>
          FANCY
        </span>
      </div>

      <div ref={line3Ref} style={{ fontSize: "1.5rem", opacity: 0 }}>
        Finally, the <strong>Last</strong> line appears
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import TransitionData from "@/components/TransitionData/TransitionData"; // same UI
// import { useAppSelector } from "@/redux/hooks";
// import GsapAnimation from "@/components/GSAP/GsapAnimation";

// export default function GsapSequencePage() {
//   const { animationCount, transitionTime } = useAppSelector(
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

//   function resetAllStates() {
//     setLastAnimIndex(0);
//     setLastLoadTime(0);
//     setTotalTime(0);
//     setFinishedCount(0);
//     setCurrentIndex(0);
//     setIsStarted(false);
//   }

//   // Called when each GsapAnimation finishes
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
//       // Last animation done
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
//       <h1>GSAP Benchmark</h1>

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
//               <GsapAnimation
//                 key={i}
//                 index={i}
//                 transitionTime={transitionTime}
//                 onFinish={handleFinish}
//               />
//             );
//           }
//           return null;
//         })}
//     </main>
//   );
// }
