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

        <div className="flex items-center gap-3 mt-2">
          <a
            href="https://www.linkedin.com/in/raghad-alshawafy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-foreground/70 hover:text-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            style={{ boxShadow: "0 4px 20px -4px hsl(244 95% 69% / 0.15)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="https://x.com/engraghad02?t=ta3QEbt-hv5DosOUP4H6Sw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-foreground/70 hover:text-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            style={{ boxShadow: "0 4px 20px -4px hsl(244 95% 69% / 0.15)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
