const logos = [
  "Chernobylite", "Swimmo", "Gamedec", "Sher.ly",
  "Moonimal", "Woolet", "Gorilla", "CityWood", "WoofOne"
];

const LogoStrip = () => {
  return (
    <section className="section-dark py-10 overflow-hidden">
      <div className="flex animate-scroll-logos whitespace-nowrap">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="mx-10 text-lg md:text-xl font-bold opacity-70 tracking-widest uppercase"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default LogoStrip;
