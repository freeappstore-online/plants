import type { MyPlant } from "../data/types";

export interface CalendarDay {
  readonly date: Date;
  readonly dateStr: string;
  readonly isCurrentMonth: boolean;
  readonly isToday: boolean;
  readonly plantDots: readonly { plantId: string; color: string; watered: boolean }[];
}

/** Generate calendar days for a given month. */
export function getCalendarDays(
  year: number,
  month: number, // 0-indexed
  plants: readonly MyPlant[],
): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay(); // 0=Sun
  const totalDays = lastDay.getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = formatDateStr(today);

  const days: CalendarDay[] = [];

  // Previous month padding
  for (let i = startPad - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push(buildDay(d, false, todayStr, plants));
  }

  // Current month
  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(year, month, i);
    days.push(buildDay(d, true, todayStr, plants));
  }

  // Next month padding to fill 6 rows
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push(buildDay(d, false, todayStr, plants));
  }

  return days;
}

function buildDay(
  date: Date,
  isCurrentMonth: boolean,
  todayStr: string,
  plants: readonly MyPlant[],
): CalendarDay {
  const dateStr = formatDateStr(date);
  const isToday = dateStr === todayStr;

  const plantDots: { plantId: string; color: string; watered: boolean }[] = [];

  for (const plant of plants) {
    // Check if this date has a watering logged
    const watered = plant.wateringLog.some((w) => w.date === dateStr);

    // Check if this date is a scheduled watering day
    const isScheduled = isScheduledWateringDay(plant, date);

    if (watered || isScheduled) {
      plantDots.push({
        plantId: plant.id,
        color: plant.color,
        watered,
      });
    }
  }

  return { date, dateStr, isCurrentMonth, isToday, plantDots };
}

function isScheduledWateringDay(plant: MyPlant, date: Date): boolean {
  // Find the last watering date or use date acquired
  let baseDate: Date;
  if (plant.wateringLog.length > 0) {
    const lastEntry = plant.wateringLog[plant.wateringLog.length - 1];
    if (!lastEntry) return false;
    baseDate = new Date(lastEntry.date);
  } else {
    baseDate = new Date(plant.dateAcquired);
  }

  baseDate.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  if (target < baseDate) return false;

  const diffDays = Math.round(
    (target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays > 0 && diffDays % plant.wateringDays === 0;
}

function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getMonthName(month: number): string {
  const names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return names[month] ?? "";
}
