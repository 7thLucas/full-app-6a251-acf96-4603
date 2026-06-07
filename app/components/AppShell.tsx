import { Outlet } from "react-router";
import BottomNav from "./BottomNav";

export default function AppShell() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        maxWidth: 430,
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 88,
        }}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
