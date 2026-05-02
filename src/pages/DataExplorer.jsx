import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";

const columns = ["age", "BMI", "mean_sbp", "mean_dbp", "total_cholesterol", "ldl", "hba1c", "riskScore", "riskLevel"];

export default function DataExplorer() {
  const { history, comparison, addComparison, setComparison, setHistory, setPatient } = useClinicalState();
  const rows = comparison.length ? comparison : history.map((item) => ({ ...item.inputs, riskScore: item.riskScore, riskLevel: item.riskLevel, id: item.id }));

  return (
    <PageShell
      eyebrow="Data Explorer"
      title="Patients, History, and Comparison"
      description="Searchable assessment history and side-by-side patient comparison from the original Streamlit workflow."
      actions={<button onClick={addComparison}>Add current patient</button>}
    >
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Comparison cohort</p>
            <h2>{rows.length} records</h2>
          </div>
          <div className="button-row">
            <button className="secondary" onClick={() => setComparison([])}>
              Clear comparison
            </button>
            <button className="secondary" onClick={() => setHistory([])}>
              Clear history
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column}>{formatCell(row[column])}</td>
                  ))}
                  <td>
                    <button className="compact" onClick={() => setPatient(row.inputs ?? row)}>
                      Load
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td colSpan={columns.length + 1}>No captured assessments yet. Run an analysis or add a comparison patient.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}

function formatCell(value) {
  if (typeof value === "number") return value < 1 ? `${Math.round(value * 100)}%` : value.toFixed(value % 1 ? 1 : 0);
  return value ?? "-";
}
