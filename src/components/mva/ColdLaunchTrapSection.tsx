import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const ColdLaunchTrapSection = () => {
  const { t, langPrefix } = useLanguage();

  return (
    <section id="cold-launch-trap" className="px-6" style={{ background: "#0a0a12", padding: "80px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {/* Label */}
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#673DFF", textTransform: "uppercase", marginBottom: "20px" }}>
            {t("coldLaunchTrap", "label")}
          </p>

          {/* Headline */}
          <h2 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "32px" }}>
            {t("coldLaunchTrap", "headline1")}<br />
            {t("coldLaunchTrap", "headline2")}
          </h2>

          {/* Body */}
          <div style={{ fontSize: "18px", lineHeight: 1.7, color: "#ededf3" }}>
            {[
              t("coldLaunchTrap", "p1"),
              t("coldLaunchTrap", "p2"),
              t("coldLaunchTrap", "p3"),
              t("coldLaunchTrap", "p4"),
              t("coldLaunchTrap", "p5"),
              t("coldLaunchTrap", "p6"),
            ].map((p, i) => (
              <p key={i} style={{ marginBottom: "24px", whiteSpace: "pre-line" }}>{p}</p>
            ))}

            {/* Highlighted line */}
            <p style={{ marginBottom: "24px", color: "#673DFF", fontWeight: 700, fontSize: "20px" }}>
              {t("coldLaunchTrap", "highlight")}
            </p>

            <p style={{ marginBottom: "40px", whiteSpace: "pre-line" }}>
              {t("coldLaunchTrap", "p7")}
            </p>
          </div>

          {/* CTA */}
          <Link
            to={`${langPrefix}/book`}
            onClick={() => track.bookingClick("cold-launch-trap")}
            className="inline-flex items-center gap-2 font-bold text-sm rounded-xl transition-all animate-pulse-cta"
            style={{ background: "#10b981", color: "#fff", padding: "16px 32px" }}
          >
            {t("coldLaunchTrap", "cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ColdLaunchTrapSection;
