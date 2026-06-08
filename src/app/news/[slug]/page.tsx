import { newsArticles } from "@/data/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h3 key={i} className="text-lg font-bold text-charcoal mt-8 mb-3">{line.replace(/\*\*/g, "")}</h3>;
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="text-charcoal/80 leading-relaxed mb-0"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }}
        />
      );
    });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="inline-flex items-center gap-1 text-gold text-xs font-semibold uppercase tracking-widest hover:underline mb-6">
            <ChevronLeft size={14} /> News
          </Link>
          <span className="block text-gold text-xs font-semibold uppercase tracking-widest mb-4">{article.category}</span>
          <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-5 text-cream/50 text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={13} />{article.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} />{article.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-charcoal/70 leading-relaxed mb-8 pb-8 border-b border-cream-dark">
            {article.excerpt}
          </p>
          <div className="flex flex-col gap-4">
            {renderMarkdown(article.content)}
          </div>

          <div className="mt-16 pt-8 border-t border-cream-dark">
            <Link href="/news" className="text-forest text-sm font-medium hover:underline">
              ← Back to all news
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
