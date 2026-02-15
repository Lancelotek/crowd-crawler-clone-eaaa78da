const QuoteSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Ludzie nie kupują produktów,
          <br />
          <span className="text-primary">kupują lepsze wersje siebie.</span>
        </h2>
        <a
          href="#kontakt"
          className="mt-10 inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Zarezerwuj 30-minutową konsultację
        </a>
      </div>
    </section>
  );
};

export default QuoteSection;
