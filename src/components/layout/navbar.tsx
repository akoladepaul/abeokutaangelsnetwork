"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "For Investors", href: "/investors" },
  { label: "For Startups", href: "/startups" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

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
              <p className="font-bold text-charcoal text-sm leading-tight">
                Abeokuta Angels
              </p>
              <p className="text-muted text-xs leading-tight">Network</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/80 hover:text-forest px-3 py-2 rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/apply/startup">
              <Button variant="outline" size="sm">
                Pitch to Us
              </Button>
            </Link>
            <Link href="/apply/investor">
              <Button variant="primary" size="sm">
                Join as Investor
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-screen pb-4" : "max-h-0"
          )}
        >
          <div className="pt-2 flex flex-col gap-1 border-t border-cream-dark">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-charcoal/80 hover:text-forest px-3 py-2.5 rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-cream-dark">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="/apply/startup" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-center">
                  Pitch to Us
                </Button>
              </Link>
              <Link href="/apply/investor" onClick={() => setOpen(false)}>
                <Button variant="primary" size="sm" className="w-full justify-center">
                  Join as Investor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
