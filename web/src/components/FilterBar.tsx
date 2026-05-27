import type { Location, LightNeeds, WateringStatus } from "../data/types";

type FilterType = "all" | "location" | "light" | "status";

interface FilterBarProps {
  readonly filterType: FilterType;
  readonly filterValue: string;
  readonly onFilterTypeChange: (type: FilterType) => void;
  readonly onFilterValueChange: (value: string) => void;
}

const locations: Location[] = [
  "living room",
  "bedroom",
  "kitchen",
  "balcony",
  "office",
  "bathroom",
];

const lightLevels: LightNeeds[] = ["low", "medium", "bright", "direct"];
const statusOptions: WateringStatus[] = ["watered", "due-soon", "overdue"];

const statusLabels: Record<string, string> = {
  watered: "Recently Watered",
  "due-soon": "Due Soon",
  overdue: "Overdue",
};

export default function FilterBar({
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
}: FilterBarProps) {
  const filterOptions =
    filterType === "location"
      ? locations
      : filterType === "light"
        ? lightLevels
        : filterType === "status"
          ? statusOptions
          : [];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--line)" }}>
        {(["all", "location", "light", "status"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              onFilterTypeChange(type);
              onFilterValueChange("");
            }}
            className="px-3 py-1.5 text-xs font-medium cursor-pointer"
            style={{
              background: filterType === type ? "var(--accent)" : "var(--panel)",
              color: filterType === type ? "#fff" : "var(--muted)",
              border: "none",
            }}
          >
            {type === "all"
              ? "All"
              : type === "location"
                ? "Location"
                : type === "light"
                  ? "Light"
                  : "Status"}
          </button>
        ))}
      </div>

      {filterType !== "all" && (
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() =>
                onFilterValueChange(filterValue === opt ? "" : opt)
              }
              className="px-2.5 py-1 text-xs rounded-full cursor-pointer"
              style={{
                background:
                  filterValue === opt ? "var(--accent-light)" : "var(--panel)",
                color: filterValue === opt ? "var(--accent)" : "var(--muted)",
                border: `1px solid ${filterValue === opt ? "var(--accent)" : "var(--line)"}`,
              }}
            >
              {filterType === "status" ? (statusLabels[opt] ?? opt) : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
