import { useState } from "react";
import type {
  PlantInfo,
  MyPlant,
  PlantCategory,
  LightNeeds,
  Difficulty,
  Location,
} from "../data/types";
import { getNextPlantColor } from "../lib/colors";

interface AddPlantModalProps {
  readonly plant: PlantInfo | null; // null for custom plant
  readonly onAdd: (plant: MyPlant) => void;
  readonly onClose: () => void;
}

const locations: Location[] = [
  "living room",
  "bedroom",
  "kitchen",
  "balcony",
  "office",
  "bathroom",
];

const categories: PlantCategory[] = [
  "tropical",
  "succulent",
  "herb",
  "flowering",
  "fern",
  "vine",
];

const lightOptions: LightNeeds[] = ["low", "medium", "bright", "direct"];
const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

export default function AddPlantModal({
  plant,
  onAdd,
  onClose,
}: AddPlantModalProps) {
  const isCustom = plant === null;

  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState<Location>("living room");
  const [dateAcquired, setDateAcquired] = useState(
    new Date().toISOString().split("T")[0]!,
  );
  const [wateringOverride, setWateringOverride] = useState(
    plant?.wateringDays.toString() ?? "7",
  );
  const [notes, setNotes] = useState("");

  // Custom plant fields
  const [customName, setCustomName] = useState("");
  const [customScientific, setCustomScientific] = useState("");
  const [customCategory, setCustomCategory] = useState<PlantCategory>("tropical");
  const [customLight, setCustomLight] = useState<LightNeeds>("medium");
  const [customDifficulty, setCustomDifficulty] = useState<Difficulty>("easy");
  const [customHumidity, setCustomHumidity] = useState("Medium (40-60%)");
  const [customTemp, setCustomTemp] = useState("15-27°C (60-80°F)");
  const [customTips, setCustomTips] = useState("");
  const [customProblems, setCustomProblems] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = isCustom ? customName : plant.name;
    if (!name.trim()) return;

    const waterDays = parseInt(wateringOverride, 10) || 7;

    const newPlant: MyPlant = {
      id: crypto.randomUUID(),
      plantId: plant?.id ?? null,
      name: isCustom ? customName : plant.name,
      nickname: nickname || (isCustom ? customName : plant.name),
      scientificName: isCustom ? customScientific : plant.scientificName,
      category: isCustom ? customCategory : plant.category,
      light: isCustom ? customLight : plant.light,
      wateringDays: waterDays,
      humidity: isCustom ? customHumidity : plant.humidity,
      temperatureRange: isCustom ? customTemp : plant.temperatureRange,
      difficulty: isCustom ? customDifficulty : plant.difficulty,
      careTips: isCustom ? customTips : plant.careTips,
      commonProblems: isCustom ? customProblems : plant.commonProblems,
      emoji: isCustom ? "🌱" : plant.emoji,
      location,
      dateAcquired,
      wateringLog: [],
      notes,
      color: getNextPlantColor(),
    };

    onAdd(newPlant);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl p-5"
        style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--ink)" }}>
            {isCustom ? "Add Custom Plant" : `Add ${plant.name}`}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              background: "var(--panel)",
              border: "none",
              color: "var(--muted)",
            }}
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isCustom && (
            <>
              <Field label="Plant Name *">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Monstera"
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
              <Field label="Scientific Name">
                <input
                  type="text"
                  value={customScientific}
                  onChange={(e) => setCustomScientific(e.target.value)}
                  placeholder="e.g. Monstera deliciosa"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select
                    value={customCategory}
                    onChange={(e) =>
                      setCustomCategory(e.target.value as PlantCategory)
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Light Needs">
                  <select
                    value={customLight}
                    onChange={(e) =>
                      setCustomLight(e.target.value as LightNeeds)
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    {lightOptions.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Difficulty">
                <select
                  value={customDifficulty}
                  onChange={(e) =>
                    setCustomDifficulty(e.target.value as Difficulty)
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                >
                  {difficultyOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Humidity">
                <input
                  type="text"
                  value={customHumidity}
                  onChange={(e) => setCustomHumidity(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
              <Field label="Temperature Range">
                <input
                  type="text"
                  value={customTemp}
                  onChange={(e) => setCustomTemp(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
              <Field label="Care Tips">
                <textarea
                  value={customTips}
                  onChange={(e) => setCustomTips(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none resize-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
              <Field label="Common Problems">
                <textarea
                  value={customProblems}
                  onChange={(e) => setCustomProblems(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none resize-none"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                />
              </Field>
            </>
          )}

          <Field label="Nickname">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={isCustom ? "Optional nickname" : plant.name}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
          </Field>

          <Field label="Location">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as Location)}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            >
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Date Acquired">
            <input
              type="date"
              value={dateAcquired}
              onChange={(e) => setDateAcquired(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
          </Field>

          <Field
            label={`Watering Schedule (every N days${!isCustom ? `, default ${plant.wateringDays}` : ""})`}
          >
            <input
              type="number"
              min={1}
              max={60}
              value={wateringOverride}
              onChange={(e) => setWateringOverride(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
          </Field>

          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this plant..."
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg outline-none resize-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
          </Field>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium rounded-lg cursor-pointer"
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
            }}
          >
            Add Plant
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium mb-1"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
