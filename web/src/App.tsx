import { useState, useEffect, useMemo, useCallback } from "react";
import type { PlantInfo, MyPlant, WateringStatus } from "./data/types";
import {
  plantDatabase,
  categoryLabels,
  categoryEmojis,
  getCurrentSeasonalTip,
} from "./data";
import {
  getMyPlants,
  addMyPlant,
  updateMyPlant,
  removeMyPlant,
  logWatering,
} from "./lib/storage";
import {
  sortByWateringUrgency,
  getPlantsNeedingWater,
  getPlantsDueThisWeek,
  getHealthBreakdown,
  getWateringStatus,
} from "./lib/watering";
import { resetColorIndex } from "./lib/colors";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import MyPlantCard from "./components/MyPlantCard";
import PlantDatabaseCard from "./components/PlantDatabaseCard";
import PlantDetailView from "./components/PlantDetailView";
import PlantDatabaseInfoView from "./components/PlantDatabaseInfoView";
import AddPlantModal from "./components/AddPlantModal";
import EditPlantModal from "./components/EditPlantModal";
import CalendarView from "./components/CalendarView";
import StatsView from "./components/StatsView";
import SeasonalTipCard from "./components/SeasonalTipCard";
type NavTab = "dashboard" | "my-plants" | "database" | "calendar" | "stats";
type FilterType = "all" | "location" | "light" | "status";

