import { Download, Printer, Send, Share2 } from "lucide-react";
import PageShell from "../components/PageShell";
import { useClinicalState } from "../hooks/useClinicalState";
import { createReport } from "../utils/report";

export default function Reports() {
  const { patient, result } = useClinicalState();
  const report = createReport(patient, result);

  const downloadReport = () => {
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CardioPulse_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell eyebrow="Reports" title="Clinical Report Studio" description="Generate, preview, print, and export the structured patient assessment.">
      <section className="panel report-actions">
        <button onClick={downloadReport}>
          <Download size={16} />
          Download TXT
        </button>
        <button onClick={() => window.print()}>
          <Printer size={16} />
          Print
        </button>
        <button>
          <Send size={16} />
          Email mock
        </button>
        <button>
          <Share2 size={16} />
          EHR mock
        </button>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Preview</p>
            <h2>Comprehensive patient report</h2>
          </div>
        </div>
        <pre className="report-preview">{report}</pre>
      </section>
    </PageShell>
  );
}
