import { motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  Database,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PatientForm from "../components/PatientForm";
import { useClinicalState } from "../hooks/useClinicalState";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/explorer", label: "Data Explorer", icon: Database },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { result, runAnalysis } = useClinicalState();

  return (
    <div className="app-frame">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <HeartPulse size={22} />
          </div>
          <div>
            <strong>CardioPulse</strong>
            <span>Risk analytics</span>
          </div>
        </div>
        <nav>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={`risk-tile ${result.riskLevel.toLowerCase()}`}>
          <span>Live risk</span>
          <strong>{Math.round(result.probability * 100)}%</strong>
          <small>{result.riskLevel} signal</small>
          <button onClick={runAnalysis}>
            <ClipboardList size={16} />
            Capture analysis
          </button>
        </div>
      </aside>

      <button className="mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>

      <main className="workspace">
        <motion.div className="hero-strip" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <p>AI-assisted cardiovascular risk assessment</p>
            <h2>Clinical signal, refined for modern decision workflows.</h2>
          </div>
          <div className="hero-meta">
            <span>35+ variables</span>
            <span>Real-time scoring</span>
            <span>Launch-ready React</span>
          </div>
        </motion.div>

        <div className="content-grid">
          <PatientForm />
          <div className="content">{children}</div>
        </div>
      </main>
    </div>
  );
}
