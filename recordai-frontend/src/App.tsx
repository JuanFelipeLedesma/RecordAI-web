import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Color palette for RecordAI
export const colors = {
  primary: "#03CEA4", // Royal blue
  primaryLight: "#3B82F6",
  primaryDark: "#1E40AF",

  // Category colors
  work: "#8B5CF6", // Purple
  birthday: "#F59E0B", // Amber
  shopping: "#10B981", // Emerald
  home: "#EF4444", // Red
  health: "#06B6D4", // Cyan
  other: "#6B7280", // Gray

  // Semantic colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Background colors
  background: "#F8FAFC", // Light blue-gray
  cardBackground: "#FFFFFF",
  hoverBackground: "#F1F5F9",

  // Text colors
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#64748B",
};

// Helper function to get category color
export const getCategoryColor = (category: string) => {
  if (category.includes("Work")) return colors.work;
  if (category.includes("Birthday")) return colors.birthday;
  if (category.includes("Shopping")) return colors.shopping;
  if (category.includes("Home")) return colors.home;
  if (category.includes("Health")) return colors.health;
  return colors.other;
};

// Simple inline components to avoid import issues
function SimpleHeader({
  onNewReminder,
}: {
  onNewReminder: () => void;
}) {
  const [showProfileDropdown, setShowProfileDropdown] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state

  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        padding: "1rem 8rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#ffffff",
        }}
      >
        RecordAI
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
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
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
        >
          New Reminder
        </button>

        {/* Profile Section */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setShowProfileDropdown(!showProfileDropdown)
            }
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: `linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: colors.primary,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(0, 0, 0, 0.1)";
            }}
          >
            J
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "0.5rem",
                background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                minWidth: "200px",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {/* User Info Section */}
              <div
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #e2e8f0",
                  backgroundColor: `${colors.primary}05`,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: colors.textPrimary,
                    fontSize: "0.875rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Juan Vargas
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: colors.textSecondary,
                  }}
                >
                  juan@example.com
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ padding: "0.5rem 0" }}>
                {isLoggedIn ? (
                  // Logged in menu items
                  <>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Handle account settings
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: colors.textPrimary,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.hoverBackground;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        ⚙️
                      </span>
                      Account Settings
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Handle preferences
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: colors.textPrimary,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.hoverBackground;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        🎯
                      </span>
                      Preferences
                    </button>

                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#e2e8f0",
                        margin: "0.5rem 0",
                      }}
                    />

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setIsLoggedIn(false);
                        // Handle logout
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: colors.error,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.error}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        🚪
                      </span>
                      Log Out
                    </button>
                  </>
                ) : (
                  // Not logged in menu items
                  <>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Handle sign in
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: colors.textPrimary,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          colors.hoverBackground;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        🔑
                      </span>
                      Sign In
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Handle register
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: colors.primary,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontWeight: 500,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>
                        ✨
                      </span>
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop to close dropdown when clicking outside */}
      {showProfileDropdown && (
        <div
          onClick={() => setShowProfileDropdown(false)}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 40,
          }}
        />
      )}
    </header>
  );
}

function SimpleNavigation({
  currentPage,
  onPageChange,
}: {
  currentPage: string;
  onPageChange: (page: string) => void;
}) {
  const pages = [
    {
      id: "dashboard",
      label: "Dashboard",
      color: colors.primary,
    },
    { id: "week", label: "Week", color: colors.work },
    {
      id: "statistics",
      label: "Statistics ",
      color: colors.success,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      color: colors.warning,
    },
    {
      id: "settings",
      label: "Settings",
      color: colors.textSecondary,
    },
  ];

  return (
    <nav
      style={{
        backgroundColor: colors.cardBackground,
        borderBottom: `1px solid #e2e8f0`,
        padding: "0 8rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            style={{
              backgroundColor:
                currentPage === page.id
                  ? `${page.color}10`
                  : "transparent",
              border: "none",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 500,
              color:
                currentPage === page.id
                  ? page.color
                  : colors.textSecondary,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== page.id) {
                e.currentTarget.style.backgroundColor =
                  colors.hoverBackground;
                e.currentTarget.style.color =
                  colors.textPrimary;
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== page.id) {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  colors.textSecondary;
              }
            }}
          >
            {page.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function SimpleDashboard({
  onDaySelect,
}: {
  onDaySelect: (date: Date) => void;
}) {
  const today = new Date();
  const dayNumber = today.getDate();

  return (
    <div
      style={{
        padding: "2rem 8rem",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* Main Content Grid - Perfect Alignment */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        {/* Left Column - Greeting + Calendar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Greeting Section */}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 200,
                  color: colors.textMuted,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {dayNumber}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: colors.textSecondary,
                  letterSpacing: "0.025em",
                }}
              >
                {today.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              flex: "1",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                {today.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>

            {/* Calendar Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "0.5rem",
              }}
            >
              {[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ].map((day) => (
                <div
                  key={day}
                  style={{
                    padding: "0.75rem",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: colors.textSecondary,
                  }}
                >
                  {day}
                </div>
              ))}

              {/* Enhanced calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 6 + 1;
                const isToday = dayNum === dayNumber;
                const hasReminder = [
                  5, 12, 18, 25, 28,
                ].includes(dayNum);

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (dayNum > 0 && dayNum <= 31) {
                        const selectedDate = new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          dayNum,
                        );
                        onDaySelect(selectedDate);
                      }
                    }}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      border: "none",
                      background: isToday
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                        : hasReminder
                          ? `${colors.success}20`
                          : "transparent",
                      color: isToday
                        ? "#ffffff"
                        : dayNum > 0 && dayNum <= 31
                          ? colors.textPrimary
                          : colors.textMuted,
                      cursor:
                        dayNum > 0 && dayNum <= 31
                          ? "pointer"
                          : "default",
                      fontSize: "1rem",
                      fontWeight: isToday ? 600 : 400,
                      transition: "all 0.2s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (
                        dayNum > 0 &&
                        dayNum <= 31 &&
                        !isToday
                      ) {
                        e.currentTarget.style.backgroundColor =
                          colors.hoverBackground;
                        e.currentTarget.style.transform =
                          "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (
                        dayNum > 0 &&
                        dayNum <= 31 &&
                        !isToday
                      ) {
                        e.currentTarget.style.backgroundColor =
                          hasReminder
                            ? `${colors.success}20`
                            : "transparent";
                        e.currentTarget.style.transform =
                          "scale(1)";
                      }
                    }}
                  >
                    {dayNum > 0 && dayNum <= 31 ? dayNum : ""}
                    {hasReminder && !isToday && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: colors.success,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Reminder Blocks */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            height: "100%",
          }}
        >
          {/* Next Reminders Block */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              flex: "1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Next reminders
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flex: "1",
              }}
            >
              {[
                {
                  title: "Study Calculus",
                  time: "14:30",
                  category: "Home",
                },
                {
                  title: "Buy fruit",
                  time: "16:00",
                  category: "Shopping",
                },
                {
                  title: "Finish book",
                  time: "19:00",
                  category: "Other",
                },
              ].map((reminder, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                    borderRadius: "12px",
                    border: `1px solid ${getCategoryColor(reminder.category)}30`,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: colors.textPrimary,
                        fontSize: "0.875rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {reminder.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: colors.textSecondary,
                      }}
                    >
                      {reminder.time}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: getCategoryColor(
                        reminder.category,
                      ),
                      borderRadius: "20px",
                      color: "#ffffff",
                      fontWeight: 500,
                      boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`,
                    }}
                  >
                    {reminder.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Week Block */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              flex: "1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Next week
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flex: "1",
              }}
            >
              {[
                {
                  title: "Team meeting",
                  time: "Aug 28",
                  category: "Work",
                },
                {
                  title: "Birthday party",
                  time: "Aug 30",
                  category: "Birthday",
                },
              ].map((reminder, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                    borderRadius: "12px",
                    border: `1px solid ${getCategoryColor(reminder.category)}30`,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: colors.textPrimary,
                        fontSize: "0.875rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {reminder.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: colors.textSecondary,
                      }}
                    >
                      {reminder.time}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: getCategoryColor(
                        reminder.category,
                      ),
                      borderRadius: "20px",
                      color: "#ffffff",
                      fontWeight: 500,
                      boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`,
                    }}
                  >
                    {reminder.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedWeekView() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDays = (weekOffset: number = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff =
      startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);
  const dayNames = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const weekReminders = {
    0: [
      {
        title: "Study Calculus",
        time: "14:30",
        category: "Home",
      },
      {
        title: "Buy fruit",
        time: "16:00",
        category: "Shopping",
      },
    ],
    1: [
      {
        title: "Team meeting",
        time: "09:00",
        category: "Work",
      },
    ],
    2: [
      {
        title: "Doctor appointment",
        time: "10:00",
        category: "Health",
      },
      {
        title: "Finish book",
        time: "19:00",
        category: "Other",
      },
    ],
    3: [
      { title: "Gym session", time: "18:00", category: "Home" },
    ],
    4: [
      {
        title: "Grocery shopping",
        time: "11:00",
        category: "Shopping",
      },
      {
        title: "Movie night",
        time: "20:00",
        category: "Other",
      },
    ],
    5: [
      {
        title: "Birthday party",
        time: "15:00",
        category: "Birthday",
      },
    ],
    6: [{ title: "Rest day", category: "Home" }],
  };

  return (
    <div
      style={{
        padding: "2rem 8rem",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* Sticky Week Navigation */}
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 10,
          marginBottom: "2rem",
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => setCurrentWeek(currentWeek - 1)}
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "0.75rem",
            cursor: "pointer",
            fontSize: "1.125rem",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
        >
          ‹
        </button>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            background: `linear-gradient(135deg, ${colors.work} 0%, ${colors.primary} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {weekDays[0].getDate()}{" "}
          {weekDays[0].toLocaleDateString("en", {
            month: "short",
          })}{" "}
          - {weekDays[6].getDate()}{" "}
          {weekDays[6].toLocaleDateString("en", {
            month: "short",
          })}
        </h2>

        <button
          onClick={() => setCurrentWeek(currentWeek + 1)}
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "0.75rem",
            cursor: "pointer",
            fontSize: "1.125rem",
            fontWeight: 600,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
        >
          ›
        </button>
      </div>

      {/* Week Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1rem",
        }}
      >
        {weekDays.map((day, index) => {
          const isToday =
            day.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
                border: isToday
                  ? `2px solid ${colors.primary}`
                  : "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "1.5rem",
                minHeight: "400px",
                boxShadow: isToday
                  ? `0 8px 15px -3px ${colors.primary}20`
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: isToday
                      ? colors.primary
                      : colors.textPrimary,
                    fontSize: "0.875rem",
                  }}
                >
                  {dayNames[index]}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: isToday
                      ? colors.primary
                      : colors.textSecondary,
                    marginTop: "0.25rem",
                  }}
                >
                  {day.getDate()}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {(weekReminders[index] || []).map(
                  (reminder, reminderIndex) => (
                    <div
                      key={reminderIndex}
                      style={{
                        padding: "1rem",
                        background: `linear-gradient(135deg, ${getCategoryColor(reminder.category)}10 0%, #ffffff 100%)`,
                        borderRadius: "12px",
                        border: `1px solid ${getCategoryColor(reminder.category)}30`,
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 8px rgba(0, 0, 0, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "none";
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: colors.textPrimary,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {reminder.title}
                      </div>
                      {reminder.time && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: colors.textSecondary,
                            marginBottom: "0.5rem",
                          }}
                        >
                          {reminder.time}
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: "0.625rem",
                          padding: "0.25rem 0.75rem",
                          backgroundColor: getCategoryColor(
                            reminder.category,
                          ),
                          borderRadius: "20px",
                          color: "#ffffff",
                          fontWeight: 500,
                          display: "inline-block",
                          boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`,
                        }}
                      >
                        {reminder.category}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("Last month");

  const chartData = [
    { name: "Work", value: 35, color: colors.work },
    { name: "Home", value: 25, color: colors.home },
    { name: "Shopping", value: 20, color: colors.shopping },
    { name: "Health", value: 10, color: colors.health },
    { name: "Birthday", value: 10, color: colors.birthday },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
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
          <p
            style={{
              color: colors.textPrimary,
              fontWeight: 600,
            }}
          >
            {`${payload[0].name}: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        padding: "2rem 8rem",
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

        {/* Time Range Selector */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          {["Last month", "Last 3 months", "Custom"].map(
            (range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: "0.75rem 1.5rem",
                  border:
                    timeRange === range
                      ? `2px solid ${colors.primary}`
                      : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor:
                    timeRange === range
                      ? `${colors.primary}10`
                      : colors.cardBackground,
                  color:
                    timeRange === range
                      ? colors.primary
                      : colors.textSecondary,
                  cursor: "pointer",
                  fontWeight: timeRange === range ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (timeRange !== range) {
                    e.currentTarget.style.backgroundColor =
                      colors.hoverBackground;
                    e.currentTarget.style.borderColor =
                      colors.textSecondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (timeRange !== range) {
                    e.currentTarget.style.backgroundColor =
                      colors.cardBackground;
                    e.currentTarget.style.borderColor =
                      "#e2e8f0";
                  }
                }}
              >
                {range}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto auto",
          gap: "2rem",
        }}
      >
        {/* Top Row: Chart and Categories side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Pie Chart */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              height: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "2rem",
              }}
            >
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
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Categories Legend */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              height: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "2rem",
              }}
            >
              Categories
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {chartData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem",
                    backgroundColor: `${item.color}10`,
                    borderRadius: "8px",
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: item.color,
                      borderRadius: "20px",
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: colors.textPrimary,
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Quick Stats spanning full width */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: "2rem",
            }}
          >
            Quick Stats
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: `${colors.primary}10`,
                borderRadius: "12px",
                border: `1px solid ${colors.primary}30`,
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: colors.primary,
                  marginBottom: "0.5rem",
                }}
              >
                47
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Total Reminders
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: `${colors.success}10`,
                borderRadius: "12px",
                border: `1px solid ${colors.success}30`,
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: colors.success,
                  marginBottom: "0.5rem",
                }}
              >
                32
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Completed
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "1.5rem",
                backgroundColor: `${colors.success}10`,
                borderRadius: "12px",
                border: `1px solid ${colors.success}30`,
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: colors.success,
                  marginBottom: "0.5rem",
                }}
              >
                68%
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingPage() {
  const [selectedReminders, setSelectedReminders] = useState<
    number[]
  >([]);

  const upcomingReminders = [
    {
      id: 1,
      title: "Study Calculus",
      time: "14:30",
      date: "Today",
      category: "Home",
      completed: false,
    },
    {
      id: 2,
      title: "Buy fruit",
      time: "16:00",
      date: "Today",
      category: "Shopping",
      completed: false,
    },
    {
      id: 3,
      title: "Team meeting",
      time: "09:00",
      date: "Tomorrow",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      title: "Doctor appointment",
      time: "10:00",
      date: "Sep 18",
      category: "Health",
      completed: false,
    },
    {
      id: 5,
      title: "Birthday party",
      time: "15:00",
      date: "Sep 20",
      category: "Birthday",
      completed: false,
    },
  ];

  const toggleReminder = (id: number) => {
    setSelectedReminders((prev) =>
      prev.includes(id)
        ? prev.filter((reminderId) => reminderId !== id)
        : [...prev, id],
    );
  };

  const toggleAll = () => {
    setSelectedReminders(
      selectedReminders.length === upcomingReminders.length
        ? []
        : upcomingReminders.map((r) => r.id),
    );
  };

  return (
    <div
      style={{
        padding: "2rem 8rem",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Left Column - Reminder List */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Bulk Actions */}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <button
                onClick={toggleAll}
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  border: `2px solid ${colors.primary}`,
                  borderRadius: "4px",
                  backgroundColor:
                    selectedReminders.length ===
                    upcomingReminders.length
                      ? colors.primary
                      : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                }}
              >
                {selectedReminders.length ===
                  upcomingReminders.length && "✓"}
              </button>
              <span
                style={{
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                {selectedReminders.length} selected
              </span>
            </div>

            {selectedReminders.length > 0 && (
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: colors.error,
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    colors.error;
                }}
              >
                Delete Selected
              </button>
            )}
          </div>

          {/* Reminder List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.5rem",
                  backgroundColor: selectedReminders.includes(
                    reminder.id,
                  )
                    ? `${colors.primary}10`
                    : colors.hoverBackground,
                  borderRadius: "12px",
                  border: selectedReminders.includes(
                    reminder.id,
                  )
                    ? `2px solid ${colors.primary}30`
                    : "1px solid #e2e8f0",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onClick={() => toggleReminder(reminder.id)}
                onMouseEnter={(e) => {
                  if (
                    !selectedReminders.includes(reminder.id)
                  ) {
                    e.currentTarget.style.backgroundColor =
                      "#ffffff";
                    e.currentTarget.style.transform =
                      "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    !selectedReminders.includes(reminder.id)
                  ) {
                    e.currentTarget.style.backgroundColor =
                      colors.hoverBackground;
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <button
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    border: `2px solid ${colors.primary}`,
                    borderRadius: "4px",
                    backgroundColor: selectedReminders.includes(
                      reminder.id,
                    )
                      ? colors.primary
                      : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReminder(reminder.id);
                  }}
                >
                  {selectedReminders.includes(reminder.id) &&
                    "✓"}
                </button>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: colors.textPrimary,
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {reminder.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: colors.textSecondary,
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <span>{reminder.time}</span>
                    <span>•</span>
                    <span>{reminder.date}</span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.5rem 0.75rem",
                    backgroundColor: getCategoryColor(
                      reminder.category,
                    ),
                    borderRadius: "20px",
                    color: "#ffffff",
                    fontWeight: 500,
                    boxShadow: `0 2px 4px ${getCategoryColor(reminder.category)}30`,
                  }}
                >
                  {reminder.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Next Month */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Next Month
          </h3>

          {/* Empty State Illustration */}
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              📅
            </div>
            <h4
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "0.5rem",
              }}
            >
              No reminders yet
            </h4>
            <p
              style={{
                color: colors.textSecondary,
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              You're all set for next month! Create new
              reminders to stay organized.
            </p>
            <button
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.875rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 4px rgba(0, 0, 0, 0.1)";
              }}
            >
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState<
    string | null
  >(null);
  const [settings, setSettings] = useState({
    notifications: true,
    email: "juan@example.com",
    quietHours: { start: "22:00", end: "07:00" },
    bypassDND: false,
    emailVerified: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSection(
      expandedSection === section ? null : section,
    );
  };

  const sections = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                Enable Notifications
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: colors.textSecondary,
                }}
              >
                Receive reminder notifications
              </div>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  notifications: !settings.notifications,
                })
              }
              style={{
                width: "3rem",
                height: "1.5rem",
                backgroundColor: settings.notifications
                  ? colors.primary
                  : "#D1D5DB",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "0.25rem",
                  left: settings.notifications
                    ? "1.75rem"
                    : "0.25rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </button>
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "1rem",
              }}
            >
              Quiet Hours
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.875rem",
                    color: colors.textSecondary,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Start
                </label>
                <input
                  type="time"
                  value={settings.quietHours.start}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      quietHours: {
                        ...settings.quietHours,
                        start: e.target.value,
                      },
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.875rem",
                    color: colors.textSecondary,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  End
                </label>
                <input
                  type="time"
                  value={settings.quietHours.end}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      quietHours: {
                        ...settings.quietHours,
                        end: e.target.value,
                      },
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                Bypass Do Not Disturb
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: colors.textSecondary,
                }}
              >
                Show critical reminders even in DND mode
              </div>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  bypassDND: !settings.bypassDND,
                })
              }
              style={{
                width: "3rem",
                height: "1.5rem",
                backgroundColor: settings.bypassDND
                  ? colors.primary
                  : "#D1D5DB",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "0.25rem",
                  left: settings.bypassDND
                    ? "1.75rem"
                    : "0.25rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Email Address
            </label>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: e.target.value,
                  })
                }
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                }}
              />
              <div
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: settings.emailVerified
                    ? `${colors.success}10`
                    : `${colors.warning}10`,
                  color: settings.emailVerified
                    ? colors.success
                    : colors.warning,
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  border: `1px solid ${settings.emailVerified ? colors.success : colors.warning}30`,
                }}
              >
                {settings.emailVerified
                  ? "✓ Verified"
                  : "⚠ Unverified"}
              </div>
            </div>
          </div>

          {!settings.emailVerified && (
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: colors.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.primary;
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <h4
              style={{
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "0.5rem",
              }}
            >
              Data Export
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                marginBottom: "1rem",
              }}
            >
              Download all your data in JSON format
            </p>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: colors.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.primary;
              }}
            >
              Export Data
            </button>
          </div>

          <div>
            <h4
              style={{
                fontWeight: 600,
                color: colors.error,
                marginBottom: "0.5rem",
              }}
            >
              Delete Account
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.textSecondary,
                marginBottom: "1rem",
              }}
            >
              Permanently delete your account and all data
            </p>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: colors.error,
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "#DC2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.error;
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: colors.textSecondary }}>
              Version
            </span>
            <span
              style={{
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              1.2.0
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: colors.textSecondary }}>
              Build
            </span>
            <span
              style={{
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              2024.09.15
            </span>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <a
              href="#"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Terms of Service
            </a>
            <a
              href="#"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Support Center
            </a>
          </div>
        </div>
      ),
    },
    {
      id: "history",
      title: "History",
      description: "Log of recent changes",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {[
            {
              date: "Sep 15, 2024",
              action: 'Created reminder "Study Calculus"',
              time: "2:30 PM",
            },
            {
              date: "Sep 14, 2024",
              action: 'Completed reminder "Buy groceries"',
              time: "5:45 PM",
            },
            {
              date: "Sep 13, 2024",
              action: 'Updated reminder "Team meeting"',
              time: "10:20 AM",
            },
            {
              date: "Sep 12, 2024",
              action: 'Deleted reminder "Old task"',
              time: "3:15 PM",
            },
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
              <div
                style={{
                  fontWeight: 600,
                  color: colors.textPrimary,
                  fontSize: "0.875rem",
                }}
              >
                {item.action}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.textSecondary,
                  marginTop: "0.25rem",
                }}
              >
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
        padding: "2rem 8rem",
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

      <div style={{ maxWidth: "800px" }}>
        {sections.map((section) => (
          <div
            key={section.id}
            style={{
              background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              marginBottom: "1rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: "100%",
                padding: "1.5rem",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colors.hoverBackground;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: "0.25rem",
                  }}
                >
                  {section.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: colors.textSecondary,
                  }}
                >
                  {section.description}
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  color: colors.textSecondary,
                  transform:
                    expandedSection === section.id
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                ▼
              </div>
            </button>

            {expandedSection === section.id && (
              <div
                style={{
                  padding: "0 1.5rem 1.5rem 1.5rem",
                  borderTop: "1px solid #e2e8f0",
                  backgroundColor: colors.hoverBackground,
                  animation: "fadeIn 0.2s ease",
                }}
              >
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EnhancedModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateFrom: "",
    dateTo: "",
    time: "",
    location: "",
    category: "Home",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.title.trim())
      newErrors.title = "Title is required";
    if (!formData.dateFrom)
      newErrors.dateFrom = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        dateFrom: "",
        dateTo: "",
        time: "",
        location: "",
        category: "Home",
      });
      setErrors({});
    }
  };

  const categories = [
    "Home",
    "Work",
    "Shopping",
    "Health",
    "Birthday",
    "Other",
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          borderRadius: "20px",
          padding: "2rem",
          width: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          border: "1px solid #e2e8f0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
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
              borderRadius: "8px",
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                colors.error;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.error}10`;
              e.currentTarget.style.color = colors.error;
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Title */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: colors.textPrimary,
                fontSize: "0.875rem",
              }}
            >
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: `2px solid ${errors.title ? colors.error : "#e2e8f0"}`,
                borderRadius: "12px",
                fontSize: "1rem",
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                transition: "all 0.2s ease",
                outline: "none",
              }}
              placeholder="Enter reminder title"
              onFocus={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.borderColor =
                    colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }
              }}
              onBlur={(e) => {
                if (!errors.title) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
            {errors.title && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.error,
                  marginTop: "0.5rem",
                }}
              >
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: colors.textPrimary,
                fontSize: "0.875rem",
              }}
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: `2px solid #e2e8f0`,
                borderRadius: "12px",
                fontSize: "1rem",
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                transition: "all 0.2s ease",
                outline: "none",
                resize: "vertical",
              }}
              placeholder="Enter description (optional)"
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  colors.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Date Range */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: colors.textPrimary,
                fontSize: "0.875rem",
              }}
            >
              Date Range *
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: colors.textSecondary,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  From
                </label>
                <input
                  type="date"
                  value={formData.dateFrom}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateFrom: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: `2px solid ${errors.dateFrom ? colors.error : "#e2e8f0"}`,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    backgroundColor: colors.cardBackground,
                    color: colors.textPrimary,
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    if (!errors.dateFrom) {
                      e.currentTarget.style.borderColor =
                        colors.success;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.success}20`;
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.dateFrom) {
                      e.currentTarget.style.borderColor =
                        "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: colors.textSecondary,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  To (optional)
                </label>
                <input
                  type="date"
                  value={formData.dateTo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateTo: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: `2px solid #e2e8f0`,
                    borderRadius: "12px",
                    fontSize: "1rem",
                    backgroundColor: colors.cardBackground,
                    color: colors.textPrimary,
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      colors.success;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.success}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
            {errors.dateFrom && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.error,
                  marginTop: "0.5rem",
                }}
              >
                {errors.dateFrom}
              </div>
            )}
          </div>

          {/* Time and Category */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                  color: colors.textPrimary,
                  fontSize: "0.875rem",
                }}
              >
                Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    time: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: `2px solid ${errors.time ? colors.error : "#e2e8f0"}`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  if (!errors.time) {
                    e.currentTarget.style.borderColor =
                      colors.warning;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.warning}20`;
                  }
                }}
                onBlur={(e) => {
                  if (!errors.time) {
                    e.currentTarget.style.borderColor =
                      "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              />
              {errors.time && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: colors.error,
                    marginTop: "0.5rem",
                  }}
                >
                  {errors.time}
                </div>
              )}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                  color: colors.textPrimary,
                  fontSize: "0.875rem",
                }}
              >
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: `2px solid #e2e8f0`,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor: colors.cardBackground,
                  color: colors.textPrimary,
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.work;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.work}20`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: colors.textPrimary,
                fontSize: "0.875rem",
              }}
            >
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                border: `2px solid #e2e8f0`,
                borderRadius: "12px",
                fontSize: "1rem",
                backgroundColor: colors.cardBackground,
                color: colors.textPrimary,
                transition: "all 0.2s ease",
                outline: "none",
              }}
              placeholder="Enter location (optional)"
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  colors.health;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.health}20`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.75rem 1.5rem",
              border: `2px solid #e2e8f0`,
              borderRadius: "12px",
              backgroundColor: colors.cardBackground,
              color: colors.textSecondary,
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                colors.textSecondary;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color =
                colors.textSecondary;
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: `0 4px 6px ${colors.primary}30`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-1px)";
              e.currentTarget.style.boxShadow = `0 6px 10px ${colors.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 6px ${colors.primary}30`;
            }}
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

