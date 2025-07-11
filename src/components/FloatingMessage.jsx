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
  const dragRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnread(true);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!dragRef.current) {
      setVisible((prev) => !prev);
      setUnread(false);
    }
  };

  const handleStart = () => {
    dragRef.current = false;
  };

  const handleDrag = () => {
    dragRef.current = true;
  };

  const handleStop = () => {
    setTimeout(() => {
      dragRef.current = false; // reset after drag ends
    }, 100);
  };

  const nextMessage = () => {
    setIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <Draggable onStart={handleStart} onDrag={handleDrag} onStop={handleStop}>
      <div className="fixed bottom-20 right-6 z-50 cursor-move">
        {/* Chat Icon */}
        <button
          onClick={handleClick}
          className="relative bg-purple-200 hover:bg-purple-300 text-purple-800 p-3 rounded-full shadow-lg transition"
          aria-label="Toggle message"
        >
          <FaCommentDots size={20} />
          {unread && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          )}
        </button>

        {/* Message Panel */}
        {visible && (
          <div
            className="mt-3 max-w-xs bg-white text-purple-800 shadow-lg rounded-2xl p-4 text-sm sm:text-base border border-purple-200"
            onClick={nextMessage}
          >
            {messages[index]}
            <p className="mt-2 text-xs italic text-purple-400">Click to see next</p>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default FloatingMessage;
