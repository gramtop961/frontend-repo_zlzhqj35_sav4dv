import React from 'react';
import Spline from '@splinetool/react-spline';
import { Play } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white drop-shadow md:text-6xl">
          Cyber Roulette
        </h1>
        <p className="mt-4 max-w-2xl text-base text-purple-200/80 md:text-lg">
          A dark, futuristic spin on chance. Step into the void. Test your luck. Hear the click.
        </p>
        <button
          onClick={onStart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02] hover:shadow-violet-500/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 md:text-base"
        >
          <Play className="h-5 w-5" /> Start Playing
        </button>
      </div>
    </section>
  );
};

export default Hero;
