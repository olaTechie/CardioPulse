import { motion } from "framer-motion";
import { Activity, Beaker, HeartPulse, UserRound } from "lucide-react";
import { patientTemplates, selectOptions } from "../data/defaultPatient";
import { useClinicalState } from "../hooks/useClinicalState";
import { bmiCategory, bpStatus, heartRateStatus } from "../utils/riskModel";
import { RangeField, SelectField } from "./Field";

export default function PatientForm() {
  const { patient, updatePatient } = useClinicalState();

  return (
    <aside className="patient-panel">
      <div className="patient-panel-header">
        <div>
          <span className="status-dot" />
          Real-time risk inputs
        </div>
        <select
          aria-label="Quick template"
          onChange={(event) => {
            if (event.target.value) updatePatient(patientTemplates[event.target.value]);
          }}
          defaultValue=""
        >
          <option value="">Templates</option>
          {Object.keys(patientTemplates).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>

      <FormSection title="Demographics" icon={UserRound}>
        <RangeField label="Age" min={18} max={120} value={patient.age} unit="years" onChange={(age) => updatePatient({ age })} />
        <SelectField label="Sex" value={patient.sex} options={selectOptions.sex} onChange={(sex) => updatePatient({ sex })} />
        <SelectField label="Ethnicity" value={patient.ethnic} options={selectOptions.ethnic} onChange={(ethnic) => updatePatient({ ethnic })} />
        <RangeField label="BMI" min={10} max={60} step={0.1} value={patient.BMI} unit="kg/m2" onChange={(BMI) => updatePatient({ BMI })} />
        <Pill tone={bmiCategory(patient.BMI) === "Normal" ? "good" : "warn"}>BMI category: {bmiCategory(patient.BMI)}</Pill>
      </FormSection>

      <FormSection title="Clinical" icon={HeartPulse}>
        <SelectField label="Chest pain" value={patient.chest_pain} options={[false, true]} onChange={(chest_pain) => updatePatient({ chest_pain })} />
        <RangeField label="Systolic BP" min={70} max={250} value={patient.mean_sbp} unit="mmHg" onChange={(mean_sbp) => updatePatient({ mean_sbp })} />
        <RangeField label="Diastolic BP" min={40} max={150} value={patient.mean_dbp} unit="mmHg" onChange={(mean_dbp) => updatePatient({ mean_dbp })} />
        <Pill tone={bpStatus(patient) === "Normal" ? "good" : "warn"}>{bpStatus(patient)}</Pill>
        <RangeField label="Heart rate" min={30} max={200} value={patient.mean_heart_rate} unit="bpm" onChange={(mean_heart_rate) => updatePatient({ mean_heart_rate })} />
        <Pill tone={heartRateStatus(patient.mean_heart_rate) === "Normal" ? "good" : "warn"}>{heartRateStatus(patient.mean_heart_rate)}</Pill>
      </FormSection>

      <FormSection title="History & Lifestyle" icon={Activity}>
        <SelectField label="Smoking" value={patient.smoking_status} options={selectOptions.smoking_status} onChange={(smoking_status) => updatePatient({ smoking_status })} />
        <SelectField label="Physical activity" value={patient.physical_activity} options={selectOptions.physical_activity} onChange={(physical_activity) => updatePatient({ physical_activity })} />
        <SelectField label="Diabetes status" value={patient.diabetes_status} options={selectOptions.diabetes_status} onChange={(diabetes_status) => updatePatient({ diabetes_status })} />
        <SelectField label="Family CHD" value={patient.fam_chd} options={[false, true]} onChange={(fam_chd) => updatePatient({ fam_chd })} />
        <SelectField label="Treated hypertension" value={patient.treated_hypertension} options={[false, true]} onChange={(treated_hypertension) => updatePatient({ treated_hypertension })} />
        <SelectField label="Cholesterol medication" value={patient.chol_lowering} options={[false, true]} onChange={(chol_lowering) => updatePatient({ chol_lowering })} />
        <SelectField label="Corticosteroid use" value={patient.corticosteroid_use} options={[false, true]} onChange={(corticosteroid_use) => updatePatient({ corticosteroid_use })} />
      </FormSection>

      <FormSection title="Laboratory" icon={Beaker}>
        <RangeField label="Total cholesterol" min={2} max={12} step={0.1} value={patient.total_cholesterol} unit="mmol/L" onChange={(total_cholesterol) => updatePatient({ total_cholesterol })} />
        <RangeField label="HDL" min={0.5} max={3} step={0.01} value={patient.hdl} unit="mmol/L" onChange={(hdl) => updatePatient({ hdl })} />
        <RangeField label="LDL" min={0.5} max={8} step={0.1} value={patient.ldl} unit="mmol/L" onChange={(ldl) => updatePatient({ ldl })} />
        <RangeField label="Triglycerides" min={0.1} max={5} step={0.01} value={patient.triglyceride} unit="mmol/L" onChange={(triglyceride) => updatePatient({ triglyceride })} />
        <RangeField label="HbA1c" min={20} max={150} value={patient.hba1c} unit="mmol/mol" onChange={(hba1c) => updatePatient({ hba1c })} />
        <RangeField label="Glucose" min={2} max={20} step={0.1} value={patient.glucose} unit="mmol/L" onChange={(glucose) => updatePatient({ glucose })} />
        <RangeField label="Creatinine" min={30} max={300} value={patient.creatinine} unit="umol/L" onChange={(creatinine) => updatePatient({ creatinine })} />
        <RangeField label="Hemoglobin" min={5} max={20} step={0.1} value={patient.hemoglobin} unit="g/dL" onChange={(hemoglobin) => updatePatient({ hemoglobin })} />
      </FormSection>
    </aside>
  );
}

function FormSection({ title, icon: Icon, children }) {
  return (
    <motion.section className="form-section" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3>
        <Icon size={17} />
        {title}
      </h3>
      {children}
    </motion.section>
  );
}

function Pill({ tone, children }) {
  return <div className={`pill ${tone}`}>{children}</div>;
}
