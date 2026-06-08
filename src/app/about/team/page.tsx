import { team } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
  return (
    <div>
      <section className="bg-forest-dark text-cream py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Our Team</p>
          <h1 className="text-5xl font-bold mb-4">The believers.</h1>
          <p className="text-cream/70 text-xl max-w-xl">
            Operators, investors, and ecosystem builders who put their time and
            capital behind Abeokuta&apos;s future.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group p-6 border border-cream-dark rounded-sm hover:shadow-md hover:border-gold/30 transition-all"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-forest/10 group-hover:bg-forest rounded-sm flex items-center justify-center mb-5 transition-colors">
                  <span className="text-2xl font-bold text-forest group-hover:text-gold transition-colors">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                  {member.role}
                </p>
                <h3 className="text-lg font-bold text-charcoal mb-3">{member.name}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.sectors.map((s) => (
                    <Badge key={s} variant="sector">{s}</Badge>
                  ))}
                </div>
                {member.linkedin !== "#" && (
                  <a
                    href={member.linkedin}
                    className="inline-block mt-4 text-xs text-forest hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Join the founding cohort.</h2>
          <p className="text-muted mb-8">
            We are assembling our founding angel membership. Limited slots available.
          </p>
          <Link href="/apply/investor">
            <Button variant="primary" size="lg">Apply as an Investor</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
