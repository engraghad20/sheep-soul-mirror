import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_TRAITS } from "@/lib/sheepLogic";

interface Props {
  onSubmit: (name: string, traits: string[]) => void;
}

const traitEmojis: Record<string, string> = {
  "عنيد": "😤",
  "دحيح": "🧠",
  "راعي نوم": "😴",
  "فزعة": "🤝",
  "قيادي": "👑",
  "هادي": "🧘",
  "اجتماعي": "🎉",
  "رايق": "😎",
};

export default function InputScreen({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : prev.length < 3
        ? [...prev, trait]
        : prev
    );
  };

  const canSubmit = name.trim().length > 0 && selectedTraits.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-8 max-w-lg mx-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold text-foreground">عرّفنا عن نفسك 🐑</h2>
        <p className="text-muted-foreground">اكتب اسمك واختر صفاتك (حتى ٣)</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="w-full"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسمك هنا..."
          className="w-full px-6 py-4 rounded-2xl bg-card border border-border/50 text-foreground text-lg text-center
                     placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40
                     transition-all duration-200"
          dir="rtl"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <AnimatePresence>
          {ALL_TRAITS.map((trait, i) => {
            const selected = selectedTraits.includes(trait);
            return (
              <motion.button
                key={trait}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggleTrait(trait)}
                className={`relative px-4 py-4 rounded-2xl border-2 text-base font-semibold transition-all duration-200
                  ${
                    selected
                      ? "border-primary bg-primary/10 text-primary shadow-md"
                      : "border-border/50 bg-card/60 text-foreground hover:border-primary/30"
                  }`}
              >
                <span className="text-xl ml-1">{traitEmojis[trait]}</span>
                {trait}
                {selected && (
                  <motion.div
                    layoutId="check"
                    className="absolute top-2 left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: canSubmit ? 1 : 0.4 }}
        transition={{ delay: 0.5 }}
        whileHover={canSubmit ? { scale: 1.04 } : {}}
        whileTap={canSubmit ? { scale: 0.97 } : {}}
        disabled={!canSubmit}
        onClick={() => onSubmit(name, selectedTraits)}
        className="btn-primary w-full disabled:cursor-not-allowed"
      >
        حلل شخصيتي! 🔍
      </motion.button>
    </motion.div>
  );
}
