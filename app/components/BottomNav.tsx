import { NavLink } from "react-router";
import { Home, CreditCard, List, BarChart2 } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";

export default function BottomNav() {
  const { config, loading } = useConfigurables();

  const navLabels = loading
    ? { home: "Home", cards: "Cards", transactions: "Activity", analytics: "Analytics" }
    : {
        home: config.navLabels?.home ?? "Home",
        cards: config.navLabels?.cards ?? "Cards",
        transactions: config.navLabels?.transactions ?? "Activity",
        analytics: config.navLabels?.analytics ?? "Analytics",
      };

  const showCards = loading ? true : (config.showCardManagement ?? true);
  const showAnalytics = loading ? true : (config.showAnalytics ?? true);

  const tabs = [
    { to: "/", label: navLabels.home, Icon: Home, exact: true },
    ...(showCards ? [{ to: "/cards", label: navLabels.cards, Icon: CreditCard, exact: false }] : []),
    { to: "/transactions", label: navLabels.transactions, Icon: List, exact: false },
    ...(showAnalytics ? [{ to: "/analytics", label: navLabels.analytics, Icon: BarChart2, exact: false }] : []),
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "#0f172a",
        borderTop: "1px solid #1e293b",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          height: 64,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {tabs.map(({ to, label, Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            style={({ isActive }) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              flex: 1,
              height: "100%",
              color: isActive ? "#2563eb" : "#64748b",
              textDecoration: "none",
              transition: "color 150ms",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ color: isActive ? "#2563eb" : "#64748b" }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.03em",
                    color: isActive ? "#2563eb" : "#64748b",
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: 20,
                      height: 2,
                      borderRadius: 2,
                      background: "#2563eb",
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
