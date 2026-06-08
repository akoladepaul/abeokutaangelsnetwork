import { events } from "@/data/content";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Events</p>
          <h1 className="text-5xl font-bold mb-4">Where the network meets.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Pitch days, founder dinners, angel circles — small, high-trust, high-signal.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5">
            {events.map((ev) => (
              <Link
                key={ev.slug}
                href={`/events/${ev.slug}`}
                className="group flex gap-5 p-6 border border-cream-dark rounded-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                <div className="w-14 h-14 bg-gold/10 group-hover:bg-gold/20 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors">
                  <Calendar size={22} className="text-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">{ev.type}</span>
                      <h3 className="text-lg font-bold text-charcoal mt-0.5 group-hover:text-forest transition-colors">
                        {ev.title}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-forest bg-cream px-3 py-1 rounded-sm border border-cream-dark flex-shrink-0">
                      {ev.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted text-sm mt-1 mb-2">
                    <MapPin size={12} />
                    <span>{ev.location}</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{ev.description}</p>
                  <p className="text-xs text-forest mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View details <ArrowRight size={11} />
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center p-10 bg-cream rounded-sm border border-cream-dark">
            <h3 className="font-bold text-charcoal mb-2">Stay in the loop</h3>
            <p className="text-muted text-sm mb-6">Subscribe for event announcements and ecosystem updates.</p>
            <Link href="/#newsletter">
              <Button variant="primary">Get Event Updates</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
