import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import '../styles/Timeline.css'

const timelineData = [
  {
    date: '',
    title: 'That Weird App',
    description: 'I never thought of trying dating apps tbh, but got to try it out due to me already being working on a related project, liked the ui so i started swiping for fun, saw you - found you pretty - swiped right 😁',
    icon: '🧱',
  },
  {
    date: '',
    title: 'You swiped back',
    description: 'Got matched with you - we chatted for a few minutes, i honestly enjoyed the chat. But you were preparing for your exams and seemed pretty busy, so i thought it was a good idea to not bother you too much and so we said our goodbyes. We talked again but nothing serious.',
    icon: '☕',
  },
  {
    date: '',
    title: 'That one insta story',
    description: 'While scramming through my gallery, i saw a silly pic of myself and uploaded it as my insta story, and you replied to it. I was surprised to see your message again, and we started chatting again. Luck really was on our side that day.',
    icon: '✨',
  },
  {
    date: '',
    title: 'Hours and hours of chatting',
    description: 'We started chatting again, but this time it was different. We talked for hours and hours, about everything and anything. You became a good friend to me and i really enjoyed talking to you, this happened for a lot of days.',
    icon: '💬',
  },
  {
    date: '',
    title: 'You and I became Us',
    description: 'I was afraid of it at first, like very afraid which you probably remember but im a sakht launda, so you know..... You prob already remember what happened next. And so, the rest is history and im looking pretty damn forward for the future that is Us.',
    icon: '❤️',
  },
]

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

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
      className="timeline-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="timeline-title"
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        The Story of how we became Us
      </motion.h2>

      <motion.div 
        className="timeline"
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Timeline line */}
        <div className="timeline-line"></div>

        {timelineData.map((event, index) => (
          <motion.div
            key={index}
            className={`timeline-event ${index % 2 === 0 ? 'timeline-event-left' : 'timeline-event-right'}`}
            variants={item}
          >
            <div className="timeline-event-content">
              <span className="timeline-event-icon">{event.icon}</span>
              <h3 className="timeline-event-title">{event.title}</h3>
              <p className="timeline-event-date">{event.date}</p>
              <p className="timeline-event-description">{event.description}</p>
            </div>
            <div className="timeline-event-marker">
              <motion.div 
                className="timeline-event-number"
                whileHover={{ scale: 1.2 }}
              >
                {index + 1}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="timeline-button-container">
        <Link to="/about-you">
          <motion.button
            className="timeline-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            What i think i know about you
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}