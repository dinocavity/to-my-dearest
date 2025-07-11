import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioRef.current.volume = 0.5;
    audioRef.current.play();
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
    audioRef.current.muted = !muted;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src="/music.mp3" loop autoPlay hidden />
      <button
        onClick={toggleMute}
        className="p-2 rounded-full shadow-lg bg-stone-100 hover:bg-stone-200"
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default AudioPlayer;