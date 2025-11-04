import React, { useRef, useState } from 'react';
import Hero from './components/Hero';
import RouletteGame from './components/RouletteGame';
import HistoryLog from './components/HistoryLog';
import Footer from './components/Footer';

function App() {
  const gameRef = useRef(null);
  const [recentRounds, setRecentRounds] = useState([]);

  const handleStart = () => {
    const el = document.getElementById('play');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // The RouletteGame maintains its own local history UI for mobile.
  // For the sidebar history, we intercept console-like events by wrapping setState if needed.
  // Simpler: we mirror rounds via a custom event dispatched from RouletteGame.
  React.useEffect(() => {
    const listener = (e) => {
      if (Array.isArray(e.detail)) setRecentRounds(e.detail);
    };
    window.addEventListener('roulette:rounds', listener);
    return () => window.removeEventListener('roulette:rounds', listener);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0012] to-black text-white">
      <Hero onStart={handleStart} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <RouletteGame ref={gameRef} />
        </div>
        <aside className="md:col-span-1">
          <HistoryLog rounds={recentRounds} />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default App;
