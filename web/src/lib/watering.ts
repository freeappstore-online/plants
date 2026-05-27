import type { MyPlant, WateringStatus } from "../data/types";

/** Returns days since the plant was last watered, or null if never watered. */
export function daysSinceLastWatered(plant: MyPlant): number | null {
  if (plant.wateringLog.length === 0) return null;
  const lastEntry = plant.wateringLog[plant.wateringLog.length - 1];
  if (!lastEntry) return null;
  const lastDate = new Date(lastEntry.date);
  const now = new Date();
  const diffMs = now.getTime() - lastDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/** Returns the date when next watering is due. */
export function nextWateringDate(plant: MyPlant): Date {
  if (plant.wateringLog.length === 0) {
    // If never watered, assume it needs watering now
    return new Date();
  }
  const lastEntry = plant.wateringLog[plant.wateringLog.length - 1];
  if (!lastEntry) return new Date();
  const lastDate = new Date(lastEntry.date);
  const next = new Date(lastDate);
  next.setDate(next.getDate() + plant.wateringDays);
  return next;
}

/** Returns days until next watering (negative means overdue). */
export function daysUntilWatering(plant: MyPlant): number {
  const next = nextWateringDate(plant);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  next.setHours(0, 0, 0, 0);
  const diffMs = next.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/** Returns the watering status based on schedule. */
export function getWateringStatus(plant: MyPlant): WateringStatus {
  const daysLeft = daysUntilWatering(plant);
  if (daysLeft < 0) return "overdue";
  if (daysLeft <= 1) return "due-soon";
  return "watered";
}

/** Returns a human-readable string for the watering status. */
export function getWateringStatusLabel(plant: MyPlant): string {
  const daysLeft = daysUntilWatering(plant);
  if (daysLeft < 0) {
    const overdue = Math.abs(daysLeft);
    return overdue === 1 ? "1 day overdue" : `${overdue} days overdue`;
  }
  if (daysLeft === 0) return "Due today";
  if (daysLeft === 1) return "Due tomorrow";
  return `Due in ${daysLeft} days`;
}

/** Sort plants by watering urgency (most urgent first). */
export function sortByWateringUrgency(plants: readonly MyPlant[]): MyPlant[] {
  return [...plants].sort(
    (a, b) => daysUntilWatering(a) - daysUntilWatering(b),
  );
}

/** Get plants that need watering today (overdue or due today). */
export function getPlantsNeedingWater(
  plants: readonly MyPlant[],
): MyPlant[] {
  return plants.filter((p) => daysUntilWatering(p) <= 0);
}

/** Get plants due this week (next 7 days). */
export function getPlantsDueThisWeek(
  plants: readonly MyPlant[],
): MyPlant[] {
  return plants.filter((p) => {
    const days = daysUntilWatering(p);
    return days > 0 && days <= 7;
  });
}

/** Get count of healthy (recently watered) vs needs-attention plants. */
export function getHealthBreakdown(plants: readonly MyPlant[]): {
  healthy: number;
  needsAttention: number;
} {
  let healthy = 0;
  let needsAttention = 0;
  for (const p of plants) {
    const status = getWateringStatus(p);
    if (status === "watered") {
      healthy++;
    } else {
      needsAttention++;
    }
  }
  return { healthy, needsAttention };
}

/** Get stats about plant care. */
export function getPlantStats(plants: readonly MyPlant[]): {
  totalPlants: number;
  totalWaterings: number;
  mostConsistent: MyPlant | null;
  mostNeglected: MyPlant | null;
} {
  const totalPlants = plants.length;
  let totalWaterings = 0;
  let mostConsistent: MyPlant | null = null;
  let mostNeglected: MyPlant | null = null;
  let bestConsistency = -Infinity;
  let worstDays = -Infinity;

  for (const p of plants) {
    totalWaterings += p.wateringLog.length;

    // Most consistent = most waterings relative to expected
    if (p.wateringLog.length > 0) {
      const acquired = new Date(p.dateAcquired);
      const now = new Date();
      const daysSinceAcquired = Math.max(
        1,
        Math.floor(
          (now.getTime() - acquired.getTime()) / (1000 * 60 * 60 * 24),
        ),
      );
      const expectedWaterings = daysSinceAcquired / p.wateringDays;
      const consistency =
        expectedWaterings > 0
          ? p.wateringLog.length / expectedWaterings
          : 0;
      if (consistency > bestConsistency) {
        bestConsistency = consistency;
        mostConsistent = p;
      }
    }

    // Most neglected = most days overdue
    const overdueDays = -daysUntilWatering(p);
    if (overdueDays > worstDays) {
      worstDays = overdueDays;
      mostNeglected = p;
    }
  }

  return { totalPlants, totalWaterings, mostConsistent, mostNeglected };
}
