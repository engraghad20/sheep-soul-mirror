import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGS = [
  { text: "Initializing Sheep Engine...", icon: "⚙️" },
  { text: "Mapping Personality Traits...", icon: "🧬" },
  { text: "Running Eid AI Model v3.1...", icon: "🤖" },
  { text: "Generating Sheep DNA...", icon: "🧪" },
  { text: "Applying Wool Texture...", icon: "🐑" },
  { text: "Finalizing Identity...", icon: "✨" },
];

interface Props {
  onComplete: () => void;
  /** When false, the loader holds at ~90% waiting for the AI response. */
  ready?: boolean;
}

export default function ProcessingScreen({ onComplete, ready = true }: Props) {
  const [currentLog, setCurrentLog] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle log lines
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLog((prev) => (prev < LOGS.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(id);
  }, []);

  // Progress bar: rises to 90 quickly, then waits for `ready` to finish.
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => {
        const cap = ready ? 100 : 90;
        if (prev >= cap) return prev;
        const step = prev < 60 ? 2.5 : prev < 85 ? 1 : 0.4;
        return Math.min(cap, prev + step);
      });
    }, 80);
    return () => clearInterval(id);
  }, [ready]);

  // Trigger completion only when AI is ready AND progress filled
  useEffect(() => {
    if (ready && progress >= 100) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
  }, [ready, progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-6xl"
      >
        🐑
      </motion.div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">جاري التحليل...</h2>
        <p className="text-muted-foreground text-sm">
          {ready ? "اللمسات الأخيرة..." : "الذكاء الاصطناعي يحلل شخصيتك بعمق"}
        </p>
      </div>

      <div className="w-full max-w-sm h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-primary to-accent"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <div className="glass-card p-5 w-full max-w-sm font-mono text-sm space-y-2 min-h-[200px]" dir="ltr">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-accent/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
          <span className="text-muted-foreground/50 text-xs mr-2">sheep-ai-terminal</span>
        </div>
        <AnimatePresence>
          {LOGS.slice(0, currentLog + 1).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-foreground/80"
            >
              <span className="text-green-400">$</span>
              <span>{log.icon}</span>
              <span>{log.text}</span>
              {i === currentLog && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="text-primary"
                >
                  █
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
