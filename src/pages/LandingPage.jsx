import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { GiScrollQuill } from 'react-icons/gi';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animation = document.createElement('style');
    animation.innerHTML = `
      @keyframes bgShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
      }
    `;
    document.head.appendChild(animation);
    return () => {
      document.head.removeChild(animation);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 lg:px-16 overflow-hidden font-serif"
      style={{
        background: 'linear-gradient(-45deg, #e8eafc, #f1f5ff, #f5eafa)',
        backgroundSize: '600% 600%',
        animation: 'bgShift 18s ease infinite',
      }}
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-indigo-200 rounded-full opacity-50 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.h1
        className="z-10 text-4xl md:text-6xl font-serif mb-3 text-purple-900 drop-shadow-md tracking-wide italic"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        To My Dearest
      </motion.h1>

      <motion.p
        className="z-10 text-lg md:text-xl mb-6 max-w-xl text-purple-800 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        These are thoughts I’ve written with care—letters that speak what’s often left unsaid.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="z-10 px-7 py-3 bg-purple-300 text-purple-900 font-medium rounded-full shadow-lg hover:bg-purple-400 transition mb-6 flex items-center gap-2"
        onClick={() => navigate('/letters')}
      >
        <GiScrollQuill className="text-xl" />
        <span>Enter the Letters</span>
      </motion.button>

      <p className="z-10 text-xs sm:text-sm text-purple-500 italic">
        More entries will follow. This is just the beginning.
      </p>
    </div>
  );
};

export default LandingPage;
