import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/AboutYou.css";
import { Link } from "react-router-dom";

const thingsIKnow = [
  "You like hritik roshan too much, even though im jealous, i'll let that one slide 😒",
  "You love eating food, i dont know where it all goes tho 🤣",
  "You love looking at naked guys, baby mujhse bol diya kro na, dusre ladko ki kya jaroorat hai 😔",
  "You love reading Dark Roamance novels 🌚",
  "You love eating chocolates and sweets 🍫",
  "I think that actually me tum bhi tharki ho bas batati nhi ho 😏, cmon bf se to bata hi sakti ho na",
  "You are the shy type, but i love that about you ❤️ i just wish you could open up to me more",
  "I like how you become mad whenever i insult your friends and honestly i do that because i wanna be right there with you just like them but unfortunately cant 🥹",
  "You are really confident in your looks, and you should be, you're gorgeous 😍",
  "Your love your family, and i think everyone's family should be their priority",
  "Your favorite word selection is as follows: hmm, accha, sahi hai, bilkul, thik hai 😒😒",
  "You are really religious",
  "You love rajasthani food and culture, my cute marwadi darling 😘",
  "You love your friends, cant say im not jealous but oh well",
  "You love talking to people who you have become comfortable with and i wish someday i could be one of them 💞💞",
  "Ek request hai: Uss mote se mat baat kiya kro pls",
];

export default function AboutYou() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="about-you-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="about-you-title"
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        What I Think About My Sweetest Babygirl
      </motion.h2>

      <motion.p
        className="about-you-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        I dont have a poor memory when it comes to you...
      </motion.p>

      <motion.div
        className="about-you-list"
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {thingsIKnow.map((itemText, index) => (
          <motion.div
            key={index}
            className="about-you-item"
            variants={item}
            whileHover={{ scale: 1.03 }}
          >
            <div className="heart-bullet">❤️</div>
            <p>
              {itemText.replace(/\{(.*?)\}/g, (match, p1) => {
                // Replace the placeholders with actual details you know
                const details: Record<string, string> = {
                  color: "your actual favorite color",
                  hobby: "your favorite hobby",
                  // Add all other details here
                };
                return details[p1] || match;
              })}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <Link to="/surprise" className="letter-button-link">
        <motion.button
          className="letter-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Final surprise
        </motion.button>
      </Link>
    </motion.div>
  );
}
