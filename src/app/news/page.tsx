export default function NewsPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">News & Insights</p>
          <h1 className="text-5xl font-bold mb-4">From the Abeokuta ecosystem.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Investment insights, portfolio news, and ecosystem analysis.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted text-lg">Articles and ecosystem updates coming soon.</p>
        </div>
      </section>
    </div>
  );
}
