import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

const FloatingHeart = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomSize = Math.random() * 20 + 10;
  const randomDuration = Math.random() * 10 + 10;

  return (
    <motion.div
      className="absolute text-pink-400/30 pointer-events-none"
      initial={{ y: '110vh', x: `${randomX}vw`, scale: 0, rotate: 0 }}
      animate={{ 
        y: '-10vh', 
        x: `${randomX + (Math.random() * 20 - 10)}vw`,
        scale: 1,
        rotate: 360 
      }}
      transition={{ 
        duration: randomDuration, 
        delay: delay, 
        repeat: Infinity,
        ease: "linear" 
      }}
      style={{ width: randomSize, height: randomSize }}
    >
      <Heart fill="currentColor" size={randomSize} />
    </motion.div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Generate some floating hearts
    const newHearts = Array.from({ length: 30 }).map((_, i) => i * 0.5);
    setHearts(newHearts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 flex items-center justify-center overflow-hidden relative font-serif">
      {/* Background Floating Hearts */}
      {hearts.map((delay, i) => (
        <FloatingHeart key={i} delay={delay} />
      ))}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="heart-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="relative z-10 cursor-pointer group flex flex-col items-center"
            onClick={() => setIsOpen(true)}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-red-400 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Heart 
                size={140} 
                className="text-red-500 drop-shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-110" 
                fill="currentColor" 
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 text-rose-600 font-script text-3xl tracking-wider drop-shadow-sm"
            >
              Chạm vào trái tim này nhé...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="message-card"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative z-10 max-w-md w-full mx-4"
          >
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50 text-center relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-rose-300 rounded-tl-3xl opacity-50 m-4"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-rose-300 rounded-br-3xl opacity-50 m-4"></div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <Heart size={40} className="text-rose-500" fill="currentColor" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl text-rose-600 font-script mb-6 leading-tight"
              >
                Chúc mừng 8/3<br/>Em Yêu!
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed"
              >
                <p>
                  Nhân ngày Quốc tế Phụ nữ, chúc cô gái của anh luôn xinh đẹp, rạng rỡ và hạnh phúc.
                </p>
                <p>
                  Cảm ơn em đã luôn ở bên cạnh anh. Yêu em nhiều lắm! ❤️
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setIsOpen(false)}
                className="mt-10 px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-rose-500/30"
              >
                Đóng lại
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
