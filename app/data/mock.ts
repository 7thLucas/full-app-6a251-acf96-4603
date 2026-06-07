// ─── Mock data for Vault banking app ────────────────────────────────────────

export type TransactionCategory =
  | "food"
  | "transport"
  | "shopping"
  | "subscriptions"
  | "entertainment"
  | "health"
  | "income"
  | "travel"
  | "utilities";

export interface Transaction {
  id: string;
  merchant: string;
  category: TransactionCategory;
  amount: number; // negative = debit, positive = credit
  date: string;   // ISO-8601
  icon: string;   // emoji
  note?: string;
}

export interface Card {
  id: string;
  label: string;
  type: "debit" | "credit";
  lastFour: string;
  expiry: string;
  holder: string;
  network: "visa" | "mastercard";
  frozen: boolean;
  balance: number;
  limit?: number;
  gradient: string;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
  icon: string;
}

// ─── Account ────────────────────────────────────────────────────────────────

export const mockAccount = {
  mainBalance: 12450.80,
  availableBalance: 11200.00,
  pendingBalance: 1250.80,
  savingsBalance: 3200.00,
};

// ─── Cards ──────────────────────────────────────────────────────────────────

export const mockCards: Card[] = [
  {
    id: "card-1",
    label: "Primary Debit",
    type: "debit",
    lastFour: "4291",
    expiry: "09/27",
    holder: "Alex Johnson",
    network: "visa",
    frozen: false,
    balance: 12450.80,
    gradient: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
  },
  {
    id: "card-2",
    label: "Travel Credit",
    type: "credit",
    lastFour: "8847",
    expiry: "03/26",
    holder: "Alex Johnson",
    network: "mastercard",
    frozen: false,
    balance: 2340.50,
    limit: 10000,
    gradient: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
  },
];

// ─── Transactions ────────────────────────────────────────────────────────────

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    merchant: "Salary Deposit",
    category: "income",
    amount: 5400.00,
    date: "2026-06-01T09:00:00Z",
    icon: "💰",
    note: "Monthly salary — June",
  },
  {
    id: "t2",
    merchant: "Whole Foods Market",
    category: "food",
    amount: -87.45,
    date: "2026-06-02T14:30:00Z",
    icon: "🛒",
  },
  {
    id: "t3",
    merchant: "Uber",
    category: "transport",
    amount: -14.20,
    date: "2026-06-02T18:45:00Z",
    icon: "🚗",
  },
  {
    id: "t4",
    merchant: "Netflix",
    category: "subscriptions",
    amount: -15.99,
    date: "2026-06-03T00:00:00Z",
    icon: "🎬",
  },
  {
    id: "t5",
    merchant: "Starbucks",
    category: "food",
    amount: -6.75,
    date: "2026-06-03T08:15:00Z",
    icon: "☕",
  },
  {
    id: "t6",
    merchant: "Amazon",
    category: "shopping",
    amount: -129.99,
    date: "2026-06-03T16:20:00Z",
    icon: "📦",
  },
  {
    id: "t7",
    merchant: "Spotify",
    category: "subscriptions",
    amount: -9.99,
    date: "2026-06-04T00:00:00Z",
    icon: "🎵",
  },
  {
    id: "t8",
    merchant: "Shell Gas Station",
    category: "transport",
    amount: -62.40,
    date: "2026-06-04T11:00:00Z",
    icon: "⛽",
  },
  {
    id: "t9",
    merchant: "Apple",
    category: "subscriptions",
    amount: -14.99,
    date: "2026-06-04T12:00:00Z",
    icon: "🍎",
  },
  {
    id: "t10",
    merchant: "Chipotle",
    category: "food",
    amount: -13.50,
    date: "2026-06-05T12:30:00Z",
    icon: "🌯",
  },
  {
    id: "t11",
    merchant: "Airbnb",
    category: "travel",
    amount: -312.00,
    date: "2026-06-05T15:00:00Z",
    icon: "🏠",
  },
  {
    id: "t12",
    merchant: "CVS Pharmacy",
    category: "health",
    amount: -28.60,
    date: "2026-06-05T17:00:00Z",
    icon: "💊",
  },
  {
    id: "t13",
    merchant: "Nike Store",
    category: "shopping",
    amount: -89.00,
    date: "2026-06-06T13:00:00Z",
    icon: "👟",
  },
  {
    id: "t14",
    merchant: "Freelance Payment",
    category: "income",
    amount: 750.00,
    date: "2026-06-06T14:00:00Z",
    icon: "💼",
  },
  {
    id: "t15",
    merchant: "Uber Eats",
    category: "food",
    amount: -32.80,
    date: "2026-06-06T19:00:00Z",
    icon: "🍕",
  },
  {
    id: "t16",
    merchant: "YouTube Premium",
    category: "subscriptions",
    amount: -13.99,
    date: "2026-06-07T00:00:00Z",
    icon: "▶️",
  },
  {
    id: "t17",
    merchant: "Trader Joe's",
    category: "food",
    amount: -54.20,
    date: "2026-06-07T11:00:00Z",
    icon: "🛍️",
  },
];

// ─── Spending Categories ─────────────────────────────────────────────────────

export const mockSpendingCategories: SpendingCategory[] = [
  { name: "Shopping",      amount: 650.00, color: "#3b82f6", icon: "🛍️" },
  { name: "Food",          amount: 420.00, color: "#22c55e", icon: "🍽️" },
  { name: "Transport",     amount: 180.00, color: "#f59e0b", icon: "🚗" },
  { name: "Entertainment", amount: 140.00, color: "#a855f7", icon: "🎬" },
  { name: "Subscriptions", amount: 95.00,  color: "#ec4899", icon: "📱" },
  { name: "Health",        amount: 75.00,  color: "#06b6d4", icon: "💊" },
];

export const totalMonthlySpend = mockSpendingCategories.reduce(
  (sum, c) => sum + c.amount,
  0
);

// ─── Weekly bar chart data ───────────────────────────────────────────────────

export interface WeeklyData {
  week: string;
  thisMonth: number;
  lastMonth: number;
}

export const mockWeeklyData: WeeklyData[] = [
  { week: "W1", thisMonth: 340, lastMonth: 290 },
  { week: "W2", thisMonth: 520, lastMonth: 410 },
  { week: "W3", thisMonth: 410, lastMonth: 380 },
  { week: "W4", thisMonth: 290, lastMonth: 470 },
];
