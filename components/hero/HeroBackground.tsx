"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[180px]" />

        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[220px]" />

        <div className="absolute bottom-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[170px]" />

      </div>

      {/* Animated Circles */}

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-20 top-40 h-20 w-20 rounded-full border border-blue-500/30"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-40 bottom-40 h-12 w-12 rounded-full border border-cyan-500/30"
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full border border-white/5"
      />
    </>
  );
}