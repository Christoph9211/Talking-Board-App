export type BoardPage = "communication" | "routine" | "firstThen";

export type IconName =
  | "spark"
  | "hands"
  | "stop"
  | "check"
  | "pause"
  | "food"
  | "drink"
  | "bathroom"
  | "yes"
  | "no"
  | "mom"
  | "dad"
  | "school"
  | "home"
  | "car"
  | "sun"
  | "shirt"
  | "play"
  | "bed"
  | "heart"
  | "map"
  | "grid";

export interface CommunicationTile {
  id: string;
  label: string;
  color: string;
  icon: IconName;
  speakText: string;
}
