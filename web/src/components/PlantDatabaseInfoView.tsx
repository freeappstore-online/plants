import type { PlantInfo } from "../data/types";
import { categoryLabels } from "../data";

interface PlantDatabaseInfoViewProps {
  readonly plant: PlantInfo;
  readonly onBack: () => void;
  readonly onAdd: (plant: PlantInfo) => void;
}

const lightLabels: Record<string, string> = {
  low: "Low light",
  medium: "Medium light",
  bright: "Bright indirect",
  direct: "Direct sun",
};

const difficultyColors: Record<string, string> = {
  easy: "var(--success)",
  medium: "var(--warning)",
  hard: "var(--error)",
};

export default function PlantDatabaseInfoView({
  plant,
  onBack,
  onAdd,
}: PlantDatabaseInfoViewProps) {
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
        Back to Database
      </button>

      <div
        className="rounded-xl p-5 mb-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{plant.emoji}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
                  {plant.name}
                </h2>
                <p className="text-sm italic" style={{ color: "var(--muted)" }}>
                  {plant.scientificName}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onAdd(plant)}
            className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer"
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
            }}
          >
            + Add to My Plants
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: "var(--accent-light)",
              color: "var(--accent)",
            }}
          >
            {categoryLabels[plant.category] ?? plant.category}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: "var(--panel)",
              color: "var(--muted)",
              border: "1px solid var(--line)",
            }}
          >
            {lightLabels[plant.light] ?? plant.light}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              color: difficultyColors[plant.difficulty] ?? "var(--muted)",
              background: "var(--panel)",
              border: `1px solid ${difficultyColors[plant.difficulty] ?? "var(--line)"}40`,
            }}
          >
            {plant.difficulty}
          </span>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <InfoItem label="Watering" value={`Every ${plant.wateringDays} days`} />
          <InfoItem label="Light" value={lightLabels[plant.light] ?? plant.light} />
          <InfoItem label="Humidity" value={plant.humidity} />
          <InfoItem label="Temperature" value={plant.temperatureRange} />
          <InfoItem label="Difficulty" value={plant.difficulty} />
          <InfoItem
            label="Category"
            value={categoryLabels[plant.category] ?? plant.category}
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
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {plant.careTips}
        </p>
      </div>

      {/* Common problems */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
          Common Problems
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {plant.commonProblems}
        </p>
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
