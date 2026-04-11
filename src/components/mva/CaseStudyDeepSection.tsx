import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const CaseStudyDeepSection = () => {
  const { t } = useLanguage();

  const results = [
    { value: t("caseStudyDeep", "result1Value"), label: t("caseStudyDeep", "result1Label") },
    { value: t("caseStudyDeep", "result2Value"), label: t("caseStudyDeep", "result2Label") },
    { value: t("caseStudyDeep", "result3Value"), label: t("caseStudyDeep", "result3Label") },
    { value: t("caseStudyDeep", "result4Value"), label: t("caseStudyDeep", "result4Label") },
  ];

  return (
    <section id="case-study" className="px-6" style={{ background: "#f6f6f9", padding: "80px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#673DFF", textTransform: "uppercase", marginBottom: "16px" }}>
            {t("caseStudyDeep", "label")}
          </p>

          <h2 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, lineHeight: 1.15, color: "#1a1a2e", marginBottom: "12px", whiteSpace: "pre-line" }}>
            {t("caseStudyDeep", "headline")}
          </h2>

          <p style={{ fontSize: "18px", color: "#6e6e77", marginBottom: "32px" }}>
            {t("caseStudyDeep", "subheadline")}
          </p>

          <div style={{ fontSize: "18px", lineHeight: 1.7, color: "#1a1a2e" }}>
            {["body1", "body2", "body3", "phase1", "phase2", "phase3"].map((key) => (
              <p key={key} style={{ marginBottom: "24px", whiteSpace: "pre-line" }}>
                {t("caseStudyDeep", key)}
              </p>
            ))}
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-4 my-10">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-xl p-6 text-center"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                <div style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "32px", fontWeight: 700, color: "#673DFF", lineHeight: 1 }}>
                  {r.value}
                </div>
                <div style={{ fontSize: "14px", color: "#6e6e77", marginTop: "6px" }}>
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing quote */}
          <blockquote style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.4, color: "#1a1a2e", textAlign: "center", padding: "32px 0", whiteSpace: "pre-line", borderTop: "1px solid #e0e0e6" }}>
            {t("caseStudyDeep", "closing")}
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyDeepSection;
