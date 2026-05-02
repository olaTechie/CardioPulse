import { FeatureImpactChart, HealthRadar, MedicationChart } from "../components/Charts";
import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";
import { lifestyleImpacts } from "../utils/riskModel";

export default function Analytics() {
  const { patient, result } = useClinicalState();
  const impacts = lifestyleImpacts(patient);

  return (
    <PageShell eyebrow="Analytics" title="Risk Intelligence" description="Feature attribution, treatment sensitivity, and modifiable risk opportunities.">
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Explainability</p>
              <h2>Feature impact</h2>
            </div>
          </div>
          <FeatureImpactChart patient={patient} probability={result.probability} />
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Medication simulator</p>
              <h2>Potential risk reduction</h2>
            </div>
          </div>
          <MedicationChart />
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Lifestyle</p>
            <h2>Modifiable factors</h2>
          </div>
        </div>
        <div className="intervention-grid">
          {impacts.map((item) => (
            <article className="intervention" key={item.name}>
              <span>{item.name}</span>
              <strong>{item.reduction}%</strong>
              <small>Estimated reduction</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Population view</p>
            <h2>Clinical factor distribution</h2>
          </div>
        </div>
        <HealthRadar patient={patient} />
      </section>
    </PageShell>
  );
}
