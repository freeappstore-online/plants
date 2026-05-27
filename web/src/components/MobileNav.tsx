type NavTab =
  | "dashboard"
  | "my-plants"
  | "database"
  | "calendar"
  | "stats";

interface MobileNavProps {
  readonly activeTab: NavTab;
  readonly onTabChange: (tab: NavTab) => void;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly plantCount: number;
}

const tabs: { id: NavTab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "my-plants", label: "My Plants", icon: "🌱" },
  { id: "database", label: "Plant Database", icon: "📚" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "stats", label: "Stats", icon: "📊" },
];

export default function MobileNav({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  plantCount,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 lg:hidden"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="w-64 h-full flex flex-col"
        style={{
          background: "var(--panel)",
          borderRight: "1px solid var(--line)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪴</span>
            <div>
              <h1
                className="text-sm font-bold"
                style={{ color: "var(--ink)" }}
              >
                Plant Care
              </h1>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {plantCount} plant{plantCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              background: "var(--paper)",
              border: "none",
              color: "var(--muted)",
            }}
          >
            x
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-left"
              style={{
                background:
                  activeTab === tab.id ? "var(--accent-light)" : "transparent",
                color:
                  activeTab === tab.id ? "var(--accent)" : "var(--muted)",
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
          style={{
            borderTop: "1px solid var(--line)",
            color: "var(--muted)",
          }}
        >
          Plant Care — FreeAppStore
        </div>
      </div>
    </div>
  );
}
