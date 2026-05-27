import type { SeasonalTip } from "../data/types";

interface SeasonalTipCardProps {
  readonly tip: SeasonalTip;
}

export default function SeasonalTipCard({ tip }: SeasonalTipCardProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{tip.emoji}</span>
        <h3 className="text-sm font-bold" style={{ color: "var(--ink)" }}>
          {tip.title}
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full ml-auto"
          style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
          }}
        >
          {tip.season}
        </span>
      </div>
      <ul className="space-y-1.5">
        {tip.tips.map((text, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs"
            style={{ color: "var(--muted)" }}
          >
            <span style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0">
              &bull;
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
