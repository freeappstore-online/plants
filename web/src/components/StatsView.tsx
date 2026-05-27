import type { MyPlant } from "../data/types";
import { getPlantStats, getHealthBreakdown } from "../lib/watering";

interface StatsViewProps {
  readonly plants: readonly MyPlant[];
}

export default function StatsView({ plants }: StatsViewProps) {
  const stats = getPlantStats(plants);
  const health = getHealthBreakdown(plants);

  if (plants.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-xl"
        style={{ background: "var(--panel)" }}
      >
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          No stats yet
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          Add some plants to start tracking your care stats
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Plants"
          value={stats.totalPlants.toString()}
          emoji="🌱"
          color="var(--accent)"
        />
        <StatCard
          label="Total Waterings"
          value={stats.totalWaterings.toString()}
          emoji="💧"
          color="#2563eb"
        />
        <StatCard
          label="Healthy"
          value={health.healthy.toString()}
          emoji="✅"
          color="var(--success)"
        />
        <StatCard
          label="Needs Attention"
          value={health.needsAttention.toString()}
          emoji="⚠️"
          color="var(--warning)"
        />
      </div>

      {/* Health bar */}
      {plants.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "var(--ink)" }}>
            Health Overview
          </h3>
          <div
            className="h-3 rounded-full overflow-hidden flex"
            style={{ background: "var(--line)" }}
          >
            {health.healthy > 0 && (
              <div
                className="h-full"
                style={{
                  background: "var(--success)",
                  width: `${(health.healthy / plants.length) * 100}%`,
                }}
              />
            )}
            {health.needsAttention > 0 && (
              <div
                className="h-full"
                style={{
                  background: "var(--warning)",
                  width: `${(health.needsAttention / plants.length) * 100}%`,
                }}
              />
            )}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: "var(--success)" }}>
              {Math.round((health.healthy / plants.length) * 100)}% healthy
            </span>
            <span className="text-xs" style={{ color: "var(--warning)" }}>
              {Math.round((health.needsAttention / plants.length) * 100)}% needs attention
            </span>
          </div>
        </div>
      )}

      {/* MVP plants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stats.mostConsistent && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🏆</span>
              <h3
                className="text-xs font-medium"
                style={{ color: "var(--muted)" }}
              >
                Most Consistent
              </h3>
            </div>
            <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
              {stats.mostConsistent.emoji}{" "}
              {stats.mostConsistent.nickname || stats.mostConsistent.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {stats.mostConsistent.wateringLog.length} waterings logged
            </p>
          </div>
        )}
        {stats.mostNeglected && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">😢</span>
              <h3
                className="text-xs font-medium"
                style={{ color: "var(--muted)" }}
              >
                Most Neglected
              </h3>
            </div>
            <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
              {stats.mostNeglected.emoji}{" "}
              {stats.mostNeglected.nickname || stats.mostNeglected.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {stats.mostNeglected.wateringLog.length} waterings logged
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  emoji,
  color,
}: {
  readonly label: string;
  readonly value: string;
  readonly emoji: string;
  readonly color: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{emoji}</span>
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
