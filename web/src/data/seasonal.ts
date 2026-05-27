import type { SeasonalTip } from "./types";

export const seasonalTips: readonly SeasonalTip[] = [
  {
    season: "spring",
    title: "Spring Awakening",
    emoji: "🌱",
    tips: [
      "Increase watering frequency as plants enter their active growing season.",
      "Start fertilizing with a balanced houseplant fertilizer every 2-4 weeks.",
      "Repot root-bound plants into slightly larger containers with fresh soil.",
      "Prune leggy winter growth to encourage compact spring development.",
      "Move light-loving plants closer to windows as days get longer.",
    ],
  },
  {
    season: "summer",
    title: "Summer Care",
    emoji: "☀️",
    tips: [
      "Water more frequently as heat and light increase evaporation.",
      "Move sensitive plants away from intense afternoon sun to prevent scorching.",
      "Mist tropical plants regularly or use pebble trays to boost humidity.",
      "Watch for pests — spider mites and mealybugs are most active in warm months.",
      "Take cuttings for propagation — summer warmth helps roots develop faster.",
    ],
  },
  {
    season: "fall",
    title: "Fall Preparation",
    emoji: "🍂",
    tips: [
      "Gradually reduce watering as plant growth slows with shorter days.",
      "Stop fertilizing most plants by mid-fall to prepare for dormancy.",
      "Bring outdoor plants inside before nighttime temperatures drop below 10°C (50°F).",
      "Clean leaves to maximize light absorption during shorter days.",
      "Check for hitchhiking pests on plants coming indoors from outside.",
    ],
  },
  {
    season: "winter",
    title: "Winter Survival",
    emoji: "❄️",
    tips: [
      "Water less frequently — most plants need 50% less water in winter.",
      "Keep plants away from cold drafts, heating vents, and radiators.",
      "Group plants together to create a micro-humidity environment.",
      "Don't repot or fertilize — let plants rest during their dormant period.",
      "Supplement with a grow light if natural light drops below 6 hours daily.",
    ],
  },
];

export function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "fall";
  return "winter";
}

export function getCurrentSeasonalTip(): SeasonalTip {
  const season = getCurrentSeason();
  return seasonalTips.find((t) => t.season === season) ?? seasonalTips[0]!;
}
