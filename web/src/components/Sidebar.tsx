type NavTab =
  | "dashboard"
  | "my-plants"
  | "database"
  | "calendar"
  | "stats";

interface SidebarProps {
  readonly activeTab: NavTab;
  readonly onTabChange: (tab: NavTab) => void;
  readonly plantCount: number;
}

const tabs: { id: NavTab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "my-plants", label: "My Plants", icon: "🌱" },
  { id: "database", label: "Plant Database", icon: "📚" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "stats", label: "Stats", icon: "📊" },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  plantCount,
}: SidebarProps) {
  return (
    <aside
      className="w-56 h-screen flex flex-col shrink-0"
      style={{
        background: "var(--panel)",
        borderRight: "1px solid var(--line)",
      }}
    >
      {/* Logo */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🪴</span>
          <div>
            <h1 className="text-sm font-bold" style={{ color: "var(--ink)" }}>
              Plant Care
            </h1>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {plantCount} plant{plantCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg cursor-pointer text-left"
            style={{
              background:
                activeTab === tab.id ? "var(--accent-light)" : "transparent",
              color: activeTab === tab.id ? "var(--accent)" : "var(--muted)",
              border: "none",
            }}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-3 text-xs"
        style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
      >
        Plant Care — FreeAppStore
      </div>
    </aside>
  );
}
