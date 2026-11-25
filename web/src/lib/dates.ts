/** Format a Date as the local calendar day, YYYY-MM-DD. */
export function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Today's local calendar day, YYYY-MM-DD. */
export function todayStr(): string {
  return formatDateStr(new Date());
}

/** Parse a YYYY-MM-DD string as local midnight (new Date(str) would be UTC midnight). */
export function parseDateStr(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}