export default function App() {
  const [tab, setTab] = useState<NavTab>("dashboard");
  const [plants, setPlants] = useState<MyPlant[]>(getMyPlants);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterValue, setFilterValue] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Modal / detail state
  const [addingPlant, setAddingPlant] = useState<
    PlantInfo | "custom" | undefined
  >(undefined);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlant, setEditingPlant] = useState<MyPlant | null>(null);
  const [selectedMyPlant, setSelectedMyPlant] = useState<MyPlant | null>(null);
  const [selectedDbPlant, setSelectedDbPlant] = useState<PlantInfo | null>(
    null,
  );

  // Sync color index with existing plant count
  useEffect(() => {
    resetColorIndex(plants.length);
  }, [plants.length]);

  const seasonalTip = useMemo(() => getCurrentSeasonalTip(), []);

  // Filtered my plants
  const filteredPlants = useMemo(() => {
    let result = [...plants];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nickname.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q),
      );
    }

    // Type filter
    if (filterType === "location" && filterValue) {
      result = result.filter((p) => p.location === filterValue);
    } else if (filterType === "light" && filterValue) {
      result = result.filter((p) => p.light === filterValue);
    } else if (filterType === "status" && filterValue) {
      result = result.filter(
        (p) => getWateringStatus(p) === (filterValue as WateringStatus),
      );
    }

    return result;
  }, [plants, search, filterType, filterValue]);

  // Filtered database plants
  const filteredDbPlants = useMemo(() => {
    if (!search) return plantDatabase;
    const q = search.toLowerCase();
    return plantDatabase.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [search]);

  // Dashboard data
  const urgentPlants = useMemo(
    () => getPlantsNeedingWater(plants),
    [plants],
  );
  const weekPlants = useMemo(
    () => getPlantsDueThisWeek(plants),
    [plants],
  );
  const health = useMemo(() => getHealthBreakdown(plants), [plants]);

  // Category counts for database
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of plantDatabase) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  // Handlers
  const handleWater = useCallback((id: string) => {
    const updated = logWatering(id);
    setPlants(updated);
    // Also update selected plant if viewing it
    setSelectedMyPlant((prev) => {
      if (prev && prev.id === id) {
        return updated.find((p) => p.id === id) ?? null;
      }
      return prev;
    });
  }, []);

  const handleAddPlant = useCallback((plant: MyPlant) => {
    const updated = addMyPlant(plant);
    setPlants(updated);
    setShowAddModal(false);
    setAddingPlant(undefined);
  }, []);

  const handleUpdatePlant = useCallback(
    (id: string, updates: Partial<MyPlant>) => {
      const updated = updateMyPlant(id, updates);
      setPlants(updated);
      setEditingPlant(null);
      setSelectedMyPlant(
        updated.find((p) => p.id === id) ?? null,
      );
    },
    [],
  );

  const handleDeletePlant = useCallback((id: string) => {
    const updated = removeMyPlant(id);
    setPlants(updated);
    setSelectedMyPlant(null);
  }, []);

  const handleOpenAdd = useCallback((plant: PlantInfo) => {
    setAddingPlant(plant);
    setShowAddModal(true);
  }, []);

  const handleOpenAddCustom = useCallback(() => {
    setAddingPlant("custom");
    setShowAddModal(true);
  }, []);

  const handleTabChange = useCallback((newTab: NavTab) => {
    setTab(newTab);
    setSearch("");
    setFilterType("all");
    setFilterValue("");
    setSelectedMyPlant(null);
    setSelectedDbPlant(null);
  }, []);

  // Sub-view: plant detail
  if (selectedMyPlant) {
    if (editingPlant) {
      return (
        <AppShell
          tab={tab}
          onTabChange={handleTabChange}
          plantCount={plants.length}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
          title={editingPlant.nickname || editingPlant.name}
          search={search}
          onSearch={setSearch}
        >
          <PlantDetailView
            plant={selectedMyPlant}
            onBack={() => setSelectedMyPlant(null)}
            onWater={handleWater}
            onEdit={setEditingPlant}
            onDelete={handleDeletePlant}
          />
          <EditPlantModal
            plant={editingPlant}
            onSave={handleUpdatePlant}
            onClose={() => setEditingPlant(null)}
          />
        </AppShell>
      );
    }

    return (
      <AppShell
        tab={tab}
        onTabChange={handleTabChange}
        plantCount={plants.length}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        title={selectedMyPlant.nickname || selectedMyPlant.name}
        search={search}
        onSearch={setSearch}
      >
        <PlantDetailView
          plant={selectedMyPlant}
          onBack={() => setSelectedMyPlant(null)}
          onWater={handleWater}
          onEdit={setEditingPlant}
          onDelete={handleDeletePlant}
        />
      </AppShell>
    );
  }

  // Sub-view: database plant info
  if (selectedDbPlant) {
    return (
      <AppShell
        tab={tab}
        onTabChange={handleTabChange}
        plantCount={plants.length}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        title={selectedDbPlant.name}
        search={search}
        onSearch={setSearch}
      >
        <PlantDatabaseInfoView
          plant={selectedDbPlant}
          onBack={() => setSelectedDbPlant(null)}
          onAdd={(p) => {
            handleOpenAdd(p);
            setSelectedDbPlant(null);
          }}
        />
        {showAddModal && (
          <AddPlantModal
            plant={addingPlant === "custom" ? null : addingPlant ?? null}
            onAdd={handleAddPlant}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AppShell>
    );
  }

  return (
    <AppShell
      tab={tab}
      onTabChange={handleTabChange}
      plantCount={plants.length}
      mobileNavOpen={mobileNavOpen}
      setMobileNavOpen={setMobileNavOpen}
      title={
        tab === "dashboard"
          ? "Dashboard"
          : tab === "my-plants"
            ? "My Plants"
            : tab === "database"
              ? "Plant Database"
              : tab === "calendar"
                ? "Calendar"
                : "Stats"
      }
      search={search}
      onSearch={setSearch}
    >
      {/* ====== DASHBOARD ====== */}
      {tab === "dashboard" && (
        <div>
          <div className="mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              Plant Care Dashboard
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {plants.length} plant{plants.length !== 1 ? "s" : ""} in your
              collection
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <QuickStat
              label="Total Plants"
              value={plants.length}
              color="var(--accent)"
            />
            <QuickStat
              label="Need Water"
              value={urgentPlants.length}
              color="var(--error)"
            />
            <QuickStat
              label="Due This Week"
              value={weekPlants.length}
              color="var(--warning)"
            />
            <QuickStat
              label="Healthy"
              value={health.healthy}
              color="var(--success)"
            />
          </div>

          {/* Urgent list */}
          {urgentPlants.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-3 flex items-center gap-2"
                style={{ color: "var(--error)" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3c-1.5 3-6 7.5-6 11a6 6 0 0012 0c0-3.5-4.5-8-6-11z"
                  />
                </svg>
                Needs Water Now
              </h3>
              <div className="space-y-2">
                {sortByWateringUrgency(urgentPlants).map((p) => (
                  <MyPlantCard
                    key={p.id}
                    plant={p}
                    onWater={handleWater}
                    onSelect={setSelectedMyPlant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming this week */}
          {weekPlants.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-3"
                style={{ color: "var(--ink)" }}
              >
                Upcoming This Week
              </h3>
              <div className="space-y-2">
                {sortByWateringUrgency(weekPlants).map((p) => (
                  <MyPlantCard
                    key={p.id}
                    plant={p}
                    onWater={handleWater}
                    onSelect={setSelectedMyPlant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {plants.length === 0 && (
            <div
              className="text-center py-16 rounded-xl mb-6"
              style={{ background: "var(--panel)" }}
            >
              <p className="text-4xl mb-3">🪴</p>
              <p
                className="text-base font-bold mb-1"
                style={{ color: "var(--ink)" }}
              >
                No plants yet
              </p>
              <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                Add your first plant from the database or create a custom one
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleTabChange("database")}
                  className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Browse Database
                </button>
                <button
                  onClick={handleOpenAddCustom}
                  className="px-4 py-2 text-sm font-medium rounded-lg cursor-pointer"
                  style={{
                    background: "var(--panel)",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                  }}
                >
                  + Custom Plant
                </button>
              </div>
            </div>
          )}

          {/* Seasonal tip */}
          <SeasonalTipCard tip={seasonalTip} />
        </div>
      )}

      {/* ====== MY PLANTS ====== */}
      {tab === "my-plants" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--ink)" }}
              >
                My Plants
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                {filteredPlants.length} of {plants.length} plant
                {plants.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleOpenAddCustom}
                className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
                style={{
                  background: "var(--panel)",
                  color: "var(--ink)",
                  border: "1px solid var(--line)",
                }}
              >
                + Custom
              </button>
              <button
                onClick={() => handleTabChange("database")}
                className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                }}
              >
                + From Database
              </button>
            </div>
          </div>

          <div className="mb-4">
            <FilterBar
              filterType={filterType}
              filterValue={filterValue}
              onFilterTypeChange={setFilterType}
              onFilterValueChange={setFilterValue}
            />
          </div>

          {filteredPlants.length === 0 ? (
            <div
              className="text-center py-16 rounded-xl"
              style={{ background: "var(--panel)" }}
            >
              <p className="text-3xl mb-2">🌱</p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                {plants.length === 0 ? "No plants yet" : "No plants match filters"}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                {plants.length === 0
                  ? "Add plants from the database or create custom ones"
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortByWateringUrgency(filteredPlants).map((p) => (
                <MyPlantCard
                  key={p.id}
                  plant={p}
                  onWater={handleWater}
                  onSelect={setSelectedMyPlant}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ====== DATABASE ====== */}
      {tab === "database" && (
        <div>
          <div className="mb-4">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              Plant Database
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
              {plantDatabase.length} houseplants with detailed care guides
            </p>
          </div>

          {/* Category overview */}
          {!search && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <button
                  key={cat}
                  onClick={() => setSearch(cat)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer"
                  style={{
                    background: "var(--panel)",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span>{categoryEmojis[cat] ?? "🌱"}</span>
                  <span>{categoryLabels[cat] ?? cat}</span>
                  <span style={{ color: "var(--muted)" }}>({count})</span>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {filteredDbPlants.map((p) => (
              <PlantDatabaseCard
                key={p.id}
                plant={p}
                onAdd={handleOpenAdd}
                onViewDetail={setSelectedDbPlant}
              />
            ))}
          </div>

          {filteredDbPlants.length === 0 && (
            <div
              className="text-center py-16 rounded-xl"
              style={{ background: "var(--panel)" }}
            >
              <p className="text-3xl mb-2">🔍</p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                No plants found
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}

      {/* ====== CALENDAR ====== */}
      {tab === "calendar" && (
        <div>
          <div className="mb-4">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              Watering Calendar
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
              Track your watering schedule at a glance
            </p>
          </div>
          <CalendarView plants={plants} />
        </div>
      )}

      {/* ====== STATS ====== */}
      {tab === "stats" && (
        <div>
          <div className="mb-4">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              Plant Care Stats
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
              Your plant care journey at a glance
            </p>
          </div>
          <StatsView plants={plants} />
        </div>
      )}

      {/* Add plant modal */}
      {showAddModal && (
        <AddPlantModal
          plant={addingPlant === "custom" ? null : addingPlant ?? null}
          onAdd={handleAddPlant}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </AppShell>
  );
}

function AppShell({
  tab,
  onTabChange,
  plantCount,
  mobileNavOpen,
  setMobileNavOpen,
  title,
  search,
  onSearch,
  children,
}: {
  readonly tab: "dashboard" | "my-plants" | "database" | "calendar" | "stats";
  readonly onTabChange: (
    tab: "dashboard" | "my-plants" | "database" | "calendar" | "stats",
  ) => void;
  readonly plantCount: number;
  readonly mobileNavOpen: boolean;
  readonly setMobileNavOpen: (open: boolean) => void;
  readonly title: string;
  readonly search: string;
  readonly onSearch: (value: string) => void;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen" style={{ background: "var(--paper)" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          activeTab={tab}
          onTabChange={onTabChange}
          plantCount={plantCount}
        />
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav
        activeTab={tab}
        onTabChange={onTabChange}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        plantCount={plantCount}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="shrink-0 flex items-center gap-3 px-4 py-3 lg:px-6"
          style={{
            borderBottom: "1px solid var(--line)",
            background: "var(--glass)",
          }}
        >
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              background: "var(--panel)",
              border: "none",
              color: "var(--ink)",
            }}
            aria-label="Open navigation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1
            className="text-lg font-bold hidden sm:block"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </h1>
          <div className="flex-1 max-w-md ml-auto">
            <SearchBar value={search} onChange={onSearch} />
          </div>
        </header>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 lg:px-6">
          {children}
        </div>

        {/* Footer */}
        <footer
          className="shrink-0 flex items-center justify-center px-4 py-2 text-xs"
          style={{
            borderTop: "1px solid var(--line)",
            color: "var(--muted)",
          }}
        >
          Plant Care — Free on FreeAppStore
        </footer>
      </main>
    </div>
  );
}

function QuickStat({
  label,
  value,
  color,
}: {
  readonly label: string;
  readonly value: number;
  readonly color: string;
}) {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
      }}
    >
      <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="text-2xl font-bold mt-0.5" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
