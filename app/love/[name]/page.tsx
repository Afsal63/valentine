"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const GIF_URL =
  "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif";

export default function LovePage() {
  const params = useParams();
  const name = decodeURIComponent((params?.name as string) || "Love");

  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 140, y: 0 });
  const [noText, setNoText] = useState("NO 💔");
  const [gifLoaded, setGifLoaded] = useState(false);

  // hearts (hydration-safe)
  const [hearts, setHearts] = useState<number[]>([]);
  useEffect(() => {
    setHearts(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  // ✅ PRELOAD GIF ON PAGE LOAD
  useEffect(() => {
    const img = new Image();
    img.src = GIF_URL;
    img.onload = () => setGifLoaded(true);
  }, []);

  const generateSafePosition = () => {
    const SAFE_RADIUS = 120;
    let x = Math.random() * 260 - 130;
    let y = Math.random() * 160 - 80;

    const distance = Math.sqrt(x * x + y * y);
    if (distance < SAFE_RADIUS) {
      const angle = Math.atan2(y, x);
      x = Math.cos(angle) * SAFE_RADIUS;
      y = Math.sin(angle) * SAFE_RADIUS;
    }
    return { x, y };
  };

  const moveNo = () => {
    setNoPos(generateSafePosition());
    const texts = [
      "NO 😜",
      "Nice try 😂",
      "Think again 😏",
      "You can't 😈",
      "Almost 😝",
    ];
    setNoText(texts[Math.floor(Math.random() * texts.length)]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-rose-500 to-purple-700" />

      {/* Floating hearts */}
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{ y: "110vh", x: (i - 4) * 70, opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{ duration: 10, repeat: Infinity, delay: i }}
        >
          💖
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md rounded-3xl p-8 text-center
        bg-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,0,120,0.45)] text-white"
      >
        {!yesClicked ? (
          <>
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl sm:text-4xl font-extrabold mb-4"
            >
              Hey {name} ❤️
            </motion.h1>

            <p className="text-xl mb-8 text-pink-100">
              Will you be my Valentine? 💘
            </p>

            <div className="relative h-32 flex items-center justify-center">
              {/* YES */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setYesClicked(true)}
                className="px-8 py-3 rounded-full font-bold shadow-xl
                bg-gradient-to-r from-pink-500 to-red-500"
              >
                YES 💖
              </motion.button>

              {/* NO */}
              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={moveNo}
                className="absolute px-6 py-3 rounded-full font-bold bg-gray-700"
              >
                {noText}
              </motion.button>
            </div>
          </>
        ) : (
          /* 🎉 YES SCREEN */
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h1 className="text-4xl font-extrabold mb-3">
              I KNEW IT 😍💖
            </h1>

            <p className="text-lg mb-4 text-pink-100">
              {name}, you just made my heart very happy ❤️
            </p>

            {/* GIF (instant, already preloaded) */}
            {gifLoaded && (
              <motion.img
                src={GIF_URL}
                alt="cute love gif"
                className="rounded-2xl mx-auto mb-4 w-full max-w-xs shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              />
            )}

            {!gifLoaded && (
              <div className="w-full max-w-xs mx-auto mb-4 h-48 rounded-2xl bg-white/20 animate-pulse" />
            )}

            <p className="text-pink-200 mb-4">
              This Valentine is officially ours 😘
            </p>

            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            >
              💞
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}