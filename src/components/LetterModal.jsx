import { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const LetterModal = ({ title, content, onClose, audioSrc }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="max-w-4xl w-full mx-4 md:mx-auto bg-gradient-to-br from-purple-100 via-rose-50 to-amber-50 rounded-3xl shadow-2xl border border-purple-200 outline-none relative font-serif"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      ariaHideApp={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="relative px-8 py-10 sm:px-12 sm:py-12"
      >
        <audio ref={audioRef} src={audioSrc} loop hidden />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-500 hover:text-purple-700 transition text-2xl z-10"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl sm:text-4xl text-center text-purple-800 italic font-serif font-bold mb-6 leading-snug">
          {title}
        </h2>

        <div className="max-h-[65vh] overflow-y-auto bg-white/90 rounded-xl px-6 py-6 text-purple-900 text-[1.05rem] leading-8 shadow-inner whitespace-pre-wrap tracking-wide font-[Georgia,'Dancing Script',serif]">
          {content}
        </div>
      </motion.div>
    </Modal>
  );
};

export default LetterModal;
