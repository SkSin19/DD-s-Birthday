import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import '../styles/MemoryGallery.css'

const memories = [
  { id: 1, image: '/images/1.jpg', caption: '' },
  { id: 2, image: '/images/2.jpg', caption: '' },
  { id: 3, image: '/images/3.jpg', caption: '' },
  { id: 4, image: '/images/4.jpg', caption: '' },
  { id: 5, image: '/images/5.jpg', caption: '' },
  { id: 6, image: '/images/6.jpg', caption: '' },
  { id: 7, image: '/images/7.jpg', caption: '' },
  { id: 8, image: '/images/8.jpg', caption: '' },
  { id: 9, image: '/images/9.jpg', caption: '' },

  // Add more memories
]

export default function MemoryGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [ref, inView] = useInView({ threshold: 0.1 })
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="memory-gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ref}
    >
      <motion.h2 
        className="gallery-title"
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        How i see you
      </motion.h2>
      
      <motion.div 
        className="gallery-grid"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            className="memory-card"
            layoutId={`memory-${memory.id}`}
            onClick={() => setSelectedId(memory.id)}
            variants={item}
            whileHover={{ y: -10 }}
          >
            <img 
              src={memory.image} 
              alt={memory.caption}
              className="memory-image"
            />
            <div className="memory-caption">
              <p>{memory.caption}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="memory-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            {memories.map((memory) => (
              memory.id === selectedId && (
                <motion.div
                  key={memory.id}
                  className="modal-content"
                  layoutId={`memory-${memory.id}`}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.caption}
                    className="modal-image"
                  />
                  <motion.p 
                    className="modal-caption"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {memory.caption}
                  </motion.p>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="message">
        <p>I guess I wasnt gifted in the memory department</p>
        <p>But i can confidently say that each and every photo of you has been etched in my mind permanently 😍.</p>
        <p>Oh and now you know the reason why i saved all the photos and snaps. Btw that doesnt mean i would'nt be saving the photos later 😁</p>

      </div>
      
      <div className="gallery-button-container">
        <Link to="/timeline">
          <motion.button
            className="gallery-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Journey Together
          </motion.button>
        </Link>
      </div>
      
    </motion.div>
  )
}