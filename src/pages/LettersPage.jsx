import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterModal from '../components/LetterModal';
import { motion } from 'framer-motion';
import { FaRegEnvelope, FaArrowLeft } from 'react-icons/fa';
import letters from '../data/letters';

const LettersPage = () => {
  const [openLetter, setOpenLetter] = useState(null);
  const navigate = useNavigate();

  // Inject keyframes animation on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bgFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes floatParticle {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <main
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-serif overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #f3e8ff, #ede9fe, #fdf4ff, #fce7f3)',
        backgroundSize: '500% 500%',
        animation: 'bgFlow 20s ease infinite',
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-purple-200 rounded-full blur-sm opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${7 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition focus:outline-none focus-visible:ring focus-visible:ring-purple-300 rounded"
          aria-label="Go back to landing page"
        >
          <FaArrowLeft aria-hidden="true" /> <span>Back</span>
        </button>
        <h1 className="text-4xl md:text-5xl text-center w-full sm:w-auto text-purple-900 italic tracking-wide drop-shadow-sm">
          Words Etched in Time
        </h1>
      </div>

      <section
        aria-label="List of love letters"
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {letters.map((letter) => (
          <motion.article
            key={letter.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-8 flex flex-col items-center text-center border border-purple-200 hover:border-purple-300 cursor-pointer focus-within:ring-2 focus-within:ring-purple-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpenLetter(letter)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenLetter(letter);
              }
            }}
            aria-label={`Read letter titled ${letter.title}`}
          >
            <div className="text-5xl text-purple-400 mb-4">
              <FaRegEnvelope />
            </div>
            <p className="text-lg font-medium text-purple-700 italic text-center leading-snug whitespace-pre-line">
              {letter.title}
            </p>
          </motion.article>
        ))}
      </section>

      {openLetter && (
        <LetterModal
          title={openLetter.title}
          content={openLetter.content}
          onClose={() => setOpenLetter(null)}
          audioSrc={openLetter.audioSrc}
        />
      )}
    </main>
  );
};

export default LettersPage;
