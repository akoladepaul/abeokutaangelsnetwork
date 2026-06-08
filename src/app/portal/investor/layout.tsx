import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortalNav } from "@/components/portal/portal-nav";

export default async function InvestorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/portal/investor/feed");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, approved")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "investor") {
    redirect("/portal/startup/status");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav role="investor" userName={user.email} />
      <div className="lg:pl-56 pt-14 lg:pt-0">
        <main className="p-6 lg:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
