import { createContext, useContext, useMemo, useState } from "react";
import { defaultPatient } from "../data/defaultPatient";
import { scorePatient } from "../utils/riskModel";
import { useLocalStorage } from "./useLocalStorage";

const ClinicalContext = createContext(null);

export function ClinicalProvider({ children }) {
  const [patient, setPatient] = useLocalStorage("cardiopulse.patient", defaultPatient);
  const [history, setHistory] = useLocalStorage("cardiopulse.history", []);
  const [comparison, setComparison] = useLocalStorage("cardiopulse.comparison", []);
  const [settings, setSettings] = useLocalStorage("cardiopulse.settings", {
    theme: "light",
    language: "English",
    highContrast: false,
    animations: true,
    autoSave: true,
  });
  const [lastAnalysisAt, setLastAnalysisAt] = useState(null);

  const result = useMemo(() => scorePatient(patient), [patient]);

  const updatePatient = (patch) => setPatient((current) => ({ ...current, ...patch }));

  const runAnalysis = () => {
    const record = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      inputs: patient,
      riskScore: result.probability,
      riskLevel: result.riskLevel,
    };
    setHistory((items) => [record, ...items].slice(0, 50));
    setLastAnalysisAt(record.timestamp);
    return record;
  };

  const addComparison = () => {
    setComparison((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ...patient,
        riskScore: result.probability,
      },
    ]);
  };

  const value = {
    patient,
    updatePatient,
    setPatient,
    result,
    runAnalysis,
    lastAnalysisAt,
    history,
    setHistory,
    comparison,
    setComparison,
    addComparison,
    settings,
    setSettings,
  };

  return <ClinicalContext.Provider value={value}>{children}</ClinicalContext.Provider>;
}

export function useClinicalState() {
  const value = useContext(ClinicalContext);
  if (!value) throw new Error("useClinicalState must be used within ClinicalProvider");
  return value;
}
