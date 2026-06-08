import { events } from "@/data/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/events" className="text-gold text-xs font-semibold uppercase tracking-widest hover:underline">
            ← Events
          </Link>
          <div className="mt-6">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">{event.type}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-5 text-cream/60 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{event.date}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{event.venue}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-charcoal/80 text-lg leading-relaxed mb-8">{event.description}</p>

              {event.agenda && (
                <div>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Agenda</p>
                  <div className="flex flex-col gap-3">
                    {event.agenda.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-cream rounded-sm border border-cream-dark">
                        <Clock size={14} className="text-muted mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-charcoal/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-cream border border-cream-dark rounded-sm p-6 sticky top-20">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Event Details</p>
                <div className="flex flex-col gap-4">
                  {[
                    [Calendar, "Date", event.date],
                    [MapPin, "Venue", event.venue],
                    [MapPin, "City", event.location],
                  ].map(([Icon, label, value]) => (
                    <div key={label as string}>
                      <p className="text-xs text-muted uppercase tracking-wider mb-0.5">{label as string}</p>
                      <div className="flex items-center gap-1.5 text-charcoal font-medium text-sm">
                        {value as string}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/contact">
                    <Button variant="primary" size="md" className="w-full justify-center">
                      Register Interest
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
