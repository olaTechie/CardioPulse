import { CalendarDays, CircleAlert, Target } from "lucide-react";
import MetricCard from "../components/MetricCard";
import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";

export default function Insights() {
  const { patient, result } = useClinicalState();
  const urgent = result.riskLevel === "HIGH";
  const moderate = result.riskLevel === "MODERATE";

  const schedule = urgent
    ? ["Emergency cardiology within 24-48 hours", "Diagnostic testing within 7 days", "Treatment review within 14 days"]
    : moderate
      ? ["Cardiology consultation within 2-4 weeks", "Lipid and metabolic review", "Risk reassessment in 90 days"]
      : ["Routine check-up in 6 months", "Annual cardiovascular reassessment", "Continue preventive monitoring"];

  return (
    <PageShell eyebrow="Insights" title="Care Pathway" description="Follow-up recommendations, treatment targets, and intervention priorities.">
      <div className="metric-grid">
        <MetricCard label="BP target" value={result.riskLevel === "HIGH" ? "<130" : "<140"} detail={`Current ${patient.mean_sbp}/${patient.mean_dbp}`} icon={Target} />
        <MetricCard label="LDL target" value={result.riskLevel === "HIGH" ? "<1.8" : "<2.6"} detail={`Current ${patient.ldl.toFixed(1)} mmol/L`} icon={Target} />
        <MetricCard label="HbA1c target" value="<48" detail={`Current ${patient.hba1c} mmol/mol`} icon={Target} />
        <MetricCard label="Priority" value={result.riskLevel} detail="Clinical workflow" tone={result.riskLevel.toLowerCase()} icon={CircleAlert} />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Follow-up schedule</p>
            <h2>Recommended pathway</h2>
          </div>
          <CalendarDays />
        </div>
        <div className="schedule">
          {schedule.map((item, index) => (
            <article key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
