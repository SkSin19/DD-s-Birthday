import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import heartAnimation from "../assets/animations/heart-burst.json";
import { JSX, useState } from "react";
import {
  FiHome,
  FiHeart,
  FiImage,
  FiClock,
  FiMail,
  FiStar,
} from "react-icons/fi";
import "../styles/Navbar.css";

interface NavItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/letter", name: "Letter", icon: <FiMail /> },
    { path: "/memories", name: "You", icon: <FiImage /> },
    { path: "/timeline", name: "Our Story", icon: <FiClock /> },
    { path: "/about-you", name: "What I think about you", icon: <FiHeart /> },
    { path: "/surprise", name: "Surprise", icon: <FiStar /> },
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="nav-container">
        {/* Left side navigation items */}
        <div className="nav-left">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Center beating heart animation */}
        <div className="nav-center">
          <Link to="/">
            <Player
              autoplay
              loop
              src={heartAnimation}
              className="heart-animation"
            />
          </Link>
        </div>

        {/* Right side navigation items */}
        <div className="nav-right">
          {navItems.slice(3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="menu-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}