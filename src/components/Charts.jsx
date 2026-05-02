import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { featureImpact, makeTimeline, medicationImpacts } from "../utils/riskModel";

const tooltipStyle = {
  background: "rgba(255,255,255,0.96)",
  border: "1px solid rgba(31,41,55,0.08)",
  borderRadius: 12,
  boxShadow: "0 18px 40px rgba(20, 24, 36, 0.14)",
};

export function RiskGauge({ probability }) {
  const pct = Math.round(probability * 100);
  const angle = Math.min(180, Math.max(0, pct * 1.8));
  return (
    <div className="gauge">
      <div className="gauge-arc">
        <div className="gauge-fill" style={{ transform: `rotate(${angle}deg)` }} />
        <div className="gauge-center">
          <strong>{pct}%</strong>
          <span>Angina risk</span>
        </div>
      </div>
      <div className="gauge-scale">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}

export function HealthRadar({ patient }) {
  const data = [
    { metric: "Age", patient: Math.min(patient.age / 80, 1), optimal: 0.5 },
    { metric: "BMI", patient: Math.min(patient.BMI / 40, 1), optimal: 0.32 },
    { metric: "BP", patient: Math.min(patient.mean_sbp / 160, 1), optimal: 0.42 },
    { metric: "Cholesterol", patient: Math.min(patient.total_cholesterol / 8, 1), optimal: 0.34 },
    { metric: "Heart rate", patient: Math.min(patient.mean_heart_rate / 120, 1), optimal: 0.5 },
    { metric: "Glucose", patient: Math.min(patient.glucose / 15, 1), optimal: 0.34 },
  ];

  return (
    <ResponsiveContainer height={310}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(31,41,55,0.12)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "#667085", fontSize: 12 }} />
        <Radar dataKey="optimal" stroke="#2fbf71" fill="#2fbf71" fillOpacity={0.14} />
        <Radar dataKey="patient" stroke="#c7465d" fill="#c7465d" fillOpacity={0.24} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function FeatureImpactChart({ patient, probability }) {
  const data = featureImpact(patient, probability);
  return (
    <ResponsiveContainer height={320}>
      <BarChart data={data} layout="vertical" margin={{ left: 24, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(31,41,55,0.08)" />
        <XAxis type="number" tick={{ fill: "#667085", fontSize: 12 }} />
        <YAxis dataKey="name" type="category" width={90} tick={{ fill: "#667085", fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="impact" radius={[0, 8, 8, 0]}>
          {data.map((item) => (
            <Cell key={item.name} fill={item.impact >= 0 ? "#c7465d" : "#2fbf71"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RiskTimeline({ probability }) {
  const data = makeTimeline(probability);
  return (
    <ResponsiveContainer height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,41,55,0.08)" />
        <XAxis dataKey="month" tick={{ fill: "#667085", fontSize: 12 }} />
        <YAxis domain={[0, 100]} tick={{ fill: "#667085", fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line dataKey="baseline" stroke="#c7465d" strokeWidth={3} dot={false} />
        <Line dataKey="intervention" stroke="#2f7dd1" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MedicationChart() {
  return (
    <ResponsiveContainer height={280}>
      <AreaChart data={medicationImpacts()}>
        <defs>
          <linearGradient id="medGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2fbf71" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#2fbf71" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(31,41,55,0.08)" />
        <XAxis dataKey="name" tick={{ fill: "#667085", fontSize: 11 }} />
        <YAxis tick={{ fill: "#667085", fontSize: 12 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="reduction" stroke="#2fbf71" strokeWidth={3} fill="url(#medGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
