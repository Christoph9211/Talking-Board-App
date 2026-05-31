import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useSpeech() {
  const [enabled, setEnabled] = useLocalStorage("talking-board.voice-enabled", true);

  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  return useMemo(() => {
    const cancel = () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };

    const speak = (text: string) => {
      if (!supported || !enabled || !text.trim()) {
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.86;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    };

    return {
      speak,
      cancel,
      supported,
      enabled,
      setEnabled,
    };
  }, [enabled, setEnabled, supported]);
}
