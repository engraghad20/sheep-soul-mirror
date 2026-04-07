import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import InputScreen from "@/components/InputScreen";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultScreen from "@/components/ResultScreen";
import { getSheepPersonality, type SheepPersonality } from "@/lib/sheepLogic";

type Screen = "landing" | "input" | "processing" | "result";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [userName, setUserName] = useState("");
  const [personality, setPersonality] = useState<SheepPersonality | null>(null);

  const handleSubmit = useCallback((name: string, traits: string[]) => {
    setUserName(name);
    const result = getSheepPersonality(name, traits);
    setPersonality(result);
    setScreen("processing");
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setScreen("result");
  }, []);

  const handleRestart = useCallback(() => {
    setScreen("landing");
    setUserName("");
    setPersonality(null);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === "landing" && <LandingScreen key="landing" onStart={() => setScreen("input")} />}
        {screen === "input" && <InputScreen key="input" onSubmit={handleSubmit} />}
        {screen === "processing" && (
          <ProcessingScreen key="processing" onComplete={handleProcessingComplete} />
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
