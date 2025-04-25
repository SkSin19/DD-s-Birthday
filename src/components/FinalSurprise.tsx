import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/FinalSurprise.css";

interface Chocolate {
  id: number;
  x: number;
  y: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  isDragging: boolean;
}

interface FinalSurpriseProps {
  setShowConfetti: (value: boolean) => void;
}

export default function FinalSurprise({ setShowConfetti }: FinalSurpriseProps) {
  const [clickCount, setClickCount] = useState(0);
  const [chocolates, setChocolates] = useState<Chocolate[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [boxAnimation, setBoxAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const [boxVisible, setBoxVisible] = useState(true);
  const [showILoveYou, setShowILoveYou] = useState(false);

  const nextId = useRef(0);

  useEffect(() => {
    setShowConfetti(true);
    return () => {
      setShowConfetti(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setShowConfetti]);

  useEffect(() => {
    if (chocolates.length > 0) {
      animateChocolates();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [chocolates]);

  const handleBoxClick = () => {
    setClickCount((prev) => prev + 1);
    setBoxAnimation(true);
    setTimeout(() => setBoxAnimation(false), 500);

    if (clickCount < 4) {
      spawnChocolates(3);
    } else if (clickCount === 4) {
      spawnChocolates(20);
      setShowMessage(true);

      // Hide the box after a delay for animation
      setTimeout(() => {
        setBoxVisible(false);
        setShowILoveYou(true);
      }, 1000);
    }
  };

  const spawnChocolates = (count: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const newChocolates: Chocolate[] = [];

    for (let i = 0; i < count; i++) {
      newChocolates.push({
        id: nextId.current++,
        x: container.clientWidth / 2,
        y: container.clientHeight / 2,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: (Math.random() - 0.5) * 10,
        isDragging: false,
      });
    }

    setChocolates((prev) => [...prev, ...newChocolates]);
  };

  const animateChocolates = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    setChocolates((prevChocolates) =>
      prevChocolates.map((choco) => {
        if (choco.isDragging) return choco;

        let newX = choco.x + choco.velocityX;
        let newY = choco.y + choco.velocityY;
        let newVelocityX = choco.velocityX;
        let newVelocityY = choco.velocityY;

        // Bounce off walls
        if (newX < 0 || newX > containerWidth) {
          newVelocityX = -newVelocityX * 0.8;
          newX = newX < 0 ? 0 : containerWidth;
        }

        if (newY < 0 || newY > containerHeight) {
          newVelocityY = -newVelocityY * 0.8;
          newY = newY < 0 ? 0 : containerHeight;
        }

        // Apply gravity
        newVelocityY += 0.1;

        // Apply friction
        newVelocityX *= 0.99;
        newVelocityY *= 0.99;

        return {
          ...choco,
          x: newX,
          y: newY,
          rotation: choco.rotation + choco.velocityX,
          velocityX: newVelocityX,
          velocityY: newVelocityY,
        };
      })
    );

    animationRef.current = requestAnimationFrame(animateChocolates);
  };

  const handleChocolateDragStart = (id: number) => {
    setChocolates((prev) =>
      prev.map((choco) =>
        choco.id === id ? { ...choco, isDragging: true } : choco
      )
    );
  };

  const handleChocolateDragEnd = (
    id: number,
    point: { x: number; y: number }
  ) => {
    setChocolates((prev) =>
      prev.map((choco) =>
        choco.id === id
          ? {
              ...choco,
              isDragging: false,
              velocityX: (point.x || 0) * 2,
              velocityY: (point.y || 0) * 2,
            }
          : choco
      )
    );
  };

  return (
    <div className="gift-container" ref={containerRef}>
      <div className="message-container">
        <motion.h2
          className="text-5xl md:text-7xl font-serif mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Happy Birthday, My Babygirl
        </motion.h2>

        {showMessage && (
          <motion.div
            className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl mb-4">I have one last question for you...</p>
            <motion.p
              className="text-3xl font-serif text-yellow-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Will you let me celebrate every birthday with you from now on?
            </motion.p>
          </motion.div>
        )}
      </div>

      {boxVisible && (
        <div
          className={`gift-box ${boxAnimation ? "box-open-animation" : ""}`}
          onClick={handleBoxClick}
        >
          <div className="gift-box-top"></div>
          <div className="gift-box-bottom"></div>
          <div className="gift-box-ribbon"></div>
          <div className="gift-box-bow"></div>
        </div>
      )}

      {showILoveYou && (
        <motion.h1
          className="love-text"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          I LOVE YOU
          <p className="final-message">
            This webpage might have ended, but our story has just begun
          </p>
        </motion.h1>
      )}

      {clickCount > 0 && clickCount < 5 && (
        <div className="click-counter">
          Click the gift {5 - clickCount} more times!
        </div>
      )}

      {chocolates.map((choco) => (
        <motion.div
          key={choco.id}
          className="chocolate"
          style={{
            left: choco.x,
            top: choco.y,
            rotate: choco.rotation,
          }}
          drag
          dragConstraints={containerRef}
          onDragStart={() => handleChocolateDragStart(choco.id)}
          onDragEnd={(_, info) =>
            handleChocolateDragEnd(choco.id, {
              x: info.point.x,
              y: info.point.y,
            })
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </div>
  );
}
