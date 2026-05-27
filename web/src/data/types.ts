export type PlantCategory =
  | "tropical"
  | "succulent"
  | "herb"
  | "flowering"
  | "fern"
  | "vine";

export type LightNeeds = "low" | "medium" | "bright" | "direct";

export type Difficulty = "easy" | "medium" | "hard";

export type Location =
  | "living room"
  | "bedroom"
  | "kitchen"
  | "balcony"
  | "office"
  | "bathroom";

export interface PlantInfo {
  readonly id: string;
  readonly name: string;
  readonly scientificName: string;
  readonly category: PlantCategory;
  readonly light: LightNeeds;
  readonly wateringDays: number; // days between watering
  readonly humidity: string;
  readonly temperatureRange: string;
  readonly difficulty: Difficulty;
  readonly careTips: string;
  readonly commonProblems: string;
  readonly emoji: string;
}

export interface MyPlant {
  readonly id: string;
  readonly plantId: string | null; // null for custom plants
  readonly name: string; // display name or nickname
  readonly nickname: string;
  readonly scientificName: string;
  readonly category: PlantCategory;
  readonly light: LightNeeds;
  readonly wateringDays: number;
  readonly humidity: string;
  readonly temperatureRange: string;
  readonly difficulty: Difficulty;
  readonly careTips: string;
  readonly commonProblems: string;
  readonly emoji: string;
  readonly location: Location;
  readonly dateAcquired: string; // ISO date string
  readonly wateringLog: readonly WateringEntry[];
  readonly notes: string;
  readonly color: string; // calendar color
}

export interface WateringEntry {
  readonly date: string; // ISO date string
  readonly timestamp: number;
}

export type WateringStatus = "watered" | "due-soon" | "overdue";

export interface SeasonalTip {
  readonly season: "spring" | "summer" | "fall" | "winter";
  readonly title: string;
  readonly tips: readonly string[];
  readonly emoji: string;
}
