import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, RotateCcw, Zap, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chamber = ({ index, activeIndex, revealed, bulletIndex }) => {
  const isActive = index === activeIndex;
  const isBullet = revealed && index === bulletIndex;
  return (
    <div
      className={
        'flex h-8 w-8 items-center justify-center rounded-full border transition ' +
        (isActive
          ? 'border-violet-300 bg-violet-500/20 shadow-[0_0_12px_rgba(167,139,250,0.6)]'
          : 'border-white/20 bg-white/5')
      }
    >
      <div
        className={
          'h-3 w-3 rounded-full transition ' +
          (isBullet ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]' : 'bg-white/40')
        }
      />
    </div>
  );
};

const RouletteGame = () => {
  const chambers = 6;
  const [bulletIndex, setBulletIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [outcome, setOutcome] = useState(null); // 'CLICK' | 'BANG' | null
  const [rounds, setRounds] = useState([]);
  const spinTimer = useRef(null);

  const angle = useMemo(() => (360 / chambers) * currentIndex, [currentIndex, chambers]);

  useEffect(() => {
    return () => {
      if (spinTimer.current) clearInterval(spinTimer.current);
    };
  }, []);

  useEffect(() => {
    // Share rounds with the outer layout for the sidebar history
    window.dispatchEvent(new CustomEvent('roulette:rounds', { detail: rounds }));
  }, [rounds]);

  const load = () => {
    setBulletIndex(Math.floor(Math.random() * chambers));
    setCurrentIndex(0);
    setSpinning(false);
    setRevealed(false);
    setOutcome(null);
  };

  const spin = () => {
    if (bulletIndex === null) load();
    setSpinning(true);
    let ticks = 0;
    const totalTicks = 24 + Math.floor(Math.random() * 12);
    spinTimer.current = setInterval(() => {
      ticks += 1;
      setCurrentIndex((prev) => (prev + 1) % chambers);
      if (ticks >= totalTicks) {
        clearInterval(spinTimer.current);
        setSpinning(false);
      }
    }, 60);
  };

  const pull = () => {
    if (bulletIndex === null || spinning) return;
    const isBang = currentIndex === bulletIndex;
    setOutcome(isBang ? 'BANG' : 'CLICK');
    setRounds((r) => [{ outcome: isBang ? 'BANG' : 'CLICK', chamber: currentIndex }, ...r].slice(0, 8));
    setRevealed(isBang);
    if (!isBang) {
      setCurrentIndex((prev) => (prev + 1) % chambers);
    }
  };

  const reset = () => {
    setBulletIndex(null);
    setCurrentIndex(0);
    setSpinning(false);
    setRevealed(false);
    setOutcome(null);
    setRounds([]);
  };

  const quickPlay = () => {
    load();
    setTimeout(spin, 50);
  };

  return (
    <section id="play" className="relative -mt-10 w-full">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/70 p-6 shadow-2xl backdrop-blur">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Russian Roulette</h2>
              <p className="mt-1 text-sm text-white/70">
                Spin the cylinder and pull the trigger. Survive the click.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={quickPlay}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600/90 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                <Play className="h-4 w-4" /> Quick Play
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 shadow hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Visual cylinder */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: angle }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="relative h-60 w-60 rounded-full border-2 border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
              >
                <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-white/20 bg-white/10" />
                <div className="absolute left-1/2 top-0 h-6 w-1 -translate-x-1/2 rounded-b bg-fuchsia-400 shadow-[0_0_12px_rgba(244,114,182,0.9)]" />
                <div className="grid h-full w-full grid-cols-3 grid-rows-3 place-items-center">
                  {Array.from({ length: chambers }).map((_, i) => (
                    <React.Fragment key={i}>
                      {i === 0 && <div />}
                      {i === 1 && (
                        <div className="col-start-3 row-start-1">
                          <Chamber index={i} activeIndex={currentIndex} revealed={revealed} bulletIndex={bulletIndex} />
                        </div>
                      )}
                      {i === 2 && (
                        <div className="col-start-3 row-start-2">
                          <Chamber index={i} activeIndex={currentIndex} revealed={revealed} bulletIndex={bulletIndex} />
                        </div>
                      )}
                      {i === 3 && (
                        <div className="col-start-2 row-start-3">
                          <Chamber index={i} activeIndex={currentIndex} revealed={revealed} bulletIndex={bulletIndex} />
                        </div>
                      )}
                      {i === 4 && (
                        <div className="col-start-1 row-start-2">
                          <Chamber index={i} activeIndex={currentIndex} revealed={revealed} bulletIndex={bulletIndex} />
                        </div>
                      )}
                      {i === 5 && (
                        <div className="col-start-1 row-start-1">
                          <Chamber index={i} activeIndex={currentIndex} revealed={revealed} bulletIndex={bulletIndex} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Controls and status */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={load}
                    className="rounded-lg bg-fuchsia-600/90 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
                  >
                    Load Bullet
                  </button>
                  <button
                    onClick={spin}
                    disabled={spinning}
                    className="rounded-lg bg-indigo-600/90 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {spinning ? 'Spinning…' : 'Spin Cylinder'}
                  </button>
                  <button
                    onClick={pull}
                    disabled={spinning || bulletIndex === null}
                    className="col-span-2 rounded-lg bg-emerald-600/90 px-4 py-3 text-base font-bold text-white shadow hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Pull Trigger
                  </button>
                </div>

                <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Chamber</span>
                    <span className="text-sm font-semibold text-white">{currentIndex + 1} / {chambers}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-white/70">Status</span>
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {outcome === 'BANG' ? (
                          <motion.div
                            key="bang"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-rose-200"
                          >
                            <Skull className="h-4 w-4" /> BANG
                          </motion.div>
                        ) : outcome === 'CLICK' ? (
                          <motion.div
                            key="click"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200"
                          >
                            <Zap className="h-4 w-4" /> CLICK
                          </motion.div>
                        ) : (
                          <motion.div
                            key="ready"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/80"
                          >
                            Ready
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
            </div>
          </div>

          {/* Inline history for smaller screens; App also renders a list */}
          <div className="md:hidden">
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Recent</div>
              <div className="flex flex-wrap gap-2">
                {rounds.map((r, i) => (
                  <span
                    key={i}
                    className={
                      'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ' +
                      (r.outcome === 'BANG'
                        ? 'bg-rose-500/20 text-rose-200'
                        : 'bg-emerald-500/20 text-emerald-200')
                    }
                  >
                    {r.outcome === 'BANG' ? <Skull className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                    {r.outcome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouletteGame;