function DayDetailView({
  selectedDate,
  onNewReminder,
  onBackToDashboard,
}: {
  selectedDate: Date | null;
  onNewReminder: () => void;
  onBackToDashboard: () => void;
}) {
  // Sample reminder data for specific dates
  const getDayReminders = (date: Date | null) => {
    if (!date) return [];

    const dayOfMonth = date.getDate();

    // Sample reminders based on day of month
    const remindersByDay: { [key: number]: any[] } = {
      15: [
        {
          title: "Team Meeting",
          time: "09:00",
          category: "Work",
        },
        {
          title: "Lunch with Sarah",
          time: "12:30",
          category: "Other",
        },
        {
          title: "Gym Session",
          time: "18:00",
          category: "Health",
        },
      ],
      18: [
        {
          title: "Birthday Party",
          time: "19:00",
          category: "Birthday",
        },
      ],
      25: [
        {
          title: "Grocery Shopping",
          time: "10:00",
          category: "Shopping",
        },
        {
          title: "Study Calculus",
          time: "14:30",
          category: "Home",
        },
      ],
    };

    return remindersByDay[dayOfMonth] || [];
  };

  const dayReminders = getDayReminders(selectedDate);
  const hasReminders = dayReminders.length > 0;

  if (!selectedDate) {
    return (
      <div
        style={{
          padding: "2rem 8rem",
          background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: "1.25rem",
          }}
        >
          No date selected
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem 8rem",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={onBackToDashboard}
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Date Header */}
      <div
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 300,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.work} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          {selectedDate.getDate()}{" "}
          {selectedDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            color: colors.textMuted,
            letterSpacing: "0.025em",
          }}
        >
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </div>
      </div>

      {/* Reminders Card */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.cardBackground} 0%, #fefefe 100%)`,
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "2.5rem",
          boxShadow:
            "0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            color: colors.textPrimary,
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}></span>
          Reminders for this day
        </h2>

        {hasReminders ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {dayReminders.map((reminder, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem",
                  background: `linear-gradient(135deg, ${colors.hoverBackground} 0%, #ffffff 100%)`,
                  borderRadius: "16px",
                  border: `2px solid ${getCategoryColor(reminder.category)}20`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.12)";
                  e.currentTarget.style.borderColor = `${getCategoryColor(reminder.category)}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${getCategoryColor(reminder.category)}20`;
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: colors.textPrimary,
                      fontSize: "1.125rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {reminder.title}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: colors.textSecondary,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{ fontSize: "0.875rem" }}
                    ></span>
                    {reminder.time}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    padding: "0.75rem 1.25rem",
                    backgroundColor: getCategoryColor(
                      reminder.category,
                    ),
                    borderRadius: "25px",
                    color: "#ffffff",
                    fontWeight: 600,
                    boxShadow: `0 4px 8px ${getCategoryColor(reminder.category)}30`,
                    textTransform: "capitalize",
                  }}
                >
                  {reminder.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1.5rem",
                opacity: 0.6,
              }}
            >
              📅
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: colors.textPrimary,
                marginBottom: "0.75rem",
              }}
            >
              No reminders for this day
            </h3>
            <p
              style={{
                color: colors.textMuted,
                fontSize: "1rem",
                lineHeight: 1.6,
                marginBottom: "2rem",
                maxWidth: "400px",
                margin: "0 auto 2rem auto",
              }}
            >
              Your day is clear! Add a new reminder to stay
              organized and make the most of your time.
            </p>
            <button
              onClick={onNewReminder}
              style={{
                padding: "1rem 2rem",
                background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
                color: "#ffffff",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: `0 6px 12px ${colors.success}30`,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                margin: "0 auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 16px ${colors.success}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow = `0 6px 12px ${colors.success}30`;
              }}
            >
              <span style={{ fontSize: "1.25rem" }}></span>
              Add New Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    null,
  );

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <SimpleDashboard
            onDaySelect={(date) => {
              setSelectedDate(date);
              setCurrentPage("day-detail");
            }}
          />
        );
      case "week":
        return <EnhancedWeekView />;
      case "statistics":
        return <StatisticsPage />;
      case "upcoming":
        return <UpcomingPage />;
      case "settings":
        return <SettingsPage />;
      case "day-detail":
        return (
          <DayDetailView
            selectedDate={selectedDate}
            onNewReminder={() => setShowModal(true)}
            onBackToDashboard={() =>
              setCurrentPage("dashboard")
            }
          />
        );
      default:
        return (
          <SimpleDashboard
            onDaySelect={(date) => {
              setSelectedDate(date);
              setCurrentPage("day-detail");
            }}
          />
        );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <SimpleHeader onNewReminder={() => setShowModal(true)} />
      <SimpleNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <main>{renderPage()}</main>
      <EnhancedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}