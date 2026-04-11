import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const PricingValueSection = () => {
  const { t, langPrefix } = useLanguage();

  const items = Array.from({ length: 7 }, (_, i) => ({
    name: t("pricingValue", `item${i + 1}Name`),
    value: t("pricingValue", `item${i + 1}Value`),
    desc: t("pricingValue", `item${i + 1}Desc`),
  }));

  return (
    <section id="pricing-value" className="px-6" style={{ background: "#0a0a12", padding: "80px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: "760px" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {/* Label */}
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#673DFF", textTransform: "uppercase", marginBottom: "16px" }}>
            {t("pricingValue", "label")}
          </p>

          {/* Headline */}
          <h2 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
            {t("pricingValue", "headline")}
          </h2>

          {/* Price */}
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            {t("pricingValue", "price")}
          </p>
          <p style={{ fontSize: "14px", color: "#6e6e77", marginBottom: "40px" }}>
            {t("pricingValue", "priceNote")}
          </p>

          {/* Value stack */}
          <div className="space-y-6 mb-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex gap-4"
              >
                <span style={{ color: "#673DFF", fontSize: "18px", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>→</span>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#ededf3" }}>{item.name}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#673DFF", background: "rgba(103,61,255,0.1)", padding: "2px 10px", borderRadius: "100px" }}>{item.value}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#6e6e77", marginTop: "4px" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", marginBottom: "40px" }}>
            <p style={{ fontSize: "16px", color: "#6e6e77", marginBottom: "4px" }}>{t("pricingValue", "totalValue")}</p>
            <p style={{ fontSize: "16px", color: "#6e6e77" }}>
              {t("pricingValue", "yourInvestment")}{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>{t("pricingValue", "investmentAmount")}</span>{" "}
              <span style={{ color: "#6e6e77" }}>{t("pricingValue", "investmentNote")}</span>
            </p>
          </div>

          {/* Guarantee */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", marginBottom: "40px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#10b981", textTransform: "uppercase", marginBottom: "16px" }}>
              {t("pricingValue", "guaranteeLabel")}
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#ededf3", marginBottom: "16px" }}>
              {t("pricingValue", "guaranteeP1")}
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#ededf3" }}>
              {t("pricingValue", "guaranteeP2")}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to={`${langPrefix}/book`}
              onClick={() => track.bookingClick("pricing-value")}
              className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all animate-pulse-cta w-full sm:w-auto"
              style={{ background: "#10b981", color: "#fff", padding: "16px 40px" }}
            >
              {t("pricingValue", "cta")}
            </Link>
            <p style={{ fontSize: "13px", color: "#6e6e77", marginTop: "12px" }}>
              {t("pricingValue", "ctaTrust")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingValueSection;
