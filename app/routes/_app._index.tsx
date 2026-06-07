import { useState } from "react";
import { Bell, Eye, EyeOff, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import {
  mockAccount,
  mockTransactions,
  type Transaction,
} from "~/data/mock";
import {
  Send,
  Download,
  CreditCard,
  PlusCircle,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function fmt(amount: number, symbol: string) {
  return `${symbol}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const QUICK_ICON_MAP: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  send: Send,
  download: Download,
  "credit-card": CreditCard,
  "plus-circle": PlusCircle,
};

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

function TransactionRow({ tx, symbol }: { tx: Transaction; symbol: string }) {
  const isPositive = tx.amount > 0;
  const date = new Date(tx.date);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {tx.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#f1f5f9",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tx.merchant}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
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
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{dateStr}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { config, loading } = useConfigurables();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const appName = loading ? "Vault" : (config.appName ?? "Vault");
  const userName = loading ? "Alex" : (config.userName ?? "Alex Johnson");
  const currency = loading ? "$" : (config.currencySymbol ?? "$");
  const greeting = loading ? "Good morning" : (config.welcomeMessage ?? getGreeting());
  const quickActions = loading
    ? [
        { label: "Send", icon: "send" },
        { label: "Receive", icon: "download" },
        { label: "Pay", icon: "credit-card" },
        { label: "Top Up", icon: "plus-circle" },
      ]
    : (config.quickActions ?? [
        { label: "Send", icon: "send" },
        { label: "Receive", icon: "download" },
        { label: "Pay", icon: "credit-card" },
        { label: "Top Up", icon: "plus-circle" },
      ]);

  const firstName = userName.split(" ")[0];
  const recentTxs = mockTransactions.slice(0, 5);

  return (
    <div style={{ padding: "0 20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 56,
          paddingBottom: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
            {greeting},
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}
          >
            {firstName} 👋
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={20} color="#94a3b8" />
            <span
              style={{
                position: "absolute",
                top: 9,
                right: 9,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#2563eb",
                border: "1.5px solid #0f172a",
              }}
            />
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {firstName.charAt(0)}
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #4c1d95 100%)",
          borderRadius: 24,
          padding: "24px 24px 20px",
          marginTop: 20,
          boxShadow: "0 8px 32px rgba(37, 99, 235, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              Total Balance
            </div>
            <button
              onClick={() => setBalanceVisible((v) => !v)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {balanceVisible ? (
                <Eye size={15} color="rgba(255,255,255,0.8)" />
              ) : (
                <EyeOff size={15} color="rgba(255,255,255,0.8)" />
              )}
            </button>
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {balanceVisible
              ? fmt(mockAccount.mainBalance, currency)
              : `${currency}••••••`}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 2 }}>
                Available
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                {balanceVisible ? fmt(mockAccount.availableBalance, currency) : `${currency}••••`}
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 2 }}>
                Pending
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#f59e0b" }}>
                {balanceVisible ? fmt(mockAccount.pendingBalance, currency) : `${currency}••••`}
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 2 }}>
                Savings
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#22c55e" }}>
                {balanceVisible ? fmt(mockAccount.savingsBalance, currency) : `${currency}••••`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 24,
          marginBottom: 28,
          gap: 8,
        }}
      >
        {quickActions.map((action) => {
          const Icon = QUICK_ICON_MAP[action.icon] ?? Send;
          return (
            <div
              key={action.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 200ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = "#2563eb")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = "#1e293b")
                }
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                {action.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Monthly spend summary */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#1e293b",
            borderRadius: 16,
            padding: "16px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <TrendingDown size={15} color="#ef4444" />
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500, letterSpacing: "0.04em" }}>
              MONTHLY SPEND
            </span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            {currency}1,560
          </div>
          <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>+8.2% vs last month</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#1e293b",
            borderRadius: 16,
            padding: "16px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <TrendingUp size={15} color="#22c55e" />
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500, letterSpacing: "0.04em" }}>
              INCOME
            </span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#22c55e", letterSpacing: "-0.02em" }}>
            {currency}6,150
          </div>
          <div style={{ fontSize: 11, color: "#22c55e", marginTop: 2 }}>+12.5% vs last month</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}
          >
            Recent Activity
          </span>
          <Link
            to="/transactions"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#2563eb",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            See all <ArrowUpRight size={14} />
          </Link>
        </div>
        <div>
          {recentTxs.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} symbol={currency} />
          ))}
        </div>
      </div>
    </div>
  );
}
