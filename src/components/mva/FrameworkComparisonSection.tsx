import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const FrameworkComparisonSection = () => {
  const { t } = useLanguage();

  const oldItems = [
    t("frameworkComparison", "old1"),
    t("frameworkComparison", "old2"),
    t("frameworkComparison", "old3"),
    t("frameworkComparison", "old4"),
    t("frameworkComparison", "old5"),
  ];

  const mvaItems = [
    t("frameworkComparison", "mva1"),
    t("frameworkComparison", "mva2"),
    t("frameworkComparison", "mva3"),
    t("frameworkComparison", "mva4"),
    t("frameworkComparison", "mva5"),
  ];

  return (
    <section className="py-20 px-6" style={{ background: "#0a0a12" }}>
      <div className="container mx-auto max-w-[1000px]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, lineHeight: 1.2, color: "#fff", textAlign: "center", marginBottom: "48px" }}>
            {t("frameworkComparison", "headline")}
          </h2>

          {/* Comparison grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Old way */}
            <div className="rounded-2xl border p-8" style={{ borderColor: "rgba(233,61,61,0.3)", background: "rgba(233,61,61,0.04)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#e93d3d", marginBottom: "24px" }}>
                ✕ {t("frameworkComparison", "oldWay")}
              </h3>
              <ul className="space-y-3">
                {oldItems.map((item, i) => (
                  <li key={i} style={{ fontSize: "15px", color: "#ededf3", opacity: 0.8 }}>
                    <span style={{ color: "#e93d3d", marginRight: "8px" }}>·</span>{item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(233,61,61,0.2)" }}>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#e93d3d" }}>
                  → {t("frameworkComparison", "oldResult")}
                </p>
              </div>
            </div>

            {/* MVA way */}
            <div className="rounded-2xl border p-8" style={{ borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.04)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#10b981", marginBottom: "24px" }}>
                ✓ {t("frameworkComparison", "mvaWay")}
              </h3>
              <ul className="space-y-3">
                {mvaItems.map((item, i) => (
                  <li key={i} style={{ fontSize: "15px", color: "#ededf3", opacity: 0.8 }}>
                    <span style={{ color: "#10b981", marginRight: "8px" }}>·</span>{item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(16,185,129,0.2)" }}>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#10b981" }}>
                  → {t("frameworkComparison", "mvaResult")}
                </p>
              </div>
            </div>
          </div>

          {/* Body copy */}
          <div className="mx-auto" style={{ maxWidth: "680px", fontSize: "18px", lineHeight: 1.7, color: "#ededf3" }}>
            {["bodyP1", "bodyP2", "bodyP3", "bodyP4"].map((key) => (
              <p key={key} style={{ marginBottom: "24px", whiteSpace: "pre-line" }}>
                {t("frameworkComparison", key)}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FrameworkComparisonSection;
