"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Investment Thesis", href: "/about/thesis" },
    ],
  },
  {
    label: "For Investors",
    href: "/investors",
    children: [
      { label: "Why Join", href: "/investors" },
      { label: "How It Works", href: "/investors/how-it-works" },
      { label: "FAQ", href: "/investors/faq" },
    ],
  },
  {
    label: "For Startups",
    href: "/startups",
    children: [
      { label: "Why Pitch to Us", href: "/startups" },
      { label: "Pitch Process", href: "/startups/how-it-works" },
      { label: "Opportunities", href: "/startups/opportunities" },
      { label: "FAQ", href: "/startups/faq" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-forest rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-bold text-sm">AAN</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-charcoal text-sm leading-tight">Abeokuta Angels</p>
              <p className="text-muted text-xs leading-tight">Network</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.href ? null : link.href)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-sm transition-colors",
                      pathname.startsWith(link.href) ? "text-forest" : "text-charcoal/80 hover:text-forest"
                    )}
                  >
                    {link.label}
                    <ChevronDown size={13} className={cn("transition-transform", activeDropdown === link.href && "rotate-180")} />
                  </button>
                  {activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-cream-dark rounded-sm shadow-lg py-1 min-w-44 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-charcoal/80 hover:bg-cream hover:text-forest transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium px-3 py-2 rounded-sm transition-colors",
                    pathname === link.href ? "text-forest" : "text-charcoal/80 hover:text-forest"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/apply/startup">
              <Button variant="outline" size="sm">Pitch to Us</Button>
            </Link>
            <Link href="/apply/investor">
              <Button variant="primary" size="sm">Join as Investor</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn("lg:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-screen pb-4" : "max-h-0")}>
          <div className="pt-2 flex flex-col gap-1 border-t border-cream-dark">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-charcoal/80 hover:text-forest px-3 py-2.5 rounded-sm"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-6 flex flex-col gap-0.5">
                    {link.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block text-sm text-muted hover:text-forest px-3 py-1.5 rounded-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-cream-dark">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link href="/apply/startup">
                <Button variant="outline" size="sm" className="w-full justify-center">Pitch to Us</Button>
              </Link>
              <Link href="/apply/investor">
                <Button variant="primary" size="sm" className="w-full justify-center">Join as Investor</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
