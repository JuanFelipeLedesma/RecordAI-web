import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/* =========================
   PALETA Y UTILIDADES
   ========================= */

export const colors = {
  primary: "#03CEA4",
  primaryLight: "#3B82F6",
  primaryDark: "#1E40AF",

  work: "#8B5CF6",
  birthday: "#F59E0B",
  shopping: "#10B981",
  home: "#EF4444",
  health: "#06B6D4",
  other: "#6B7280",

  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  background: "#F8FAFC",
  cardBackground: "#FFFFFF",
  hoverBackground: "#F1F5F9",

  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
};

export const getCategoryColor = (category: string) => {
  if (category.includes("Work")) return colors.work;
  if (category.includes("Birthday")) return colors.birthday;
  if (category.includes("Shopping")) return colors.shopping;
  if (category.includes("Home")) return colors.home;
  if (category.includes("Health")) return colors.health;
  return colors.other;
};

/* =========================
   TIPOS SENCILLOS
   ========================= */
type Category = "Home" | "Work" | "Shopping" | "Health" | "Birthday" | "Other";
type Reminder = {
  id?: number | string;
  title: string;
  time?: string;
  date?: string; // usado en Upcoming
  category: Category | string;
  description?: string;
  location?: string;
  when?: Date; // usado para estadísticas
};

/* =========================
   MODAL DETALLE DE REMINDER
   ========================= */
function ReminderDetailModal({
  open,
  reminder,
  onClose,
}: {
  open: boolean;
  reminder: Reminder | null;
  onClose: () => void;
}) {
  if (!open || !reminder) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        zIndex: 60,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: "1.5rem",
          width: "min(560px, 92vw)",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 30px rgba(0,0,0,.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {reminder.title}
          </h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: `${colors.error}10`,
              color: colors.error,
              width: 36,
              height: 36,
              borderRadius: 8,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {reminder.time && (
            <div>
              <strong>Time:</strong> {reminder.time}
            </div>
          )}
          {reminder.date && (
            <div>
              <strong>Date:</strong> {reminder.date}
            </div>
          )}
          {reminder.when && (
            <div>
              <strong>When:</strong>{" "}
              {reminder.when.toLocaleString()}
            </div>
          )}
          {reminder.category && (
            <div>
              <strong>Category:</strong>{" "}
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: getCategoryColor(reminder.category),
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {reminder.category}
              </span>
            </div>
          )}
          {reminder.location && (
            <div>
              <strong>Location:</strong> {reminder.location}
            </div>
          )}
          {reminder.description && (
            <div style={{ whiteSpace: "pre-wrap" }}>
              <strong>Description:</strong> {reminder.description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button
            onClick={onClose}
            className="btn"
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: colors.cardBackground,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   HEADER Y NAV
   ========================= */

function SimpleHeader({
  onNewReminder,
  onOpenSettingsSection,
}: {
  onNewReminder: () => void;
  onOpenSettingsSection: (sectionId: SettingsSectionId) => void;
}) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        padding: "1rem clamp(1rem,5vw,8rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff" }}>RecordAI</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={onNewReminder}
          style={{
            background: `linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)`,
            color: colors.primary,
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          New Reminder
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: `linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)`,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: colors.primary,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            J
          </button>

          {showProfileDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "0.5rem",
                background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                minWidth: 240,
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "1rem", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 600, color: colors.textPrimary, fontSize: "0.95rem" }}>
                  Juan Vargas
                </div>
                <div style={{ fontSize: "0.8rem", color: colors.textSecondary }}>juan@example.com</div>
              </div>

              <div style={{ padding: "0.5rem 0" }}>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onOpenSettingsSection("notifications");
                      }}
                      style={dropdownBtnStyle}
                    >
                      <span>⚙️</span> Account Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onOpenSettingsSection("email");
                      }}
                      style={dropdownBtnStyle}
                    >
                      <span>🎯</span> Preferences
                    </button>
                    <div style={{ height: 1, backgroundColor: "#e2e8f0", margin: "0.5rem 0" }} />
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setIsLoggedIn(false);
                      }}
                      style={{ ...dropdownBtnStyle, color: colors.error }}
                    >
                      <span>🚪</span> Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setShowProfileDropdown(false)} style={dropdownBtnStyle}>
                      <span>🔑</span> Sign In
                    </button>
                    <button onClick={() => setShowProfileDropdown(false)} style={dropdownBtnStyle}>
                      <span>✨</span> Create Account
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showProfileDropdown && (
        <div
          onClick={() => setShowProfileDropdown(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40 }}
        />
      )}
    </header>
  );
}
const dropdownBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "none",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "0.9rem",
  color: colors.textPrimary,
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

