import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const [page, setPage] = useState(0);

  const pages = [
    // HERO PAGE
    {
      id: 0,
      content: (
        <section className="flex flex-col items-center justify-center text-center px-8 md:px-16 h-[70vh]">
          <motion.div
            key="hero-text"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            exit={{ opacity: 0, y: -40 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-5xl font-bold leading-tight text-blue-700 mb-6">
              Bridging Communication with{" "}
              <span className="text-blue-500">AI</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              SignSpeak is an AI-powered app that translates sign language into
              spoken and written words — helping everyone communicate freely.
            </p>
            <div className="flex justify-center gap-4">
              <Button color="primary" radius="lg" size="lg">
                Try Demo
              </Button>
              <Button radius="lg" size="lg" variant="bordered">
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>
      ),
    },

    // FEATURE 1 — SIGN-TO-TEXT
    {
      id: 1,
      content: (
        <section className="flex flex-col items-center justify-center text-center px-8 md:px-16 h-[70vh] ">
          <motion.div
            key="feature-sign-to-text"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            exit={{ opacity: 0, y: -40 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Sign-To-Text Translation
            </h3>
            <p className="text-lg text-gray-600">
              Instantly convert sign language gestures into readable text using
              MediaPipe and AI-powered recognition. Perfect for enabling smooth
              communication between signers and non-signers in real time.
            </p>
          </motion.div>
        </section>
      ),
    },

    // FEATURE 2 — TEXT-TO-SIGN
    {
      id: 2,
      content: (
        <section className="flex flex-col items-center justify-center text-center px-8 md:px-16 h-[70vh] ">
          <motion.div
            key="feature-text-to-sign"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            exit={{ opacity: 0, y: -40 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Text-To-Sign Translation
            </h3>
            <p className="text-lg text-gray-600">
              Converts written or spoken text into sign language gestures
              through a lifelike avatar. Bridging understanding for the hearing
              and speech-impaired community.
            </p>
          </motion.div>
        </section>
      ),
    },

    // FEATURE 3 — SIGN LANGUAGE LIBRARY
    {
      id: 3,
      content: (
        <section className="flex flex-col items-center justify-center text-center px-8 md:px-16 h-[70vh] ">
          <motion.div
            key="feature-library"
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            exit={{ opacity: 0, y: -40 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Sign Language Library
            </h3>
            <p className="text-lg text-gray-600">
              Explore a growing library of sign language gestures categorized by
              words and expressions — ideal for learning, practice, and
              research.
            </p>
          </motion.div>
        </section>
      ),
    },
  ];

  // Swipe handling
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100 && page < pages.length - 1) {
      setPage(page + 1);
    } else if (info.offset.x > 100 && page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 flex flex-col items-center justify-center">
      {/* Animated Section */}
      <div className="relative w-full max-w-5xl flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-grab active:cursor-grabbing w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            exit={{ opacity: 0, x: -50 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            onDragEnd={handleDragEnd}
          >
            {pages[page].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 mb-8">
        {pages.map((_p, i) => (
          <button
            key={i}
            className={`w-3 h-3 mx-2 rounded-full transition-all duration-500 ${
              page === i ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className="text-center py-16 w-full bg-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Start Connecting Today</h3>
        <p className="text-lg mb-8 opacity-90">
          Experience communication without barriers.
        </p>
        <Button color="primary" size="lg" variant="shadow">
          Download App
        </Button>
      </section>
    </main>
  );
}
