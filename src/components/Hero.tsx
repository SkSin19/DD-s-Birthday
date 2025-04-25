import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import '../styles/Hero.css'

export default function Hero() {
  const [ref, inView] = useInView({ threshold: 0.5 })
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hero-content"
      >
        <motion.h1 
          variants={item}
          className="hero-title"
        >
          Happy Birthday Babygirl
        </motion.h1>
        
        <motion.div variants={item}>
          <motion.p 
            className="hero-subtitle"
            whileHover={{ scale: 1.05 }}
          >
            An extra special day for an extra special person
          </motion.p>
        </motion.div>
        
        <motion.div variants={item}>
          <Link to="/letter">
            <motion.button
              className="hero-button"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0px 0px 15px rgba(225, 29, 72, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              I never liked writing letters, but here goes...
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
        ref={ref}
        className="hero-scroll-indicator"
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="hero-scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}