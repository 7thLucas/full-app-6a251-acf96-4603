import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingDown, Award } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import {
  mockSpendingCategories,
  mockWeeklyData,
  totalMonthlySpend,
} from "~/data/mock";

type Period = "week" | "month" | "3months";

const PERIOD_OPTIONS: { key: Period; label: string }[] = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "3months", label: "Last 3 Months" },
];

function fmt(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function CustomTooltip({ active, payload, label, currency }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 12,
          color: "#f1f5f9",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4, color: "#94a3b8" }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: p.color,
                display: "inline-block",
              }}
            />
            <span style={{ color: "#94a3b8" }}>{p.name}:</span>
            <span style={{ fontWeight: 600 }}>{currency}{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function AnalyticsPage() {
  const { config, loading } = useConfigurables();
  const currency = loading ? "$" : (config.currencySymbol ?? "$");

  const [period, setPeriod] = useState<Period>("month");

  const periodMultiplier = period === "week" ? 0.25 : period === "3months" ? 2.8 : 1;
  const periodTotal = Math.round(totalMonthlySpend * periodMultiplier);

  const adjustedCategories = mockSpendingCategories.map((c) => ({
    ...c,
    amount: Math.round(c.amount * periodMultiplier),
  }));

  const biggestCategory = [...adjustedCategories].sort(
    (a, b) => b.amount - a.amount
  )[0];

  const adjustedWeekly = mockWeeklyData.map((w) => ({
    ...w,
    thisMonth: Math.round(w.thisMonth * periodMultiplier),
    lastMonth: Math.round(w.lastMonth * periodMultiplier),
  }));

  return (
    <div style={{ padding: "0 20px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 20 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        >
          Analytics
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Understand your spending patterns
        </p>
      </div>

      {/* Period Selector */}
      <div
        style={{
          display: "flex",
          background: "#1e293b",
          borderRadius: 14,
          padding: 4,
          marginBottom: 24,
        }}
      >
        {PERIOD_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            style={{
              flex: 1,
              padding: "9px 8px",
              borderRadius: 11,
              border: "none",
              background: period === key ? "#2563eb" : "transparent",
              color: period === key ? "#fff" : "#64748b",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 200ms",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Spend Summary Cards */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div
          style={{
            flex: 1,
            background: "#1e293b",
            borderRadius: 16,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <TrendingDown size={14} color="#ef4444" />
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Total Spend
            </span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            {fmt(periodTotal, currency)}
          </div>
          <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>
            {period === "month" ? "+8.2%" : period === "week" ? "+3.1%" : "+15.4%"} vs prior period
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#1e293b",
            borderRadius: 16,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Award size={14} color="#f59e0b" />
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Top Category
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
            {biggestCategory.icon} {biggestCategory.name}
          </div>
          <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 2 }}>
            {fmt(biggestCategory.amount, currency)} spent
          </div>
        </div>
      </div>

      {/* Donut Chart */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 20,
          padding: "20px 20px 16px",
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          Spending by Category
        </h2>
        <div style={{ position: "relative", height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={adjustedCategories}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={85}
                paddingAngle={3}
                dataKey="amount"
                nameKey="name"
                animationBegin={0}
                animationDuration={600}
              >
                {adjustedCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    const pct = Math.round((d.amount / periodTotal) * 100);
                    return (
                      <div
                        style={{
                          background: "#0f172a",
                          border: "1px solid #334155",
                          borderRadius: 10,
                          padding: "8px 12px",
                          fontSize: 12,
                          color: "#f1f5f9",
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>
                          {d.icon} {d.name}
                        </div>
                        <div style={{ color: d.color, fontWeight: 600 }}>
                          {fmt(d.amount, currency)} ({pct}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Total
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {fmt(periodTotal, currency)}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {adjustedCategories.map((cat) => {
            const pct = Math.round((cat.amount / periodTotal) * 100);
            return (
              <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 5, flex: "1 1 45%" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: cat.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: "#94a3b8", flex: 1 }}>{cat.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9" }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar Chart */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 20,
          padding: "20px 12px 16px",
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
            paddingLeft: 8,
          }}
        >
          Weekly Comparison
        </h2>
        <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px", paddingLeft: 8 }}>
          Current vs. previous period
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={adjustedWeekly} barGap={4} barCategoryGap="30%">
            <XAxis
              dataKey="week"
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip currency={currency} />} />
            <Bar
              dataKey="thisMonth"
              name="Current"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            />
            <Bar
              dataKey="lastMonth"
              name="Previous"
              fill="#334155"
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#94a3b8", fontSize: 11, fontWeight: 500 }}>{value}</span>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown List */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 20,
          padding: "20px 20px 4px",
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          Category Breakdown
        </h2>
        {adjustedCategories
          .sort((a, b) => b.amount - a.amount)
          .map((cat) => {
            const pct = Math.round((cat.amount / periodTotal) * 100);
            return (
              <div
                key={cat.name}
                style={{
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>
                      {cat.name}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>
                      {fmt(cat.amount, currency)}
                    </span>
                    <span style={{ fontSize: 12, color: "#64748b", marginLeft: 6 }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    height: 6,
                    background: "#0f172a",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: cat.color,
                      borderRadius: 3,
                      transition: "width 600ms ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
