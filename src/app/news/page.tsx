import { newsArticles } from "@/data/content";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          <Link
            href={`/news/${newsArticles[0].slug}`}
            className="group block mb-10 p-8 border-2 border-cream-dark rounded-sm hover:border-gold/40 hover:shadow-lg transition-all"
          >
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">{newsArticles[0].category}</span>
            <h2 className="text-2xl font-bold text-charcoal mt-2 mb-3 group-hover:text-forest transition-colors">
              {newsArticles[0].title}
            </h2>
            <p className="text-muted leading-relaxed mb-4">{newsArticles[0].excerpt}</p>
            <div className="flex items-center gap-5 text-xs text-muted">
              <span className="flex items-center gap-1.5"><Calendar size={12} />{newsArticles[0].date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{newsArticles[0].readTime}</span>
              <span className="flex items-center gap-1 text-forest group-hover:gap-2 transition-all ml-auto">
                Read <ArrowRight size={11} />
              </span>
            </div>
          </Link>

          {/* Other articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newsArticles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group block p-6 border border-cream-dark rounded-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                <span className="text-xs font-semibold text-gold uppercase tracking-widest">{article.category}</span>
                <h3 className="text-lg font-bold text-charcoal mt-1.5 mb-2 group-hover:text-forest transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
