import { motion } from "framer-motion";

export default function MetricCard({ label, value, detail, tone = "neutral", icon: Icon }) {
  return (
    <motion.article className={`metric-card ${tone}`} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
      <div className="metric-icon">{Icon ? <Icon size={20} /> : null}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <small>{detail}</small> : null}
    </motion.article>
  );
}
