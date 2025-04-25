import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSound } from "use-sound";
import loveSong from "./assets/music/romantic-piano.mp3";
import Confetti from "react-confetti";
import Hero from "./components/Hero";
import LoveLetter from "./components/LoveLetter";
import MemoryGallery from "./components/MemoryGallery";
import Timeline from "./components/Timeline";
import FinalSurprise from "./components/FinalSurprise";
import Navbar from "./components/Navbar";
import "./App.css";
import AboutYou from "./components/AboutYou";

function App() {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [play, { stop }] = useSound(loveSong, { volume: 0.3 });

  useEffect(() => {
    play();
    return () => stop();
  }, [play, stop]);

  return (
    <div className="app">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          colors={["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8"]}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/letter" element={<LoveLetter />} />
          <Route path="/memories" element={<MemoryGallery />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/about-you" element={<AboutYou />} />
          <Route
            path="/surprise"
            element={<FinalSurprise setShowConfetti={setShowConfetti} />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;