import { motion } from "framer-motion";

const stages = ["Discovery", "Audience Growth", "Demand Validation", "Community", "Launch"];

const FlowSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">System Flow</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            From Discovery<br /><span className="text-primary">To Launch</span>
          </h2>
        </div>

        {/* Horizontal bar on desktop, vertical on mobile */}
        <div className="hidden md:flex items-end gap-1.5 justify-center max-w-[900px] mx-auto">
          {stages.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 flex items-center justify-center font-semibold text-xs md:text-sm tracking-wide rounded-lg origin-bottom"
              style={{
                height: `${80 + i * 30}px`,
                backgroundColor: `hsl(253 100% ${68 - i * 4}%)`,
                color: "hsl(0 0% 100%)",
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex md:hidden flex-col items-center gap-2">
          {stages.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center justify-center font-semibold text-sm tracking-wide py-3.5 rounded-lg w-full"
              style={{
                width: `${100 - i * 8}%`,
                backgroundColor: `hsl(253 100% ${68 - i * 4}%)`,
                color: "hsl(0 0% 100%)",
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowSection;
