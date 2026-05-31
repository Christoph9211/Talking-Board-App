import type { CategoryId, CommunicationTile, IconName, Phrase, RoutineItem } from "./types";

export const categoryMeta: Record<CategoryId, { label: string; icon: IconName }> = {
  core: { label: "Core", icon: "grid" },
  feelings: { label: "Feelings", icon: "heart" },
  food: { label: "Food", icon: "food" },
  places: { label: "Places", icon: "map" },
  routine: { label: "Routine", icon: "sun" },
};

export const tiles: CommunicationTile[] = [
  { id: "more", label: "more", category: "core", color: "teal", icon: "spark", speakText: "more" },
  { id: "help", label: "help", category: "core", color: "teal", icon: "hands", speakText: "help" },
  { id: "stop", label: "stop", category: "core", color: "coral", icon: "stop", speakText: "stop" },
  { id: "all-done", label: "all done", category: "core", color: "coral", icon: "check", speakText: "all done" },
  { id: "break", label: "break", category: "feelings", color: "lavender", icon: "pause", speakText: "break" },
  { id: "eat", label: "eat", category: "food", color: "yellow", icon: "food", speakText: "eat" },
  { id: "drink", label: "drink", category: "food", color: "yellow", icon: "drink", speakText: "drink" },
  { id: "bathroom", label: "bathroom", category: "routine", color: "lavender", icon: "bathroom", speakText: "bathroom" },
  { id: "yes", label: "yes", category: "core", color: "green", icon: "yes", speakText: "yes" },
  { id: "no", label: "no", category: "core", color: "coral", icon: "no", speakText: "no" },
  { id: "mom", label: "mom", category: "places", color: "pink", icon: "mom", speakText: "mom" },
  { id: "dad", label: "dad", category: "places", color: "blue", icon: "dad", speakText: "dad" },
  { id: "school", label: "school", category: "places", color: "blue", icon: "school", speakText: "school" },
  { id: "home", label: "home", category: "places", color: "green", icon: "home", speakText: "home" },
  { id: "car", label: "car", category: "places", color: "blue", icon: "car", speakText: "car" },
];

export const routineItems: RoutineItem[] = [
  { id: "wake-up", label: "wake up", icon: "sun" },
  { id: "eat", label: "eat", icon: "food" },
  { id: "get-dressed", label: "get dressed", icon: "shirt" },
  { id: "school", label: "school", icon: "school" },
  { id: "car", label: "car", icon: "car" },
  { id: "play", label: "play", icon: "play" },
  { id: "bath", label: "bath", icon: "bathroom" },
  { id: "bed", label: "bed", icon: "bed" },
];

export const phrases: Phrase[] = [
  { id: "stay", label: "Stop. Stay with me.", text: "Stop. Stay with me." },
  { id: "first-shoes", label: "First shoes, then car.", text: "First shoes, then car." },
  { id: "help", label: "I need help.", text: "I need help." },
  { id: "done", label: "All done.", text: "All done." },
];
