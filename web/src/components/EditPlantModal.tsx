import { useState } from "react";
import type { MyPlant, Location } from "../data/types";

interface EditPlantModalProps {
  readonly plant: MyPlant;
  readonly onSave: (id: string, updates: Partial<MyPlant>) => void;
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

export default function EditPlantModal({
  plant,
  onSave,
  onClose,
}: EditPlantModalProps) {
  const [nickname, setNickname] = useState(plant.nickname);
  const [location, setLocation] = useState<Location>(plant.location);
  const [wateringDays, setWateringDays] = useState(
    plant.wateringDays.toString(),
  );
  const [notes, setNotes] = useState(plant.notes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(plant.id, {
      nickname: nickname || plant.name,
      location,
      wateringDays: parseInt(wateringDays, 10) || plant.wateringDays,
      notes,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl p-5"
        style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--ink)" }}>
            Edit {plant.name}
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
          <Field label="Nickname">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={plant.name}
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

          <Field label="Watering Schedule (every N days)">
            <input
              type="number"
              min={1}
              max={60}
              value={wateringDays}
              onChange={(e) => setWateringDays(e.target.value)}
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
              placeholder="Any notes..."
              rows={3}
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
            Save Changes
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
