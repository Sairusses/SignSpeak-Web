import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [page, setPage] = useState(0);

  const phoneAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const pages = [
    {
      id: 0,
      content: (
        <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 h-[70vh]">
          <motion.div {...phoneAnimation}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-blue-700 mb-4 sm:mb-6">
              Bridging Communication with <span className="text-blue-500">AI</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto">
              SignSpeak translates sign language into text and speech — enabling communication without barriers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/download">
                <Button color="primary" radius="lg" size="md" className="w-full sm:w-auto">Get SignSpeak</Button>
              </Link>
              <Link to="/about">
                <Button radius="lg" size="md" variant="bordered" className="w-full sm:w-auto">Learn More</Button>
              </Link>
            </div>
          </motion.div>
        </section>
      ),
    },
    {
      id: 1,
      content: (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-8 md:px-16 h-[75vh] text-center sm:text-left">
          <motion.div {...phoneAnimation} className="max-w-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">Sign-To-Text Translation</h3>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              Convert sign gestures into readable text instantly using AI-powered tracking.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -40, rotate: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/sign-to-text.png"
            alt="Sign to Text Screenshot"
            className="w-36 sm:w-48 max-w-[150px] sm:max-w-full select-none pointer-events-none"
            loading="lazy"
          />
        </section>
      ),
    },
    {
      id: 2,
      content: (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-8 md:px-16 h-[75vh] text-center sm:text-left">
          <motion.div {...phoneAnimation} className="max-w-md order-2 sm:order-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">Text-To-Sign Translation</h3>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              Enter text and watch it translated to sign language using our animated avatar.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -40, rotate: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/text-to-sign.png"
            alt="Text To Sign Screenshot"
            className="w-36 sm:w-48 max-w-[150px] sm:max-w-full select-none pointer-events-none"
            loading="lazy"
          />
        </section>
      ),
    },
    {
      id: 3,
      content: (
        <section className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-8 md:px-16 h-[75vh] text-center sm:text-left">
          <motion.div {...phoneAnimation} className="max-w-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">Sign Language Library</h3>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              Learn and browse categorized sign language gestures for education and practice.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -40, rotate: 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="/library.png"
            alt="Library Screenshot"
            className="w-36 sm:w-48 max-w-[150px] sm:max-w-full select-none pointer-events-none"
            loading="lazy"
          />
        </section>
      ),
    },
  ];


  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50 && page < pages.length - 1) setPage(page + 1);
    else if (info.offset.x > 50 && page > 0) setPage(page - 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-3xl flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {pages[page].content}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 mb-8">
        {pages.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 mx-2 rounded-full transition-all duration-500 ${page === i ? "bg-blue-600 w-6" : "bg-gray-300"}`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

      <section className="text-center py-16 w-full bg-blue-600 text-white px-4 sm:px-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Start Connecting Today</h3>
        <p className="text-base sm:text-lg mb-8 opacity-90">Experience communication without barriers.</p>
        <Link to="/download">
          <Button color="primary" size="lg" variant="shadow" className="w-full sm:w-auto">Download App</Button>
        </Link>
      </section>
    </main>
  );
}