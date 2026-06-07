import { useState } from "react";
import { Search } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { mockTransactions, type Transaction, type TransactionCategory } from "~/data/mock";

const CATEGORY_COLORS: Record<string, string> = {
  food: "#22c55e",
  transport: "#f59e0b",
  shopping: "#3b82f6",
  subscriptions: "#ec4899",
  entertainment: "#a855f7",
  health: "#06b6d4",
  income: "#22c55e",
  travel: "#f97316",
  utilities: "#64748b",
};

type FilterTab = "all" | TransactionCategory;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "transport", label: "Transport" },
  { key: "shopping", label: "Shopping" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "income", label: "Income" },
];

function fmt(amount: number, symbol: string) {
  return `${symbol}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function groupByDate(transactions: Transaction[]): Record<string, Transaction[]> {
  const groups: Record<string, Transaction[]> = {};
  for (const tx of transactions) {
    const date = new Date(tx.date);
    const key = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  }
  return groups;
}

function TransactionRow({ tx, symbol }: { tx: Transaction; symbol: string }) {
  const isPositive = tx.amount > 0;
  const date = new Date(tx.date);
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 16px",
        borderRadius: 12,
        marginBottom: 4,
        background: "transparent",
        cursor: "pointer",
        transition: "background 150ms",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "#1e293b")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "transparent")
      }
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {tx.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#f1f5f9",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tx.merchant}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: CATEGORY_COLORS[tx.category] ?? "#64748b",
              background: `${CATEGORY_COLORS[tx.category] ?? "#64748b"}22`,
              borderRadius: 20,
              padding: "1px 7px",
            }}
          >
            {tx.category}
          </span>
          <span style={{ fontSize: 11, color: "#64748b" }}>{timeStr}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: isPositive ? "#22c55e" : "#f1f5f9",
          }}
        >
          {isPositive ? "+" : "-"}{fmt(tx.amount, symbol)}
        </div>
        {tx.note && (
          <div style={{ fontSize: 10, color: "#64748b", marginTop: 2, maxWidth: 80, textAlign: "right" }}>
            {tx.note}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { config, loading } = useConfigurables();
  const currency = loading ? "$" : (config.currencySymbol ?? "$");

  const [filter, setFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockTransactions.filter((tx) => {
    const matchesCategory = filter === "all" || tx.category === filter;
    const matchesSearch =
      !searchQuery ||
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const grouped = groupByDate(filtered);
  const dateKeys = Object.keys(grouped);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "56px 20px 16px" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        >
          Transactions
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          {mockTransactions.length} transactions this month
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "0 20px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#1e293b",
            borderRadius: 14,
            padding: "0 16px",
            height: 48,
          }}
        >
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#f1f5f9",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "0 20px 16px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {FILTER_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              flexShrink: 0,
              padding: "7px 16px",
              borderRadius: 20,
              border: "1.5px solid",
              borderColor: filter === key ? "#2563eb" : "#1e293b",
              background: filter === key ? "rgba(37, 99, 235, 0.15)" : "#1e293b",
              color: filter === key ? "#3b82f6" : "#64748b",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 150ms",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grouped Transactions */}
      <div style={{ padding: "0 8px" }}>
        {dateKeys.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 20px",
              color: "#64748b",
              fontSize: 14,
            }}
          >
            No transactions found
          </div>
        ) : (
          dateKeys.map((dateKey) => (
            <div key={dateKey} style={{ marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748b",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 12px 4px",
                }}
              >
                {dateKey}
              </div>
              {grouped[dateKey].map((tx) => (
                <TransactionRow key={tx.id} tx={tx} symbol={currency} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
