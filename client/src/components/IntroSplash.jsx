// src/components/IntroSplash.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";

const IntroSplash = ({ onComplete }) => {
  const el = useRef(null);
  const [startZoom, setStartZoom] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["SkillHub"],
      typeSpeed: 120,
      showCursor: false,
      onComplete: () => {
        setTimeout(() => setHideText(true), 800);
        setTimeout(() => setStartZoom(true), 1200);
        setTimeout(() => setFadeOut(true), 2000);
        setTimeout(() => onComplete(), 2600);
      },
    });

    return () => typed.destroy();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0c0c0c",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Animated Expanding Glow */}
          <motion.div
            initial={{
              scale: 1,
              borderRadius: "50%",
              width: 200,
              height: 200,
              background: "radial-gradient(circle, #38bdf8 0%, #0c0c0c 80%)",
              boxShadow: "0 0 80px #38bdf8aa",
              position: "absolute",
              filter: "blur(2px)",
            }}
            animate={
              startZoom
                ? {
                    scale: 18,
                    borderRadius: "0%",
                    opacity: 0,
                  }
                : {}
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Center Text */}
          <motion.span
            ref={el}
            initial={{ opacity: 1 }}
            animate={{ opacity: hideText ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            style={{
              color: "#ffffff",
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "Kanit, sans-serif",
              zIndex: 2,
              background: "transparent",
              padding: "0.8rem 2rem",
              borderRadius: "1rem",
              // backdropFilter: "blur(6px)",
              // border: "1px solid #38bdf880",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSplash;
