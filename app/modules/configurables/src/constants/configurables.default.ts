/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TQuickAction = {
  label: string;
  icon: string;
};

export type TNavLabels = {
  home: string;
  cards: string;
  transactions: string;
  analytics: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  welcomeMessage?: string;
  userName?: string;
  currencySymbol?: string;
  tagline?: string;
  showAnalytics?: boolean;
  showCardManagement?: boolean;
  quickActions?: TQuickAction[];
  navLabels?: TNavLabels;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Vault",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#0f172a",
    secondary: "#1e293b",
    accent: "#2563eb",
  },
  welcomeMessage: "Good morning",       // fill it here
  userName: "Alex Johnson",             // fill it here
  currencySymbol: "$",                  // fill it here
  tagline: "Banking made simple.",      // fill it here
  showAnalytics: true,                  // fill it here
  showCardManagement: true,             // fill it here
  quickActions: [
    { label: "Send", icon: "send" },
    { label: "Receive", icon: "download" },
    { label: "Pay", icon: "credit-card" },
    { label: "Top Up", icon: "plus-circle" },
  ],
  navLabels: {
    home: "Home",
    cards: "Cards",
    transactions: "Activity",
    analytics: "Analytics",
  },
};
