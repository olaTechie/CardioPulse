import { bmiCategory, bpStatus, heartRateStatus } from "./riskModel";

export function createReport(input, result) {
  const id = `CP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random()
    .toString(16)
    .slice(2, 8)
    .toUpperCase()}`;

  return `CARDIOPULSE
COMPREHENSIVE CARDIOVASCULAR RISK ASSESSMENT

Report ID: ${id}
Generated: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
Overall risk: ${result.riskLevel} (${(result.probability * 100).toFixed(1)}%)
Prediction: ${result.predictionLabel === 1 ? "Positive for elevated angina risk" : "No immediate angina risk signal"}
Confidence range: ${(result.confidenceInterval[0] * 100).toFixed(1)}% - ${(result.confidenceInterval[1] * 100).toFixed(1)}%

PATIENT PROFILE
Age: ${input.age}
Sex: ${input.sex}
Ethnicity: ${input.ethnic}
BMI: ${input.BMI.toFixed(1)} kg/m2 (${bmiCategory(input.BMI)})
Smoking: ${input.smoking_status}
Physical activity: ${input.physical_activity}

CLINICAL MEASUREMENTS
Blood pressure: ${input.mean_sbp}/${input.mean_dbp} mmHg (${bpStatus(input)})
Heart rate: ${input.mean_heart_rate} bpm (${heartRateStatus(input.mean_heart_rate)})
Chest pain: ${input.chest_pain ? "Yes" : "No"}
Diabetes status: ${input.diabetes_status}
Family CHD: ${input.fam_chd ? "Yes" : "No"}

LABORATORY PANEL
Total cholesterol: ${input.total_cholesterol.toFixed(1)} mmol/L
HDL: ${input.hdl.toFixed(2)} mmol/L
LDL: ${input.ldl.toFixed(1)} mmol/L
Triglycerides: ${input.triglyceride.toFixed(2)} mmol/L
HbA1c: ${input.hba1c} mmol/mol
Glucose: ${input.glucose.toFixed(1)} mmol/L
Creatinine: ${input.creatinine} umol/L

RECOMMENDATIONS
${recommendations(result.riskLevel)}

DISCLAIMER
This browser-based assessment is for educational and clinical support purposes only. It does not replace professional medical judgment or emergency care.`;
}

function recommendations(level) {
  if (level === "HIGH") {
    return "Urgent cardiology review, ECG and cardiac biomarkers, treatment optimization, and prompt diagnostic testing should be considered.";
  }

  if (level === "MODERATE") {
    return "Cardiology consultation, lipid and metabolic review, blood pressure monitoring, and structured lifestyle intervention are recommended.";
  }

  return "Continue preventive monitoring, maintain exercise and nutrition targets, and reassess cardiovascular risk annually.";
}
