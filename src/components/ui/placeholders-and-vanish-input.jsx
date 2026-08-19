"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    
    // Start vanish animation
    setAnimating(true);
    
    // Wait for vanish animation to finish, then trigger actual submit
    setTimeout(() => {
      onSubmit(e, value);
      setValue(""); // clear value after vanish
      setAnimating(false);
    }, 600);
  };

  return (
    <form
      className="relative w-full mx-auto bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden flex items-center transition-all focus-within:ring-2 focus-within:ring-[#801818]"
      onSubmit={handleSubmit}
    >
      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        className={`w-full py-3 pl-12 pr-12 bg-transparent focus:outline-none text-gray-700 transition-all duration-300 ${
          animating ? "opacity-0 scale-y-0 blur-sm translate-y-4" : "opacity-100 scale-y-100"
        }`}
      />

      {/* Placeholders */}
      <AnimatePresence mode="wait">
        {!value && !animating && (
          <motion.div
            key={currentPlaceholder}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-y-0 left-12 flex items-center text-gray-400 pointer-events-none"
          >
            {placeholders[currentPlaceholder]}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={!value || animating}
        className="absolute right-2 w-8 h-8 rounded-full bg-[#801818] flex items-center justify-center text-white transition-all hover:bg-[#601212] disabled:bg-gray-200 disabled:text-gray-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
