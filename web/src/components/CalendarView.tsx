import { useState, useMemo } from "react";
import type { MyPlant } from "../data/types";
import { getCalendarDays, getMonthName } from "../lib/calendar";

interface CalendarViewProps {
  readonly plants: readonly MyPlant[];
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView({ plants }: CalendarViewProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const days = useMemo(
    () => getCalendarDays(year, month, plants),
    [year, month, plants],
  );

  const goBack = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goForward = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  return (
    <div>
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold" style={{ color: "var(--ink)" }}>
            {getMonthName(month)} {year}
          </h3>
          <button
            onClick={goToday}
            className="text-xs px-2 py-0.5 rounded cursor-pointer"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              color: "var(--muted)",
            }}
          >
            Today
          </button>
        </div>
        <button
          onClick={goForward}
          className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      {plants.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {plants.map((p) => (
            <div key={p.id} className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: p.color }}
              />
              <span>{p.nickname || p.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-px mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium py-1"
            style={{ color: "var(--muted)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className="grid grid-cols-7 gap-px rounded-lg overflow-hidden"
        style={{ background: "var(--line)" }}
      >
        {days.map((day, i) => (
          <div
            key={i}
            className="relative min-h-[3.5rem] p-1"
            style={{
              background: day.isToday
                ? "var(--accent-light)"
                : day.isCurrentMonth
                  ? "var(--paper)"
                  : "var(--panel)",
            }}
          >
            <span
              className="text-xs font-medium"
              style={{
                color: day.isToday
                  ? "var(--accent)"
                  : day.isCurrentMonth
                    ? "var(--ink)"
                    : "var(--muted)",
              }}
            >
              {day.date.getDate()}
            </span>
            {day.plantDots.length > 0 && (
              <div className="flex flex-wrap gap-0.5 mt-0.5">
                {day.plantDots.slice(0, 4).map((dot, j) => (
                  <span
                    key={j}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: dot.color,
                      opacity: dot.watered ? 1 : 0.4,
                    }}
                    title={
                      dot.watered ? "Watered" : "Scheduled"
                    }
                  />
                ))}
                {day.plantDots.length > 4 && (
                  <span
                    className="text-xs leading-none"
                    style={{ color: "var(--muted)", fontSize: "8px" }}
                  >
                    +{day.plantDots.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "var(--muted)" }}>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent)", opacity: 1 }}
          />
          Watered
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent)", opacity: 0.4 }}
          />
          Scheduled
        </div>
      </div>
    </div>
  );
}
