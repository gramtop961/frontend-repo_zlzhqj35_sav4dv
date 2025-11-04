import React from 'react';
import { History, Skull, Zap } from 'lucide-react';

const HistoryLog = ({ rounds }) => {
  if (!rounds || rounds.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-purple-200/80">
        <History className="h-4 w-4" /> Recent Rounds
      </div>
      <ul className="space-y-2 text-sm">
        {rounds.map((r, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              {r.outcome === 'BANG' ? (
                <Skull className="h-4 w-4 text-rose-400" />
              ) : (
                <Zap className="h-4 w-4 text-emerald-400" />
              )}
              <span className="text-white/90">{r.outcome}</span>
            </div>
            <span className="text-white/60">Chamber {r.chamber + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryLog;
