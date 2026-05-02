import { Activity, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { HealthRadar, RiskGauge, RiskTimeline } from "../components/Charts";
import MetricCard from "../components/MetricCard";
import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";

export default function Dashboard() {
  const { patient, result, runAnalysis, lastAnalysisAt } = useClinicalState();

  return (
    <PageShell
      eyebrow="Dashboard"
      title="Cardiovascular Overview"
      description="A real-time, browser-native migration of the original Streamlit risk assessment workflow."
      actions={<button onClick={runAnalysis}>Analyze patient risk</button>}
    >
      <div className="metric-grid">
        <MetricCard label="Risk probability" value={`${Math.round(result.probability * 100)}%`} detail={result.riskLevel} tone={result.riskLevel.toLowerCase()} icon={Activity} />
        <MetricCard label="Model confidence" value={`${Math.round(result.modelConfidence * 100)}%`} detail="Scoring certainty" icon={ShieldCheck} />
        <MetricCard label="Feature set" value="35+" detail="Clinical variables" icon={CheckCircle2} />
        <MetricCard label="Last capture" value={lastAnalysisAt ? new Date(lastAnalysisAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Live"} detail="Auto-updating" icon={Clock3} />
      </div>

      <div className="dashboard-grid">
        <section className="panel emphasis">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Risk assessment</p>
              <h2>{result.riskLevel} risk profile</h2>
            </div>
            <span className={`signal ${result.riskLevel.toLowerCase()}`}>{result.predictionLabel ? "Angina signal" : "No immediate signal"}</span>
          </div>
          <RiskGauge probability={result.probability} />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Profile balance</p>
              <h2>Patient vs optimal range</h2>
            </div>
          </div>
          <HealthRadar patient={patient} />
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Monitoring</p>
            <h2>Risk timeline and intervention projection</h2>
          </div>
        </div>
        <RiskTimeline probability={result.probability} />
      </section>
    </PageShell>
  );
}