function SimpleNavigation({
  currentPage,
  onPageChange,
}: {
  currentPage: string;
  onPageChange: (page: string) => void;
}) {
  const pages = [
    { id: "dashboard", label: "Dashboard", color: colors.primary },
    { id: "week", label: "Week", color: colors.work },
    { id: "statistics", label: "Statistics", color: colors.success },
    { id: "upcoming", label: "Upcoming", color: colors.warning },
    { id: "settings", label: "Settings", color: colors.textSecondary },
  ];

  return (
    <nav
      style={{
        backgroundColor: colors.cardBackground,
        borderBottom: `1px solid #e2e8f0`,
        padding: "0 clamp(1rem,5vw,8rem)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", padding: "1rem 0" }}>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            style={{
              backgroundColor: currentPage === page.id ? `${page.color}10` : "transparent",
              border: "none",
              padding: "0.75rem 1rem",
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 500,
              color: currentPage === page.id ? page.color : colors.textSecondary,
              cursor: "pointer",
            }}
          >
            {page.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* =========================
   DASHBOARD (calendario navegable)
   ========================= */

function SimpleDashboard({
  onDaySelect,
  onReminderClick,
}: {
  onDaySelect: (date: Date) => void;
  onReminderClick: (reminder: Reminder) => void;
}) {
  const monthNames = [
    "January","February","March","April","May","June","July","August","September","October","November","December",
  ];
  const today = new Date();
  const [calYear, setCalYear] = useState<number>(today.getFullYear());
  const [calMonth, setCalMonth] = useState<number>(today.getMonth()); // 0-11

  const goPrevMonth = () => {
    setCalMonth((m) => {
      if (m === 0) {
        setCalYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };
  const goNextMonth = () => {
    setCalMonth((m) => {
      if (m === 11) {
        setCalYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const monthCells = useMemo(() => getMonthMatrix(calYear, calMonth), [calYear, calMonth]);

  const nextReminders: Reminder[] = [
    { title: "Study Calculus", time: "14:30", category: "Home" },
    { title: "Buy fruit", time: "16:00", category: "Shopping" },
    { title: "Finish book", time: "19:00", category: "Other" },
  ];
  const nextWeek: Reminder[] = [
    { title: "Team meeting", time: "Aug 28", category: "Work" },
    { title: "Birthday party", time: "Aug 30", category: "Birthday" },
  ];

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem", alignItems: "stretch" }}>
        {/* LEFT: saludo + calendario */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
              }}
            >
              Hola, Juan!
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "4rem", fontWeight: 200, color: colors.textMuted, lineHeight: 1 }}>
                {today.getDate()}
              </div>
              <div style={{ fontSize: "1.5rem", color: colors.textSecondary }}>
                {today.toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </div>
          </div>

          {/* CARD CALENDARIO */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
              flex: "1",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.textPrimary, margin: 0 }}>
                {monthNames[calMonth]} {calYear}
              </h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={goPrevMonth} aria-label="Previous month">←</button>
                <button className="btn" onClick={goNextMonth} aria-label="Next month">→</button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} style={{ textAlign: "center", fontSize: ".875rem", fontWeight: 600, color: colors.textSecondary }}>
                  {d}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
              {monthCells.map((day, i) => {
                const isCurrent =
                  day &&
                  calYear === today.getFullYear() &&
                  calMonth === today.getMonth() &&
                  day === today.getDate();
                const hasReminder = day ? [5, 12, 18, 25, 28].includes(day) : false;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (day) onDaySelect(new Date(calYear, calMonth, day));
                    }}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12,
                      border: "none",
                      background: isCurrent
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                        : hasReminder
                        ? `${colors.success}20`
                        : "transparent",
                      color: isCurrent ? "#fff" : day ? colors.textPrimary : colors.textMuted,
                      position: "relative",
                      cursor: day ? "pointer" : "default",
                    }}
                  >
                    {day ?? ""}
                    {hasReminder && !isCurrent && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 4,
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: colors.success,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: bloques de reminders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%" }}>
          <CardList
            title="Next reminders"
            items={nextReminders}
            onItemClick={onReminderClick}
          />
          <CardList
            title="Next week"
            items={nextWeek}
            onItemClick={onReminderClick}
          />
        </div>
      </div>
    </div>
  );
}

/* Card de lista de reminders reutilizable */
function CardList({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: Reminder[];
  onItemClick: (r: Reminder) => void;
}) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: "1.5rem",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: colors.textPrimary, marginBottom: "1.5rem" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        {items.map((reminder, index) => (
          <div
            key={index}
            onClick={() => onItemClick(reminder)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
              borderRadius: 12,
              border: `1px solid ${getCategoryColor(reminder.category)}30`,
              cursor: "pointer",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: colors.textPrimary, fontSize: ".9rem", marginBottom: 4 }}>
                {reminder.title}
              </div>
              {reminder.time && <div style={{ fontSize: ".8rem", color: colors.textSecondary }}>{reminder.time}</div>}
            </div>
            <span
              style={{
                fontSize: ".75rem",
                padding: ".5rem .75rem",
                backgroundColor: getCategoryColor(reminder.category),
                borderRadius: 20,
                color: "#fff",
                fontWeight: 600,
              }}
            >
              {reminder.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   WEEK VIEW (click abre detalle)
   ========================= */

function EnhancedWeekView({ onReminderClick }: { onReminderClick: (r: Reminder) => void }) {
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDays = (weekOffset: number = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff + weekOffset * 7);
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekReminders: Record<number, Reminder[]> = {
    0: [
      { title: "Study Calculus", time: "14:30", category: "Home" },
      { title: "Buy fruit", time: "16:00", category: "Shopping" },
    ],
    1: [{ title: "Team meeting", time: "09:00", category: "Work" }],
    2: [
      { title: "Doctor appointment", time: "10:00", category: "Health" },
      { title: "Finish book", time: "19:00", category: "Other" },
    ],
    3: [{ title: "Gym session", time: "18:00", category: "Home" }],
    4: [
      { title: "Grocery shopping", time: "11:00", category: "Shopping" },
      { title: "Movie night", time: "20:00", category: "Other" },
    ],
    5: [{ title: "Birthday party", time: "15:00", category: "Birthday" }],
    6: [{ title: "Rest day", category: "Home" }],
  };

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* navegación de semana */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          marginBottom: "2rem",
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => setCurrentWeek((w) => w - 1)} className="btn" style={navBtnStyle}>
          ‹
        </button>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.work} 0%, ${colors.primary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
          }}
        >
          {weekDays[0].getDate()} {weekDays[0].toLocaleDateString("en", { month: "short" })} -{" "}
          {weekDays[6].getDate()} {weekDays[6].toLocaleDateString("en", { month: "short" })}
        </h2>
        <button onClick={() => setCurrentWeek((w) => w + 1)} className="btn" style={navBtnStyle}>
          ›
        </button>
      </div>

      {/* grilla */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1rem" }}>
        {weekDays.map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
                border: isToday ? `2px solid ${colors.primary}` : "1px solid #e2e8f0",
                borderRadius: 16,
                padding: "1.5rem",
                minHeight: 400,
                boxShadow: isToday ? `0 8px 15px -3px ${colors.primary}20` : "0 4px 6px -1px rgba(0,0,0,.1)",
              }}
            >
              <div style={{ marginBottom: "1rem", paddingBottom: ".75rem", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 600, color: isToday ? colors.primary : colors.textPrimary, fontSize: ".875rem" }}>
                  {dayNames[index]}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: isToday ? colors.primary : colors.textSecondary,
                    marginTop: 4,
                  }}
                >
                  {day.getDate()}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {(weekReminders[index] || []).map((reminder, i) => (
                  <div
                    key={i}
                    onClick={() => onReminderClick(reminder)}
                    style={{
                      padding: "1rem",
                      background: `linear-gradient(135deg, ${getCategoryColor(reminder.category)}10 0%, #ffffff 100%)`,
                      borderRadius: 12,
                      border: `1px solid ${getCategoryColor(reminder.category)}30`,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: ".9rem", fontWeight: 600, color: colors.textPrimary, marginBottom: 6 }}>
                      {reminder.title}
                    </div>
                    {reminder.time && (
                      <div style={{ fontSize: ".8rem", color: colors.textSecondary, marginBottom: 6 }}>
                        {reminder.time}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: ".7rem",
                        padding: ".25rem .75rem",
                        backgroundColor: getCategoryColor(reminder.category),
                        borderRadius: 20,
                        color: "#fff",
                        fontWeight: 600,
                        display: "inline-block",
                      }}
                    >
                      {reminder.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const navBtnStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  padding: ".75rem",
  cursor: "pointer",
  fontSize: "1.125rem",
  fontWeight: 700,
};

/* =========================
   STATISTICS (Custom = rango de fechas)
   ========================= */

/** Dataset de ejemplo con fechas de los últimos ~120 días */
const demoEvents: Reminder[] = (() => {
  const cats: Category[] = ["Work", "Home", "Shopping", "Health", "Birthday", "Other"] as any;
  const titles: Record<string, string[]> = {
    Work: ["Team Meeting", "Sprint Review", "Plan Q4", "Client Call"],
    Home: ["Clean Kitchen", "Fix Lamp", "Laundry"],
    Shopping: ["Groceries", "Buy Fruit", "Pharmacy"],
    Health: ["Doctor", "Gym", "Run"],
    Birthday: ["Birthday Party", "Buy Gift"],
    Other: ["Read Book", "Study Calculus"],
  };
  const out: Reminder[] = [];
  const today = new Date();
  for (let i = 0; i < 180; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const cat = cats[i % cats.length];
    const tt = titles[cat][i % titles[cat].length];
    out.push({
      id: i,
      title: tt,
      category: cat,
      when: new Date(d.getFullYear(), d.getMonth(), d.getDate(), (i % 10) + 8, 0),
    });
  }
  return out;
})();

function StatisticsPage() {
  type RangeKey = "Last month" | "Last 3 months" | "Custom";
  const [mode, setMode] = useState<RangeKey>("Last month");
  const [from, setFrom] = useState<string>(() => toInputDate(subDays(new Date(), 30)));
  const [to, setTo] = useState<string>(() => toInputDate(new Date()));

  /** Rango efectivo según modo */
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (mode === "Last month") {
      return { startDate: subDays(now, 30), endDate: now };
    }
    if (mode === "Last 3 months") {
      return { startDate: subDays(now, 90), endDate: now };
    }
    // Custom
    return {
      startDate: parseInputDate(from) ?? subDays(now, 7),
      endDate: addDays(parseInputDate(to) ?? now, 1), // end exclusive
    };
  }, [mode, from, to]);

  /** Filtrado de eventos por rango */
  const filtered = useMemo(() => {
    return demoEvents.filter((e) => {
      if (!e.when) return false;
      return e.when >= startDate && e.when < endDate;
    });
  }, [startDate, endDate]);

  /** Conteos por categoría */
  const counts = useMemo(() => {
    const map: Record<string, number> = { Work: 0, Home: 0, Shopping: 0, Health: 0, Birthday: 0, Other: 0 };
    filtered.forEach((e) => {
      const key = String(e.category) as string;
      map[key] = (map[key] ?? 0) + 1;
    });
    return map;
  }, [filtered]);

  /** Datos para pie: porcentajes */
  const chartData = useMemo(() => {
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts).map(([name, val]) => ({
      name,
      value: Math.round((val / total) * 100),
      color: getCategoryColor(name),
      absolute: val,
    }));
  }, [counts]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value, absolute } = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: colors.cardBackground,
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "0.75rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ color: colors.textPrimary, fontWeight: 700, margin: 0 }}>
            {name}: {value}% <span style={{ color: colors.textSecondary }}>({absolute})</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const totalCount = filtered.length;

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
          }}
        >
          Statistics
        </h1>

        {/* Selector de rango / modo */}
        <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {(["Last month", "Last 3 months", "Custom"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setMode(range)}
              style={{
                padding: ".75rem 1.5rem",
                border: mode === range ? `2px solid ${colors.primary}` : "1px solid #e2e8f0",
                borderRadius: 12,
                backgroundColor: mode === range ? `${colors.primary}10` : colors.cardBackground,
                color: mode === range ? colors.primary : colors.textSecondary,
                cursor: "pointer",
                fontWeight: mode === range ? 600 : 400,
              }}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Inputs de fechas cuando es Custom */}
        {mode === "Custom" && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", marginTop: ".5rem" }}>
            <div>
              <label style={{ fontSize: ".85rem", color: colors.textSecondary, display: "block", marginBottom: 6 }}>
                From
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input"
                style={{ padding: ".6rem .8rem", borderRadius: 10, border: "1px solid #e2e8f0" }}
              />
            </div>
            <div>
              <label style={{ fontSize: ".85rem", color: colors.textSecondary, display: "block", marginBottom: 6 }}>
                To
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="input"
                style={{ padding: ".6rem .8rem", borderRadius: 10, border: "1px solid #e2e8f0" }}
              />
            </div>
            <div style={{ color: colors.textSecondary, marginLeft: "auto" }}>
              {formatShort(startDate)} – {formatShort(addDays(endDate, -1))} · {totalCount} reminders
            </div>
          </div>
        )}
      </div>

      {/* GRID superior: pie + lista / info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
            height: "100%",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.textPrimary, marginBottom: "2rem" }}>
            Reminder Categories
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
                label={({ value }) => `${value}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
            height: "100%",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.textPrimary, marginBottom: "1rem" }}>
            Categories
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {chartData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: ".75rem",
                  backgroundColor: `${item.color}10`,
                  borderRadius: 8,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <span
                  style={{
                    fontSize: ".875rem",
                    padding: ".5rem .75rem",
                    backgroundColor: item.color,
                    borderRadius: 20,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </span>
                <span style={{ fontSize: "1rem", color: colors.textSecondary }}>
                  {item.absolute} • {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          marginTop: "2rem",
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: "2rem",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
        }}
      >
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.textPrimary, marginBottom: "2rem" }}>
          Quick Stats
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          <StatCard title="Total Reminders" value={String(totalCount)} color={colors.primary} />
          <StatCard title="Distinct Categories" value={String(Object.values(counts).filter((v) => v > 0).length)} color={colors.success} />
          <StatCard title="Top Category" value={topCategory(chartData)} color={colors.work} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1.5rem",
        backgroundColor: `${color}10`,
        borderRadius: 12,
        border: `1px solid ${color}30`,
      }}
    >
      <span style={{ fontSize: "2rem", fontWeight: 700, color, marginBottom: 8 }}>{value}</span>
      <span style={{ fontSize: "1rem", color: colors.textSecondary, fontWeight: 500 }}>{title}</span>
    </div>
  );
}

function topCategory(data: { name: string; value: number }[]) {
  if (!data.length) return "—";
  const top = data.reduce((a, b) => (b.value > a.value ? b : a));
  return `${top.name} (${top.value}%)`;
}

function subDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() - n);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function toInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function parseInputDate(s?: string) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map((x) => parseInt(x, 10));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function formatShort(d: Date) {
  return d.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
}

/* =========================
   UPCOMING (click abre detalle)
   ========================= */

function UpcomingPage({ onReminderClick }: { onReminderClick: (r: Reminder) => void }) {
  const [selectedReminders, setSelectedReminders] = useState<number[]>([]);

  const upcomingReminders: (Reminder & { id: number; date: string })[] = [
    { id: 1, title: "Study Calculus", time: "14:30", date: "Today", category: "Home", completed: false },
    { id: 2, title: "Buy fruit", time: "16:00", date: "Today", category: "Shopping", completed: false },
    { id: 3, title: "Team meeting", time: "09:00", date: "Tomorrow", category: "Work", completed: false },
    { id: 4, title: "Doctor appointment", time: "10:00", date: "Sep 18", category: "Health", completed: false },
    { id: 5, title: "Birthday party", time: "15:00", date: "Sep 20", category: "Birthday", completed: false },
  ] as any;

  const toggleReminder = (id: number) => {
    setSelectedReminders((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setSelectedReminders(
      selectedReminders.length === upcomingReminders.length ? [] : upcomingReminders.map((r) => r.id)
    );
  };

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.primary} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "2rem",
        }}
      >
        Upcoming Reminders
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
          }}
        >
          {/* acciones masivas */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={toggleAll}
                style={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: 4,
                  backgroundColor:
                    selectedReminders.length === upcomingReminders.length ? colors.primary : "transparent",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                {selectedReminders.length === upcomingReminders.length && "✓"}
              </button>
              <span style={{ fontWeight: 600, color: colors.textPrimary }}>
                {selectedReminders.length} selected
              </span>
            </div>
            {selectedReminders.length > 0 && (
              <button
                style={{
                  padding: ".5rem 1rem",
                  backgroundColor: colors.error,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: ".875rem",
                }}
              >
                Delete Selected
              </button>
            )}
          </div>

          {/* lista */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {upcomingReminders.map((rem) => (
              <div
                key={rem.id}
                onClick={() => onReminderClick(rem)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.5rem",
                  backgroundColor: colors.hoverBackground,
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  cursor: "pointer",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReminder(rem.id);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    border: `2px solid ${colors.primary}`,
                    borderRadius: 4,
                    backgroundColor: selectedReminders.includes(rem.id) ? colors.primary : "transparent",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  aria-label="Select"
                >
                  {selectedReminders.includes(rem.id) && "✓"}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: colors.textPrimary, fontSize: "1rem", marginBottom: 6 }}>
                    {rem.title}
                  </div>
                  <div style={{ fontSize: ".875rem", color: colors.textSecondary, display: "flex", gap: "1rem" }}>
                    <span>{rem.time}</span>
                    <span>•</span>
                    <span>{rem.date}</span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: ".75rem",
                    padding: ".5rem .75rem",
                    backgroundColor: getCategoryColor(rem.category),
                    borderRadius: 20,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {rem.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lateral derecho (estado vacío) */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,.1)",
            height: "fit-content",
          }}
        >
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.textPrimary, marginBottom: "2rem", textAlign: "center" }}>
            Next Month
          </h3>
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📅</div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: colors.textPrimary, marginBottom: ".5rem" }}>
              No reminders yet
            </h4>
            <p style={{ color: colors.textSecondary, fontSize: ".9rem" }}>
              You're all set for next month! Create new reminders to stay organized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   SETTINGS (incluye HISTORY)
   ========================= */

type SettingsSectionId = "notifications" | "email" | "privacy" | "about" | "history";

function SettingsPage({ initialSection }: { initialSection?: SettingsSectionId }) {
  const [expandedSection, setExpandedSection] = useState<SettingsSectionId | null>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    email: "juan@example.com",
    quietHours: { start: "22:00", end: "07:00" },
    bypassDND: false,
    emailVerified: true,
  });

  useEffect(() => {
    if (initialSection) setExpandedSection(initialSection);
  }, [initialSection]);

  const toggleSection = (section: SettingsSectionId) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections: {
    id: SettingsSectionId;
    title: string;
    description: string;
    content: React.ReactNode;
  }[] = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, color: colors.textPrimary }}>Enable Notifications</div>
              <div style={{ fontSize: ".875rem", color: colors.textSecondary }}>Receive reminder notifications</div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              style={{
                width: "3rem",
                height: "1.5rem",
                backgroundColor: settings.notifications ? colors.primary : "#D1D5DB",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "0.25rem",
                  left: settings.notifications ? "1.75rem" : "0.25rem",
                }}
              />
            </button>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: "1rem" }}>Quiet Hours</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: ".875rem", color: colors.textSecondary, marginBottom: ".5rem", display: "block" }}>
                  Start
                </label>
                <input
                  type="time"
                  value={settings.quietHours.start}
                  onChange={(e) => setSettings({ ...settings, quietHours: { ...settings.quietHours, start: e.target.value } })}
                  className="input"
                />
              </div>
              <div>
                <label style={{ fontSize: ".875rem", color: colors.textSecondary, marginBottom: ".5rem", display: "block" }}>
                  End
                </label>
                <input
                  type="time"
                  value={settings.quietHours.end}
                  onChange={(e) => setSettings({ ...settings, quietHours: { ...settings.quietHours, end: e.target.value } })}
                  className="input"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, color: colors.textPrimary }}>Bypass Do Not Disturb</div>
              <div style={{ fontSize: ".875rem", color: colors.textSecondary }}>Show critical reminders even in DND mode</div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, bypassDND: !settings.bypassDND })}
              style={{
                width: "3rem",
                height: "1.5rem",
                backgroundColor: settings.bypassDND ? colors.primary : "#D1D5DB",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "0.25rem",
                  left: settings.bypassDND ? "1.75rem" : "0.25rem",
                }}
              />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "email",
      title: "Email",
      description: "Manage your email settings",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ fontSize: ".875rem", color: colors.textSecondary, marginBottom: ".5rem", display: "block" }}>
              Email Address
            </label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="input"
                style={{ flex: 1 }}
              />
              <div
                style={{
                  padding: ".5rem 1rem",
                  backgroundColor: settings.emailVerified ? `${colors.success}10` : `${colors.warning}10`,
                  color: settings.emailVerified ? colors.success : colors.warning,
                  borderRadius: 20,
                  fontSize: ".8rem",
                  fontWeight: 600,
                  border: `1px solid ${settings.emailVerified ? colors.success : colors.warning}30`,
                }}
              >
                {settings.emailVerified ? "✓ Verified" : "⚠ Unverified"}
              </div>
            </div>
          </div>

          {!settings.emailVerified && (
            <button
              style={{
                padding: ".75rem 1.5rem",
                backgroundColor: colors.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Send Verification Email
            </button>
          )}
        </div>
      ),
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Data export and deletion options",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <h4 style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: ".5rem" }}>Data Export</h4>
            <p style={{ fontSize: ".875rem", color: colors.textSecondary, marginBottom: "1rem" }}>
              Download all your data in JSON format
            </p>
            <button
              style={{
                padding: ".75rem 1.5rem",
                backgroundColor: colors.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Export Data
            </button>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, color: colors.error, marginBottom: ".5rem" }}>Delete Account</h4>
            <p style={{ fontSize: ".875rem", color: colors.textSecondary, marginBottom: "1rem" }}>
              Permanently delete your account and all data
            </p>
            <button
              style={{
                padding: ".75rem 1.5rem",
                backgroundColor: colors.error,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "about",
      title: "About",
      description: "App information and links",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: colors.textSecondary }}>Version</span>
            <span style={{ fontWeight: 600, color: colors.textPrimary }}>1.2.0</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: colors.textSecondary }}>Build</span>
            <span style={{ fontWeight: 600, color: colors.textPrimary }}>2024.09.15</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #e2e8f0" }} />
          <a href="#" style={{ color: colors.primary, textDecoration: "none", fontSize: ".875rem" }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: colors.primary, textDecoration: "none", fontSize: ".875rem" }}>
            Terms of Service
          </a>
          <a href="#" style={{ color: colors.primary, textDecoration: "none", fontSize: ".875rem" }}>
            Support Center
          </a>
        </div>
      ),
    },
    {
      id: "history",
      title: "History",
      description: "Log of recent changes",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { date: "Sep 15, 2024", action: 'Created reminder "Study Calculus"', time: "2:30 PM" },
            { date: "Sep 14, 2024", action: 'Completed reminder "Buy groceries"', time: "5:45 PM" },
            { date: "Sep 13, 2024", action: 'Updated reminder "Team meeting"', time: "10:20 AM" },
            { date: "Sep 12, 2024", action: 'Deleted reminder "Old task"', time: "3:15 PM" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: "1rem",
                backgroundColor: colors.hoverBackground,
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontWeight: 600, color: colors.textPrimary, fontSize: ".9rem" }}>
                {item.action}
              </div>
              <div style={{ fontSize: ".8rem", color: colors.textSecondary, marginTop: ".25rem" }}>
                {item.date} at {item.time}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.textSecondary} 0%, ${colors.primary} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "2rem",
        }}
      >
        Settings
      </h1>

      <div style={{ maxWidth: 800 }}>
        {sections.map((section) => (
          <div
            key={section.id}
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              marginBottom: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,.05)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: "100%",
                padding: "1.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 600, color: colors.textPrimary, marginBottom: 4 }}>
                  {section.title}
                </div>
                <div style={{ fontSize: ".875rem", color: colors.textSecondary }}>{section.description}</div>
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  color: colors.textSecondary,
                  transform: expandedSection === section.id ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .2s",
                }}
              >
                ▼
              </div>
            </button>

            {expandedSection === section.id && (
              <div style={{ padding: "0 1.5rem 1.5rem 1.5rem", borderTop: "1px solid #e2e8f0", background: colors.hoverBackground }}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   MODAL DE CREACIÓN
   ========================= */

function EnhancedModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateFrom: "",
    dateTo: "",
    time: "",
    location: "",
    category: "Home",
  });
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.dateFrom) newErrors.dateFrom = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      onClose();
      setFormData({ title: "", description: "", dateFrom: "", dateTo: "", time: "", location: "", category: "Home" });
      setErrors({});
    }
  };

  const categories = ["Home", "Work", "Shopping", "Health", "Birthday", "Other"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          borderRadius: 20,
          padding: "2rem",
          width: 600,
          maxWidth: "92vw",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            New Reminder
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: `${colors.error}10`,
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: colors.error,
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Title */}
          <div>
            <label className="label">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="Enter reminder title"
              style={{ borderColor: errors.title ? colors.error : "#e2e8f0" }}
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="input"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="label">Date Range *</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="label" style={{ fontSize: ".75rem" }}>
                  From
                </label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                  className="input"
                  style={{ borderColor: errors.dateFrom ? colors.error : "#e2e8f0" }}
                />
                {errors.dateFrom && <div className="error">{errors.dateFrom}</div>}
              </div>
              <div>
                <label className="label" style={{ fontSize: ".75rem" }}>
                  To (optional)
                </label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Time & Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="label">Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input"
                style={{ borderColor: errors.time ? colors.error : "#e2e8f0" }}
              />
              {errors.time && <div className="error">{errors.time}</div>}
            </div>
            <div>
              <label className="label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
              >
                {["Home", "Work", "Shopping", "Health", "Birthday", "Other"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input"
              placeholder="Enter location (optional)"
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
          <button
            onClick={onClose}
            className="btn"
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: 12,
              background: colors.cardBackground,
              color: colors.textSecondary,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              border: "none",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: "#fff",
            }}
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   DÍA DETALLE (click abre detalle)
   ========================= */

