import { createClient } from "@/lib/supabase/server";
import { CheckCircle, Clock, Users, MessageSquare, TrendingUp } from "lucide-react";

export default async function StartupStatusPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("approved").eq("id", user!.id).single();

  const { data: startupProfile } = await supabase
    .from("startup_profiles").select("id, company_name, approved").eq("user_id", user!.id).single();

  const { data: matches } = startupProfile
    ? await supabase.from("matches").select("id, status, score").eq("startup_id", startupProfile.id)
    : { data: null };

  const totalMatches = matches?.length ?? 0;
  const interestedMatches = matches?.filter((m) => m.status === "interested").length ?? 0;
  const connectedMatches = matches?.filter((m) => m.status === "connected").length ?? 0;

  const steps = [
    {
      label: "Application Submitted",
      done: true,
      description: "Your pitch application has been received.",
    },
    {
      label: "Profile Under Review",
      done: !!startupProfile?.approved,
      active: !startupProfile?.approved,
      description: startupProfile?.approved
        ? "Your profile has been approved by the AAN team."
        : "The AAN team is reviewing your profile. This typically takes 3–5 business days.",
    },
    {
      label: "Matched with Investors",
      done: totalMatches > 0,
      active: !!startupProfile?.approved && totalMatches === 0,
      description: totalMatches > 0
        ? `You've been matched with ${totalMatches} investor${totalMatches !== 1 ? "s" : ""}.`
        : "Once approved, you'll be matched with relevant investors automatically.",
    },
    {
      label: "Investor Interest",
      done: interestedMatches > 0,
      active: totalMatches > 0 && interestedMatches === 0,
      description: interestedMatches > 0
        ? `${interestedMatches} investor${interestedMatches !== 1 ? "s have" : " has"} expressed interest.`
        : "Investors can express interest in your startup from their deal flow.",
    },
    {
      label: "Connected & Conversing",
      done: connectedMatches > 0,
      active: interestedMatches > 0 && connectedMatches === 0,
      description: connectedMatches > 0
        ? `You're in active conversation with ${connectedMatches} investor${connectedMatches !== 1 ? "s" : ""}.`
        : "Once both parties express interest, a connection is made and messaging is unlocked.",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">Overview</p>
        <h1 className="text-3xl font-bold text-charcoal">Application Status</h1>
        <p className="text-muted text-sm mt-1">Track your progress through the AAN matching process.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Matches", value: totalMatches, icon: Users },
          { label: "Investor Interest", value: interestedMatches, icon: TrendingUp },
          { label: "Connections", value: connectedMatches, icon: MessageSquare },
          { label: "Profile Status", value: startupProfile?.approved ? "Approved" : "Pending", icon: CheckCircle, text: true },
        ].map(({ label, value, icon: Icon, text }) => (
          <div key={label} className="bg-white border border-cream-dark rounded-sm p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} className="text-gold" />
              <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
            </div>
            <p className={`font-bold ${text ? "text-base" : "text-2xl"} text-charcoal`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div className="bg-white border border-cream-dark rounded-sm p-6">
        <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-6 pb-2 border-b border-cream-dark">
          Matching Pipeline
        </h2>
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-forest text-cream" : step.active ? "bg-gold/20 border-2 border-gold" : "bg-cream border border-cream-dark"}`}>
                  {step.done ? (
                    <CheckCircle size={16} />
                  ) : step.active ? (
                    <Clock size={14} className="text-gold" />
                  ) : (
                    <span className="text-xs text-muted">{i + 1}</span>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 min-h-[2rem] ${step.done ? "bg-forest/30" : "bg-cream-dark"}`} />
                )}
              </div>
              <div className="pb-6">
                <p className={`font-medium text-sm ${step.done ? "text-charcoal" : step.active ? "text-charcoal" : "text-muted"}`}>
                  {step.label}
                  {step.active && <span className="ml-2 text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">In progress</span>}
                </p>
                <p className="text-xs text-muted mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
