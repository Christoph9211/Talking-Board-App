export type CategoryId = "core" | "feelings" | "food" | "places" | "routine";

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
  category: CategoryId;
  color: string;
  icon: IconName;
  speakText: string;
}

export interface RoutineItem {
  id: string;
  label: string;
  icon: IconName;
}

export interface Phrase {
  id: string;
  label: string;
  text: string;
}
