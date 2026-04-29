import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import SheepSVG from "./SheepSVG";
import type { SheepPersonality } from "@/lib/sheepLogic";

interface Props {
  personality: SheepPersonality;
  userName: string;
  onRestart: () => void;
}

export default function ResultScreen({ personality, userName, onRestart }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#F4F7FB" });
      const link = document.createElement("a");
      link.download = `sheep-${userName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  }, [userName]);

  const shareCard = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#F4F7FB" });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "sheep.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "خروفك.. مِرآة روحك!",
          text: `أنا ${personality.type}! ${personality.catchphrase}`,
          files: [file],
        });
      } else {
        // fallback: copy text
        await navigator.clipboard.writeText(
          `أنا ${personality.type}! ${personality.catchphrase} 🐑\n\nاكتشف خروفك: ${window.location.href}`
        );
        alert("تم نسخ النتيجة! شاركها مع أصدقائك 📋");
      }
    } catch (err) {
      console.error(err);
    }
  }, [personality]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-10 gap-6"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-bold text-foreground"
      >
        نتيجتك جاهزة! 🎉
      </motion.h2>

      {/* Shareable Card */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="glass-card-elevated p-6 w-full max-w-sm flex flex-col items-center gap-4"
        style={{ direction: "rtl" }}
      >
        {/* Header badge */}
        <div className="px-4 py-1.5 rounded-full text-sm font-bold text-primary-foreground"
          style={{ backgroundColor: personality.color }}>
          {personality.emoji} {personality.title}
        </div>

        <SheepSVG personality={personality} size={200} animated={false} />

        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-foreground">
            🪪 {personality.type}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            {personality.description}
          </p>
          <p
            className="text-base font-bold mt-2 px-3 py-1.5 rounded-xl inline-block"
            style={{ backgroundColor: `${personality.color}15`, color: personality.color }}
          >
            "{personality.catchphrase}"
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-1" />

        <div className="text-muted-foreground/50 text-xs">
          خروفك.. مِرآة روحك! 🐑 | خروف {userName}
        </div>

        <div className="text-center space-y-1">
          <div className="text-foreground/70 text-sm font-bold">
            كل عام وأنتم بخير 🤍✨
          </div>
          <div className="text-muted-foreground/40 text-[10px] font-medium tracking-wide">
            صُنع بكل حب · م. رغد الشوافي
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3 w-full max-w-sm"
      >
        <button
          onClick={shareCard}
          className="btn-primary flex-1 text-base flex items-center justify-center gap-2"
        >
          📤 شارك
        </button>
        <button
          onClick={downloadCard}
          className="flex-1 px-6 py-4 rounded-2xl font-bold text-base border-2 border-primary text-primary
                     hover:bg-primary/5 transition-all duration-200"
        >
          📥 حفظ الصورة
        </button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onRestart}
        className="text-muted-foreground hover:text-foreground transition-colors text-sm mt-2"
      >
        جرّب مرة ثانية 🔄
      </motion.button>
    </motion.div>
  );
}