function DayDetailView({
  selectedDate,
  onNewReminder,
  onBackToDashboard,
  onReminderClick,
}: {
  selectedDate: Date | null;
  onNewReminder: () => void;
  onBackToDashboard: () => void;
  onReminderClick: (r: Reminder) => void;
}) {
  const getDayReminders = (date: Date | null): Reminder[] => {
    if (!date) return [];
    const d = date.getDate();
    const remindersByDay: Record<number, Reminder[]> = {
      15: [
        { title: "Team Meeting", time: "09:00", category: "Work" },
        { title: "Lunch with Sarah", time: "12:30", category: "Other" },
        { title: "Gym Session", time: "18:00", category: "Health" },
      ],
      18: [{ title: "Birthday Party", time: "19:00", category: "Birthday" }],
      25: [
        { title: "Grocery Shopping", time: "10:00", category: "Shopping" },
        { title: "Study Calculus", time: "14:30", category: "Home" },
      ],
    };
    return remindersByDay[d] || [];
  };

  const dayReminders = getDayReminders(selectedDate);
  const hasReminders = dayReminders.length > 0;
  if (!selectedDate) {
    return (
      <div
        style={{
          padding: "2rem clamp(1rem,5vw,8rem)",
          background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ color: colors.textSecondary, fontSize: "1.25rem" }}>No date selected</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem clamp(1rem,5vw,8rem)",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={onBackToDashboard}
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: "#fff",
            padding: ".75rem 1.5rem",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div style={{ marginBottom: "3rem", textAlign: "center" }}>
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 300,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: ".5rem",
          }}
        >
          {selectedDate.getDate()}{" "}
          {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <div style={{ fontSize: "1.5rem", color: colors.textMuted }}>
          {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>

      <div
        style={{
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: 20,
          padding: "2.5rem",
          boxShadow: "0 8px 15px -3px rgba(0,0,0,.1)",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: colors.textPrimary, marginBottom: "2rem" }}>
          Reminders for this day
        </h2>

        {hasReminders ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {dayReminders.map((reminder, index) => (
              <div
                key={index}
                onClick={() => onReminderClick(reminder)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem",
                  background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                  borderRadius: 16,
                  border: `2px solid ${getCategoryColor(reminder.category)}20`,
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: colors.textPrimary, fontSize: "1.125rem", marginBottom: 6 }}>
                    {reminder.title}
                  </div>
                  {reminder.time && (
                    <div style={{ fontSize: "1rem", color: colors.textSecondary }}>{reminder.time}</div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: ".875rem",
                    padding: ".75rem 1.25rem",
                    backgroundColor: getCategoryColor(reminder.category),
                    borderRadius: 25,
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {reminder.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem", opacity: 0.6 }}>📅</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: colors.textPrimary, marginBottom: ".75rem" }}>
              No reminders for this day
            </h3>
            <p style={{ color: colors.textMuted, fontSize: "1rem", lineHeight: 1.6, margin: "0 auto 2rem", maxWidth: 400 }}>
              Your day is clear! Add a new reminder to stay organized and make the most of your time.
            </p>
            <button
              onClick={onNewReminder}
              style={{
                padding: "1rem 2rem",
                background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
                color: "#fff",
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Add New Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   APP (enrutado simple + estados modales)
   ========================= */

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailReminder, setDetailReminder] = useState<Reminder | null>(null);

  const openDetail = (r: Reminder) => {
    setDetailReminder(r);
    setDetailOpen(true);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Para abrir Settings en una sección concreta desde el menú de perfil
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId | undefined>(undefined);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <SimpleDashboard
            onDaySelect={(date) => {
              setSelectedDate(date);
              setCurrentPage("day-detail");
            }}
            onReminderClick={openDetail}
          />
        );
      case "week":
        return <EnhancedWeekView onReminderClick={openDetail} />;
      case "statistics":
        return <StatisticsPage />;
      case "upcoming":
        return <UpcomingPage onReminderClick={openDetail} />;
      case "settings":
        return <SettingsPage initialSection={settingsSection} />;
      case "day-detail":
        return (
          <DayDetailView
            selectedDate={selectedDate}
            onNewReminder={() => setShowCreateModal(true)}
            onBackToDashboard={() => setCurrentPage("dashboard")}
            onReminderClick={openDetail}
          />
        );
      default:
        return (
          <SimpleDashboard
            onDaySelect={(date) => {
              setSelectedDate(date);
              setCurrentPage("day-detail");
            }}
            onReminderClick={openDetail}
          />
        );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <SimpleHeader
        onNewReminder={() => setShowCreateModal(true)}
        onOpenSettingsSection={(sectionId) => {
          setSettingsSection(sectionId);
          setCurrentPage("settings");
        }}
      />
      <SimpleNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderPage()}</main>

      {/* modal crear */}
      <EnhancedModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      {/* modal detalle */}
      <ReminderDetailModal open={detailOpen} reminder={detailReminder} onClose={() => setDetailOpen(false)} />
    </div>
  );
}

/* =========================
   HELPERS DE CALENDARIO
   ========================= */
// Matriz de 6x7, lunes como primer día de la semana
function getMonthMatrix(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  // pasar domingo(0) a 6, y lunes(1) a 0
  const startIdx = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(42).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells[startIdx + d - 1] = d;
  return cells;
}
