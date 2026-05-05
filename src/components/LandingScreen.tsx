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
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 gap-6 overflow-hidden"
    >
      {/* Aurora animated background */}
      <div className="aurora-bg">
        <div
          className="aurora-blob bg-primary/40"
          style={{ width: 480, height: 480, top: "-10%", right: "-10%" }}
        />
        <div
          className="aurora-blob bg-accent/30"
          style={{ width: 380, height: 380, bottom: "-8%", left: "-8%", animationDelay: "3s" }}
        />
        <div
          className="aurora-blob"
          style={{
            width: 320,
            height: 320,
            top: "30%",
            left: "40%",
            background: "hsl(280 90% 70% / 0.35)",
            animationDelay: "6s",
          }}
        />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Top badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="signature-chip text-xs font-bold text-foreground/80"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        تجربة حصرية لعيد الأضحى ٢٠٢٦
      </motion.div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 90, damping: 12 }}
        className="relative"
      >
        <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-75" />
        <div className="relative animate-float">
          <SheepSVG size={220} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-4 relative"
      >
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight text-shadow-glow">
          خروفك..
          <br />
          <span className="gradient-text">مِرآة روحك!</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed font-medium">
          اكتشف شخصيتك الأضحوية بالذكاء الاصطناعي
          <br />
          <span className="text-foreground/60 text-base">تجربة تفاعلية فريدة 🐑✨</span>
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="btn-primary mt-2 text-xl group"
      >
        <span className="flex items-center gap-3">
          ابدأ التحليل
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
        </span>
      </motion.button>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-2 mt-4 max-w-md"
      >
        {[
          { icon: "⚡", label: "تحليل فوري" },
          { icon: "🎨", label: "بطاقة فنية" },
          { icon: "📤", label: "قابل للمشاركة" },
        ].map((f) => (
          <div
            key={f.label}
            className="px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/40 text-xs font-semibold text-foreground/70"
          >
            {f.icon} {f.label}
          </div>
        ))}
      </motion.div>

      {/* Premium signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-auto pt-10 flex flex-col items-center gap-2"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="signature-chip">
          <span className="text-xs text-muted-foreground font-medium">صُنع بكل حب</span>
          <span className="text-primary text-sm">🤍</span>
          <span className="text-sm font-black gradient-text">م. رغد الشوافي</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
