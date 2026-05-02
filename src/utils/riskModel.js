const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

export function scorePatient(input) {
  const smoking =
    {
      "non-smoker": 0,
      "ex-smoker": 0.35,
      "light smoker": 0.55,
      "moderate smoker": 0.85,
      "heavy smoker": 1.15,
    }[input.smoking_status] ?? 0;

  const activity =
    {
      high: -0.28,
      moderate: 0,
      low: 0.42,
    }[input.physical_activity] ?? 0;

  const diabetes =
    input.diabetes_status === "Type 1 Diabetes" ? 0.7 : input.diabetes_status === "Type 2 Diabetes" ? 0.58 : 0;

  const raw =
    -3.1 +
    (input.age - 50) * 0.035 +
    (input.BMI - 25) * 0.055 +
    (input.mean_sbp - 120) * 0.018 +
    (input.mean_dbp - 80) * 0.008 +
    (input.mean_heart_rate - 70) * 0.009 +
    (input.total_cholesterol - 5) * 0.27 +
    (input.ldl - 2.6) * 0.22 -
    (input.hdl - 1.2) * 0.28 +
    (input.Cholesterol_HDL_Ratio - 3.5) * 0.12 +
    (input.hba1c - 42) * 0.012 +
    (input.glucose - 5.6) * 0.055 +
    (input.creatinine - 80) * 0.004 +
    (input.chest_pain ? 1.05 : 0) +
    (input.fam_chd ? 0.28 : 0) +
    (input.treated_hypertension ? 0.3 : 0) +
    (input.corticosteroid_use ? 0.22 : 0) +
    (input.chol_lowering ? -0.14 : 0) +
    smoking +
    activity +
    diabetes;

  const probability = clamp(sigmoid(raw) * 1.12);
  const riskLevel = probability >= 0.7 ? "HIGH" : probability >= 0.3 ? "MODERATE" : "LOW";

  return {
    probability,
    predictionLabel: probability >= 0.5 ? 1 : 0,
    modelConfidence: Math.max(probability, 1 - probability),
    riskLevel,
    confidenceInterval: [clamp(probability - 0.1), clamp(probability + 0.1)],
  };
}

export function bmiCategory(value) {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal";
  if (value < 30) return "Overweight";
  return "Obese";
}

export function bpStatus(input) {
  if (input.mean_sbp < 120 && input.mean_dbp < 80) return "Normal";
  if (input.mean_sbp < 130 && input.mean_dbp < 80) return "Elevated";
  if (input.mean_sbp < 140 || input.mean_dbp < 90) return "Stage 1 HTN";
  return "Stage 2 HTN";
}

export function heartRateStatus(value) {
  if (value < 60) return "Bradycardia";
  if (value <= 100) return "Normal";
  return "Tachycardia";
}

export function lifestyleImpacts(input) {
  return [
    { name: "Quit Smoking", reduction: input.smoking_status !== "non-smoker" ? 20 : 0 },
    { name: "Exercise 150 min/week", reduction: input.physical_activity === "low" ? 15 : 5 },
    { name: "Mediterranean Diet", reduction: 10 },
    { name: "Weight Loss 10%", reduction: input.BMI > 25 ? 12 : 0 },
    { name: "Stress Management", reduction: 8 },
    { name: "Sleep Optimization", reduction: 5 },
  ];
}

export function featureImpact(input, probability) {
  const factors = [
    ["Age", (input.age - 50) / 30],
    ["BMI", (input.BMI - 25) / 12],
    ["Systolic BP", (input.mean_sbp - 120) / 45],
    ["LDL", (input.ldl - 2.6) / 2],
    ["HbA1c", (input.hba1c - 42) / 45],
    ["Smoking", input.smoking_status === "non-smoker" ? -0.15 : 0.5],
    ["Chest Pain", input.chest_pain ? 0.85 : -0.15],
    ["Activity", input.physical_activity === "low" ? 0.35 : input.physical_activity === "high" ? -0.25 : 0],
  ];

  return factors
    .map(([name, value]) => ({ name, impact: Number((value * probability).toFixed(3)) }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

export function makeTimeline(probability) {
  const months = ["-12m", "-9m", "-6m", "-3m", "Now", "+3m", "+6m", "+9m", "+12m"];
  return months.map((month, index) => {
    const drift = (index - 4) * 2.4;
    const current = probability * 100;
    return {
      month,
      baseline: Number(clamp((current + drift + Math.max(0, index - 4) * 3) / 100, 0, 1).toFixed(2)) * 100,
      intervention: Number(clamp((current + drift - Math.max(0, index - 4) * 6) / 100, 0, 1).toFixed(2)) * 100,
    };
  });
}

export function medicationImpacts() {
  return [
    { name: "Statins", reduction: 15 },
    { name: "ACE Inhibitors", reduction: 10 },
    { name: "Beta Blockers", reduction: 8 },
    { name: "Metformin", reduction: 12 },
    { name: "Aspirin", reduction: 5 },
  ];
}
