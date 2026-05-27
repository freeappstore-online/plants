import type { MyPlant } from "../data/types";
import {
  getWateringStatus,
  getWateringStatusLabel,
  daysSinceLastWatered,
  daysUntilWatering,
} from "../lib/watering";
import { categoryLabels, locationEmojis } from "../data";
import WateringBadge from "./WateringBadge";

interface PlantDetailViewProps {
  readonly plant: MyPlant;
  readonly onBack: () => void;
  readonly onWater: (id: string) => void;
  readonly onEdit: (plant: MyPlant) => void;
  readonly onDelete: (id: string) => void;
}

const lightLabels: Record<string, string> = {
  low: "Low light",
  medium: "Medium light",
  bright: "Bright indirect",
  direct: "Direct sun",
};

export default function PlantDetailView({
  plant,
  onBack,
  onWater,
  onEdit,
  onDelete,
}: PlantDetailViewProps) {
  const status = getWateringStatus(plant);
  const statusLabel = getWateringStatusLabel(plant);
  const daysSince = daysSinceLastWatered(plant);
  const daysUntil = daysUntilWatering(plant);

  const recentWaterings = [...plant.wateringLog]
    .reverse()
    .slice(0, 10);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium mb-4 cursor-pointer"
        style={{ background: "none", border: "none", color: "var(--accent)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div
        className="rounded-xl p-5 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{plant.emoji}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
                  {plant.nickname || plant.name}
                </h2>
                {plant.nickname && plant.nickname !== plant.name && (
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {plant.name}
                  </p>
                )}
                <p className="text-xs italic" style={{ color: "var(--muted)" }}>
                  {plant.scientificName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(plant)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
              style={{
                background: "var(--panel)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Remove this plant?")) onDelete(plant.id);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
              style={{
                background: "var(--panel)",
                color: "var(--error)",
                border: "1px solid var(--error)",
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Status + Water button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <WateringBadge status={status} label={statusLabel} />
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {daysSince !== null
                ? daysSince === 0
                  ? "Watered today"
                  : `Last watered ${daysSince} day${daysSince === 1 ? "" : "s"} ago`
                : "Never watered"}
            </span>
          </div>
          <button
            onClick={() => onWater(plant.id)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer"
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
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3c-1.5 3-6 7.5-6 11a6 6 0 0012 0c0-3.5-4.5-8-6-11z"
              />
            </svg>
            Water Now
          </button>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <InfoItem
            label="Location"
            value={`${locationEmojis[plant.location] ?? ""} ${plant.location}`}
          />
          <InfoItem
            label="Category"
            value={categoryLabels[plant.category] ?? plant.category}
          />
          <InfoItem label="Light" value={lightLabels[plant.light] ?? plant.light} />
          <InfoItem label="Watering" value={`Every ${plant.wateringDays} days`} />
          <InfoItem label="Humidity" value={plant.humidity} />
          <InfoItem label="Temperature" value={plant.temperatureRange} />
          <InfoItem label="Difficulty" value={plant.difficulty} />
          <InfoItem
            label="Acquired"
            value={new Date(plant.dateAcquired).toLocaleDateString()}
          />
          <InfoItem
            label="Next watering"
            value={
              daysUntil <= 0
                ? "Now!"
                : daysUntil === 1
                  ? "Tomorrow"
                  : `In ${daysUntil} days`
            }
          />
        </div>
      </div>

      {/* Care tips */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
          Care Tips
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          {plant.careTips}
        </p>
      </div>

      {/* Common problems */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
          Common Problems
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          {plant.commonProblems}
        </p>
      </div>

      {/* Notes */}
      {plant.notes && (
        <div
          className="rounded-xl p-4 mb-4"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
            Notes
          </h3>
          <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--muted)" }}>
            {plant.notes}
          </p>
        </div>
      )}

      {/* Watering history */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
          Watering History
        </h3>
        {recentWaterings.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            No watering logged yet.
          </p>
        ) : (
          <div className="space-y-1.5">
            {recentWaterings.map((entry, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span>
                  {new Date(entry.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
            {plant.wateringLog.length > 10 && (
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                ...and {plant.wateringLog.length - 10} more
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium mb-0.5" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="text-sm font-medium capitalize" style={{ color: "var(--ink)" }}>
        {value}
      </p>
    </div>
  );
}
