import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LettersPage from './pages/LettersPage';
import AudioPlayer from './components/AudioPlayer';
import FloatingMessage from './components/FloatingMessage';

function App() {
  return (
    <div className="font-sans bg-white text-stone-800">
      <AudioPlayer />
      <FloatingMessage />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/letters" element={<LettersPage />} />
      </Routes>
    </div>
  );
}

export default App;
