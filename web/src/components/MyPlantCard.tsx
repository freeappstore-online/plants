import type { MyPlant } from "../data/types";
import {
  getWateringStatus,
  getWateringStatusLabel,
  daysSinceLastWatered,
} from "../lib/watering";
import { locationEmojis } from "../data";
import WateringBadge from "./WateringBadge";

interface MyPlantCardProps {
  readonly plant: MyPlant;
  readonly onWater: (id: string) => void;
  readonly onSelect: (plant: MyPlant) => void;
}

export default function MyPlantCard({
  plant,
  onWater,
  onSelect,
}: MyPlantCardProps) {
  const status = getWateringStatus(plant);
  const statusLabel = getWateringStatusLabel(plant);
  const daysSince = daysSinceLastWatered(plant);

  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all"
      style={{
        background: "var(--panel)",
        border: `1px solid ${status === "overdue" ? "var(--error)" : status === "due-soon" ? "var(--warning)" : "var(--line)"}`,
      }}
      onClick={() => onSelect(plant)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(plant);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{plant.emoji}</span>
            <div className="min-w-0">
              <h3
                className="text-sm font-bold truncate"
                style={{ color: "var(--ink)" }}
              >
                {plant.nickname || plant.name}
              </h3>
              {plant.nickname && plant.nickname !== plant.name && (
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--muted)" }}
                >
                  {plant.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {locationEmojis[plant.location] ?? ""} {plant.location}
            </span>
            <span style={{ color: "var(--line-strong)" }}>&middot;</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {daysSince !== null
                ? daysSince === 0
                  ? "Watered today"
                  : `${daysSince}d ago`
                : "Never watered"}
            </span>
          </div>
          <div className="mt-2">
            <WateringBadge status={status} label={statusLabel} />
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWater(plant.id);
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer"
          style={{
            background:
              status === "overdue"
                ? "var(--error)"
                : status === "due-soon"
                  ? "var(--warning)"
                  : "var(--accent)",
            color: "#fff",
            border: "none",
          }}
          title="Mark as watered"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3c-1.5 3-6 7.5-6 11a6 6 0 0012 0c0-3.5-4.5-8-6-11z"
            />
          </svg>
          Water
        </button>
      </div>
    </div>
  );
}
