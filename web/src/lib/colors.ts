/** Predefined plant colors for calendar dots. */
const PLANT_COLORS = [
  "#16a34a", // green-600
  "#2563eb", // blue-600
  "#d97706", // amber-600
  "#dc2626", // red-600
  "#7c3aed", // violet-600
  "#0891b2", // cyan-600
  "#ea580c", // orange-600
  "#db2777", // pink-600
  "#65a30d", // lime-600
  "#0d9488", // teal-600
  "#4f46e5", // indigo-600
  "#ca8a04", // yellow-600
  "#9333ea", // purple-600
  "#059669", // emerald-600
  "#e11d48", // rose-600
  "#0284c7", // sky-600
];

let _nextColorIndex = 0;

/** Get the next plant color from the palette. */
export function getNextPlantColor(): string {
  const color = PLANT_COLORS[_nextColorIndex % PLANT_COLORS.length]!;
  _nextColorIndex++;
  return color;
}

/** Reset color index (for testing or fresh start). */
export function resetColorIndex(index: number): void {
  _nextColorIndex = index;
}
