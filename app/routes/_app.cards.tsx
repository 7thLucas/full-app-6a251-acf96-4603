import { useState } from "react";
import { Snowflake, Sun, Plus, ChevronRight, Wifi } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { mockCards, type Card } from "~/data/mock";

function fmt(amount: number, symbol: string) {
  return `${symbol}${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CardVisual({ card, symbol }: { card: Card; symbol: string }) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: card.gradient,
        padding: "22px 24px",
        aspectRatio: "1.586 / 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
        filter: card.frozen ? "brightness(0.55) saturate(0.4)" : "none",
        transition: "filter 300ms",
      }}
    >
      {/* Background circles */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: 40,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />

      {/* Top row: chip + contactless */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        {/* SIM chip */}
        <div
          style={{
            width: 36,
            height: 28,
            background: "linear-gradient(135deg, #d4a017, #f5d060)",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "60%",
              border: "1.5px solid rgba(0,0,0,0.3)",
              borderRadius: 3,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 1,
              padding: 2,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{ background: "rgba(0,0,0,0.2)", borderRadius: 1 }}
              />
            ))}
          </div>
        </div>
        <Wifi
          size={18}
          color="rgba(255,255,255,0.7)"
          style={{ transform: "rotate(90deg)" }}
        />
      </div>

      {/* Card number */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.18em",
          fontFamily: "'Courier New', monospace",
          position: "relative",
        }}
      >
        •••• •••• •••• {card.lastFour}
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Card Holder
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 1 }}>
            {card.holder}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Expires
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 1 }}>
            {card.expiry}
          </div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", fontStyle: "italic" }}>
          {card.network === "visa" ? "VISA" : (
            <span style={{ display: "flex", gap: -4 }}>
              <span style={{ color: "#ff5f00", fontSize: 22 }}>●</span>
              <span style={{ color: "#eb001b", fontSize: 22, marginLeft: -8 }}>●</span>
            </span>
          )}
        </div>
      </div>

      {/* Frozen overlay label */}
      {card.frozen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderRadius: 20,
          }}
        >
          <Snowflake size={22} color="#7dd3fc" strokeWidth={2} />
          <span style={{ color: "#7dd3fc", fontWeight: 700, fontSize: 15, letterSpacing: "0.06em" }}>
            FROZEN
          </span>
        </div>
      )}
    </div>
  );
}

function CardDetailRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <span style={{ fontSize: 14, color: "#64748b" }}>{label}</span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: accent ? "#22c55e" : "#f1f5f9",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CardsPage() {
  const { config, loading } = useConfigurables();
  const currency = loading ? "$" : (config.currencySymbol ?? "$");

  const [cards, setCards] = useState(mockCards);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeCard = cards[activeIdx];

  function toggleFreeze(id: string) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c))
    );
  }

  return (
    <div style={{ padding: "0 20px" }}>
      {/* Header */}
      <div style={{ paddingTop: 56, paddingBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          My Cards
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: "4px 0 0" }}>
          Manage your payment cards
        </p>
      </div>

      {/* Card Switcher Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => setActiveIdx(idx)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 12,
              border: "1.5px solid",
              borderColor: activeIdx === idx ? "#2563eb" : "#1e293b",
              background: activeIdx === idx ? "rgba(37, 99, 235, 0.12)" : "#1e293b",
              color: activeIdx === idx ? "#3b82f6" : "#64748b",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 150ms",
            }}
          >
            {card.label}
          </button>
        ))}
      </div>

      {/* Active Card Visual */}
      <div style={{ marginBottom: 20 }}>
        <CardVisual card={activeCard} symbol={currency} />
      </div>

      {/* Freeze / Unfreeze Toggle */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 16,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          cursor: "pointer",
        }}
        onClick={() => toggleFreeze(activeCard.id)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: activeCard.frozen ? "rgba(125, 211, 252, 0.15)" : "rgba(37, 99, 235, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {activeCard.frozen ? (
              <Sun size={20} color="#f59e0b" />
            ) : (
              <Snowflake size={20} color="#7dd3fc" />
            )}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9" }}>
              {activeCard.frozen ? "Unfreeze Card" : "Freeze Card"}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
              {activeCard.frozen
                ? "Tap to reactivate your card"
                : "Temporarily block all transactions"}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 48,
            height: 26,
            borderRadius: 13,
            background: activeCard.frozen ? "#7dd3fc" : "#334155",
            position: "relative",
            transition: "background 300ms",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              left: activeCard.frozen ? 25 : 3,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
              transition: "left 300ms",
            }}
          />
        </div>
      </div>

      {/* Card Details */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 16,
          padding: "4px 20px",
          marginBottom: 20,
        }}
      >
        <CardDetailRow
          label="Balance"
          value={fmt(activeCard.balance, currency)}
          accent
        />
        {activeCard.limit && (
          <CardDetailRow
            label="Credit Limit"
            value={fmt(activeCard.limit, currency)}
          />
        )}
        {activeCard.limit && (
          <CardDetailRow
            label="Available Credit"
            value={fmt(activeCard.limit - activeCard.balance, currency)}
            accent
          />
        )}
        <CardDetailRow label="Card Type" value={activeCard.type === "debit" ? "Debit" : "Credit"} />
        <CardDetailRow label="Network" value={activeCard.network === "visa" ? "Visa" : "Mastercard"} />
        <CardDetailRow label="Status" value={activeCard.frozen ? "Frozen" : "Active"} />
      </div>

      {/* Card Settings Links */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 16,
          padding: "4px 20px",
          marginBottom: 20,
        }}
      >
        {["Change PIN", "View Statements", "Card Settings", "Report Lost Card"].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: "1px solid #0f172a",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: "#f1f5f9" }}>{item}</span>
            <ChevronRight size={18} color="#64748b" />
          </div>
        ))}
      </div>

      {/* Add New Card */}
      <button
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 16,
          border: "1.5px dashed #334155",
          background: "transparent",
          color: "#64748b",
          fontSize: 14,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        <Plus size={18} color="#64748b" />
        Add New Card
      </button>
    </div>
  );
}
