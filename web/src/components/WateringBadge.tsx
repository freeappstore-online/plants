import type { WateringStatus } from "../data/types";

interface WateringBadgeProps {
  readonly status: WateringStatus;
  readonly label: string;
}

const statusColors: Record<
  WateringStatus,
  { bg: string; text: string; border: string }
> = {
  watered: {
    bg: "var(--success)",
    text: "#fff",
    border: "var(--success)",
  },
  "due-soon": {
    bg: "var(--warning)",
    text: "#fff",
    border: "var(--warning)",
  },
  overdue: {
    bg: "var(--error)",
    text: "#fff",
    border: "var(--error)",
  },
};

export default function WateringBadge({ status, label }: WateringBadgeProps) {
  const colors = statusColors[status];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
      style={{
        background: `${colors.bg}20`,
        color: colors.text === "#fff" ? colors.bg : colors.text,
        border: `1px solid ${colors.border}40`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5"
        style={{ background: colors.bg }}
      />
      {label}
    </span>
  );
}
