export function Manifesto() {
  return (
    <section className="py-24 bg-forest text-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-8">
          Our Founding Belief
        </p>
        <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
          &ldquo;Abeokuta does not need saviors.
          <br />
          <span className="text-gold">
            It needs believers with patience, structure,
            <br />
            and small cheques deployed wisely.&rdquo;
          </span>
        </blockquote>
        <p className="text-cream/60 text-lg leading-relaxed max-w-2xl mx-auto">
          Angel networks succeed when they think long-term, invest locally, and
          stay close to founders long after the pitch deck is forgotten.
          Capital is a vote of confidence. Abeokuta is ready for one.
        </p>
      </div>
    </section>
  );
}
