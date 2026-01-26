import Top from "../components/TopBar/top";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Top />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
