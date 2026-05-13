import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import LandingScreen from "@/components/LandingScreen";
import InputScreen from "@/components/InputScreen";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultScreen from "@/components/ResultScreen";
import { getSheepPersonality, type SheepPersonality } from "@/lib/sheepLogic";
import { supabase } from "@/integrations/supabase/client";

type Screen = "landing" | "input" | "processing" | "result";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [userName, setUserName] = useState("");
  const [personality, setPersonality] = useState<SheepPersonality | null>(null);
  const [aiReady, setAiReady] = useState(false);

  const handleSubmit = useCallback(async (name: string, traits: string[]) => {
    setUserName(name);
    setPersonality(null);
    setAiReady(false);
    setScreen("processing");

    try {
      const { data, error } = await supabase.functions.invoke("analyze-sheep", {
        body: { name, traits },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      const ai = data?.personality;
      if (!ai) throw new Error("لم يتم استلام التحليل");

      // Ensure type contains the user's name for personalization
      const finalType: string = ai.type?.includes(name)
        ? ai.type
        : `خروف ${name} - ${ai.title}`;

      setPersonality({
        type: finalType,
        title: ai.title,
        description: ai.description,
        catchphrase: ai.catchphrase,
        color: ai.color,
        secondaryColor: ai.secondaryColor,
        accessories: ai.accessories || [],
        emoji: ai.emoji || "🐑",
        strengths: ai.strengths,
        hidden_trait: ai.hidden_trait,
        eid_advice: ai.eid_advice,
        compatibility: ai.compatibility,
      });
      setAiReady(true);
    } catch (err) {
      console.error("AI analysis failed:", err);
      const msg = err instanceof Error ? err.message : "فشل التحليل";
      toast.error(msg + " — استخدمنا تحليلاً احتياطياً");
      // Fallback to local logic
      setPersonality(getSheepPersonality(name, traits));
      setAiReady(true);
    }
  }, []);

  const handleProcessingComplete = useCallback(() => {
    if (personality) setScreen("result");
  }, [personality]);

  const handleRestart = useCallback(() => {
    setScreen("landing");
    setUserName("");
    setPersonality(null);
    setAiReady(false);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === "landing" && <LandingScreen key="landing" onStart={() => setScreen("input")} />}
        {screen === "input" && <InputScreen key="input" onSubmit={handleSubmit} />}
        {screen === "processing" && (
          <ProcessingScreen
            key="processing"
            ready={aiReady}
            onComplete={handleProcessingComplete}
          />
        )}
        {screen === "result" && personality && (
          <ResultScreen
            key="result"
            personality={personality}
            userName={userName}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
