import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/portal/admin-nav";

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();

  if (!profile || profile.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav userName={user.email} />
      <div className="lg:pl-56 pt-14 lg:pt-0">
        <main className="p-6 lg:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
