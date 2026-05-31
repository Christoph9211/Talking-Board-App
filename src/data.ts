import type { BoardPage, CommunicationTile } from "./types";

export const pageLabels: Record<BoardPage, string> = {
  communication: "Home",
  routine: "Routine",
  firstThen: "First / Then",
};

export const communicationTiles: CommunicationTile[] = [
  { id: "more", label: "more", color: "teal", icon: "spark", speakText: "more" },
  { id: "help", label: "help", color: "teal", icon: "hands", speakText: "help me" },
  { id: "stop", label: "stop", color: "coral", icon: "stop", speakText: "stop" },
  { id: "all-done", label: "all done", color: "coral", icon: "check", speakText: "all done" },
  { id: "break", label: "break", color: "lavender", icon: "pause", speakText: "I need a break" },
  { id: "eat", label: "eat", color: "yellow", icon: "food", speakText: "eat" },
  { id: "drink", label: "drink", color: "yellow", icon: "drink", speakText: "I want a drink" },
  { id: "bathroom", label: "bathroom", color: "lavender", icon: "bathroom", speakText: "bathroom" },
  { id: "yes", label: "yes", color: "green", icon: "yes", speakText: "yes" },
  { id: "no", label: "no", color: "coral", icon: "no", speakText: "no" },
  { id: "mom", label: "mom", color: "pink", icon: "mom", speakText: "mom" },
  { id: "dad", label: "dad", color: "blue", icon: "dad", speakText: "dad" },
];

export const routineTiles: CommunicationTile[] = [
  { id: "school", label: "school", color: "blue", icon: "school", speakText: "school" },
  { id: "home", label: "home", color: "green", icon: "home", speakText: "home" },
  { id: "car", label: "car", color: "blue", icon: "car", speakText: "car" },
  { id: "play", label: "play", color: "lavender", icon: "play", speakText: "play" },
  { id: "wake-up", label: "wake up", color: "yellow", icon: "sun", speakText: "wake up" },
  { id: "get-dressed", label: "get dressed", color: "blue", icon: "shirt", speakText: "get dressed" },
  { id: "bath", label: "bath", color: "lavender", icon: "bathroom", speakText: "bath" },
  { id: "bed", label: "bed", color: "lavender", icon: "bed", speakText: "bed" },
];

export const firstThenTiles = [...communicationTiles, ...routineTiles];
