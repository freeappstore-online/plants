import type { PlantInfo } from "../data/types";
import { categoryLabels } from "../data";

interface PlantDatabaseCardProps {
  readonly plant: PlantInfo;
  readonly onAdd: (plant: PlantInfo) => void;
  readonly onViewDetail: (plant: PlantInfo) => void;
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

export default function PlantDatabaseCard({
  plant,
  onAdd,
  onViewDetail,
}: PlantDatabaseCardProps) {
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
      }}
      onClick={() => onViewDetail(plant)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onViewDetail(plant);
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{plant.emoji}</span>
            <h3
              className="text-sm font-bold truncate"
              style={{ color: "var(--ink)" }}
            >
              {plant.name}
            </h3>
          </div>
          <p
            className="text-xs italic mb-2 truncate"
            style={{ color: "var(--muted)" }}
          >
            {plant.scientificName}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
              }}
            >
              {categoryLabels[plant.category] ?? plant.category}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--panel)",
                color: "var(--muted)",
                border: "1px solid var(--line)",
              }}
            >
              {lightLabels[plant.light] ?? plant.light}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--panel)",
                color: difficultyColors[plant.difficulty] ?? "var(--muted)",
                border: `1px solid ${difficultyColors[plant.difficulty] ?? "var(--line)"}40`,
              }}
            >
              {plant.difficulty}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(plant);
          }}
          className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
