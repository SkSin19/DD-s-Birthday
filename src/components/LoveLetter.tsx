import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/LoveLetter.css";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const envelopeVariants = {
    closed: { scale: 1 },
    open: { scale: 1.2 },
  };

  const letterVariants = {
    closed: { y: 0, opacity: 0 },
    open: { y: -100, opacity: 1 },
  };

  return (
    <motion.div
      className="love-letter-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="envelope-container"
        onClick={() => setIsOpen(!isOpen)}
        variants={envelopeVariants}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Envelope */}
        <svg className="envelope-svg" viewBox="0 0 200 200">
          <motion.path
            d="M20,50 L100,120 L180,50 Z"
            fill="currentColor"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M20,50 L20,150 L180,150 L180,50 Z"
            fill="currentColor"
            style={{ fillOpacity: 0.7 }}
          />
        </svg>

        {/* Letter */}
        <motion.div
          className="letter-container"
          variants={letterVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.5 }}
        >
          <div className="letter-content">
            <h3 className="letter-greeting">Dear Deepshree</h3>
            <p className="letter-preview">
              The best i could ever ask for...
            </p>
          </div>
        </motion.div>
      </motion.div>

      {isOpen && (
        <motion.div
          className="full-letter"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="letter-title">My Shree</h2>
          <div className="letter-text">
            <p>
              Weird how we started talking again after you compared me to a
              monkey 🙈 🙉 🙊, but im glad i posted that story that day
            </p>
            <p>
              Cuz never did i think i would say such cringey shit to someone 😏.
              Anyways,
            </p>
            <p>
              Even though you might think that my love for you is'nt real or im
              joking around with you, it's the farthest thing from the truth, i
              can only wish i was closer to you all the time instead of being so
              far away 👉👈
            </p>
            <p>
              You might think im kidding or just flirting around but i dont kid
              when i say you look the absolute best in every photo and every
              video call i see you in. And oof that killer smile, people call me
              crazy when they see me smiling weirdly while looking at my phone 🤣.
            </p>
            <p>
              Your voice - a mere mortal can't even comment on something so angelic. If only you would sing some songs for me 👉👈.
            </p>
            <p>Happy birthday babygirl 💋.</p>
            <p className="letter-closing">Yours Lethargically,</p>
            <p className="letter-signature">Kumbhkaran 😁</p>
          </div>
        </motion.div>
      )}

      <Link to="/memories" className="letter-button-link">
        <motion.button
          className="letter-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          How i see you
        </motion.button>
      </Link>
    </motion.div>
  );
}
