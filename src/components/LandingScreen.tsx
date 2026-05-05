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
        className="mt-auto pt-10 flex flex-col items-center gap-3"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="signature-chip">
          <span className="text-xs text-muted-foreground font-medium">صُنع بكل حب</span>
          <span className="text-primary text-sm">🤍</span>
          <span className="text-sm font-black gradient-text">م. رغد الشوافي</span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 mt-1">
          <motion.a
            href="https://www.linkedin.com/in/raghad-alshawafy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn - م. رغد الشوافي"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors shadow-[0_4px_20px_-4px_hsl(244_95%_69%_/_0.2)]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/raghad_alshawafy?igsh=dTNhZDRoMml4MGs="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram - راغد الشوافي"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center text-foreground/70 hover:text-accent-foreground transition-colors shadow-[0_4px_20px_-4px_hsl(280_90%_70%_/_0.25)] hover:border-[hsl(320_80%_60%/0.5)]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[hsl(45_100%_60%/0)] via-[hsl(320_80%_60%/0)] to-[hsl(280_90%_70%/0)] group-hover:from-[hsl(45_100%_60%/0.15)] group-hover:via-[hsl(320_80%_60%/0.15)] group-hover:to-[hsl(280_90%_70%/0.15)] transition-all" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
