import type { MyPlant, WateringEntry } from "../data/types";

const STORAGE_KEY = "plants-my-plants";

function readPlants(): MyPlant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MyPlant[];
  } catch {
    return [];
  }
}

function writePlants(plants: readonly MyPlant[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}

export function getMyPlants(): MyPlant[] {
  return readPlants();
}

export function addMyPlant(plant: MyPlant): MyPlant[] {
  const plants = readPlants();
  plants.push(plant);
  writePlants(plants);
  return plants;
}

export function updateMyPlant(
  id: string,
  updates: Partial<Omit<MyPlant, "id">>,
): MyPlant[] {
  const plants = readPlants();
  const index = plants.findIndex((p) => p.id === id);
  if (index !== -1) {
    plants[index] = { ...plants[index]!, ...updates } as MyPlant;
    writePlants(plants);
  }
  return plants;
}

export function removeMyPlant(id: string): MyPlant[] {
  const plants = readPlants().filter((p) => p.id !== id);
  writePlants(plants);
  return plants;
}

export function logWatering(plantId: string): MyPlant[] {
  const plants = readPlants();
  const index = plants.findIndex((p) => p.id === plantId);
  if (index !== -1) {
    const plant = plants[index]!;
    const entry: WateringEntry = {
      date: new Date().toISOString().split("T")[0]!,
      timestamp: Date.now(),
    };
    plants[index] = {
      ...plant,
      wateringLog: [...plant.wateringLog, entry],
    };
    writePlants(plants);
  }
  return plants;
}
