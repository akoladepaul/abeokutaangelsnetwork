"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Briefcase,
  Bell,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const investorNav: NavItem[] = [
  { label: "Deal Flow", href: "/portal/investor/feed", icon: <LayoutDashboard size={18} /> },
  { label: "Search", href: "/portal/investor/search", icon: <Search size={18} /> },
  { label: "Saved", href: "/portal/investor/saved", icon: <Bookmark size={18} /> },
  { label: "Messages", href: "/portal/investor/messages", icon: <MessageSquare size={18} /> },
  { label: "My Profile", href: "/portal/investor/profile", icon: <User size={18} /> },
];

const startupNav: NavItem[] = [
  { label: "Status", href: "/portal/startup/status", icon: <TrendingUp size={18} /> },
  { label: "Investors", href: "/portal/startup/investors", icon: <Briefcase size={18} /> },
  { label: "Opportunities", href: "/portal/startup/opportunities", icon: <Bell size={18} /> },
  { label: "Messages", href: "/portal/startup/messages", icon: <MessageSquare size={18} /> },
  { label: "My Profile", href: "/portal/startup/profile", icon: <User size={18} /> },
];

interface PortalNavProps {
  role: "investor" | "startup";
  userName?: string;
}

export function PortalNav({ role, userName }: PortalNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === "investor" ? investorNav : startupNav;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center flex-shrink-0">
          <span className="text-forest-dark font-bold text-xs">AAN</span>
        </div>
        <span className="text-cream font-bold text-sm">Portal</span>
      </Link>

      {/* Role badge */}
      <div className="px-4 py-3 border-b border-white/10">
        <span className="text-xs font-semibold text-gold uppercase tracking-widest">
          {role === "investor" ? "Investor" : "Startup"} Account
        </span>
        {userName && (
          <p className="text-cream/60 text-xs mt-0.5 truncate">{userName}</p>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors",
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-gold/10 text-gold"
                : "text-cream/70 hover:bg-white/5 hover:text-cream"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-cream/50 hover:text-cream text-sm transition-colors"
        >
          <TrendingUp size={16} />
          Back to site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 text-cream/50 hover:text-red-400 text-sm transition-colors w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:fixed lg:inset-y-0 bg-forest-dark border-r border-white/10 z-30">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-forest-dark border-b border-white/10 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} className="text-cream" /> : <Menu size={20} className="text-cream" />}
        </button>
        <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center">
          <span className="text-forest-dark font-bold text-xs">AAN</span>
        </div>
        <span className="text-cream font-bold text-sm">
          {role === "investor" ? "Investor Portal" : "Startup Portal"}
        </span>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-forest-dark flex flex-col">
            <NavContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
