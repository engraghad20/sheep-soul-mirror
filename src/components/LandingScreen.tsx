import { motion } from "framer-motion";
import SheepSVG from "./SheepSVG";

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-6"
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-primary/20 animate-pulse-soft" />
        <div className="absolute top-40 left-16 w-2 h-2 rounded-full bg-accent/30 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-32 right-32 w-4 h-4 rounded-full bg-primary/10 animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-48 left-24 w-2 h-2 rounded-full bg-accent/20 animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <SheepSVG size={220} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
          خروفك.. <span className="gradient-text">مِرآة روحك!</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
          اكتشف شخصيتك الأضحوية بالذكاء الاصطناعي 🐑✨
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="btn-primary mt-4 text-xl"
      >
        ابدأ التحليل 🚀
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-muted-foreground/60 text-sm mt-4"
      >
        مدعوم بتقنية الذكاء الاصطناعي الخروفي 🧪
      </motion.p>
    </motion.div>
  );
}
