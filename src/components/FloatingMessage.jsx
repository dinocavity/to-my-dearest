import { useEffect, useState, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import Draggable from 'react-draggable';

const messages = [
  "You fix people, I fix systems — perfect match, no?",
  "You handle pressure like I handle code — cool and focused.",
  "You're the real upgrade I didn’t know I needed.",
  "I debug code, but you calm my overthinking.",
  "You're the only alert I don’t mind seeing all day.",
  "Even my best projects don’t compare to you.",
  "We both work late — but I’d stay up just to hear your voice.",
  "You heal hearts, I build logic — both kinds of care matter.",
  "You’re not just a heartbeat monitor — you’ve got mine racing too.",
];

const FloatingMessage = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [unread, setUnread] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const tapStartRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setUnread(true), 20000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    tapStartRef.current = Date.now();
  };

  const handleStop = (_, data) => {
    const tapDuration = Date.now() - tapStartRef.current;
    setPosition({ x: data.x, y: data.y });

    // If drag was under 200ms, treat it as a tap
    if (tapDuration < 200) {
      setVisible((prev) => !prev);
      setUnread(false);
    }
  };

  const nextMessage = () => {
    setIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="fixed z-50" style={{ left: position.x, top: position.y || 'auto', bottom: position.y === 0 ? '1.25rem' : 'auto', right: position.x === 0 ? '1.5rem' : 'auto' }}>
      {/* Draggable Icon */}
      <Draggable
        position={position}
        onStart={handleStart}
        onStop={handleStop}
      >
        <div className="cursor-move">
          <button
            className="relative bg-purple-200 hover:bg-purple-300 text-purple-800 p-3 rounded-full shadow-lg transition"
            aria-label="Toggle message"
          >
            <FaCommentDots size={20} />
            {unread && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            )}
          </button>
        </div>
      </Draggable>

      {/* Message Panel */}
      {visible && (
        <div
          className="absolute bottom-14 right-0 max-w-xs bg-white text-purple-800 shadow-lg rounded-2xl p-4 text-sm sm:text-base border border-purple-200"
          onClick={nextMessage}
        >
          {messages[index]}
          <p className="mt-2 text-xs italic text-purple-400">Tap to see next</p>
        </div>
      )}
    </div>
  );
};

export default FloatingMessage;
