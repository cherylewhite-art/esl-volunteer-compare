import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
}

export function Layout({
  children,
  title = "ESLVolunteerFinder — Compare ESL Volunteer Programs Abroad",
  description = "Compare ESL volunteer programs by country, provider, cost, and duration. Independent research to help you find the right teaching volunteer program.",
  canonical,
}: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", exact: true },
    { href: "/countries", label: "Countries" },
    { href: "/providers", label: "Providers" },
    { href: "/cost-guide", label: "Cost Guide" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return location === href;
    return location.startsWith(href);
  };

  const pageTitle = title.includes("ESLVolunteerFinder")
    ? title
    : `${title} | ESLVolunteerFinder`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {canonical && <meta property="og:url" content={canonical} />}
        <meta property="og:image" content="https://eslvolunteerfinder.com/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://eslvolunteerfinder.com/opengraph.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ESLVolunteerFinder",
          "url": "https://eslvolunteerfinder.com",
          "description": "Compare ESL volunteer programs by country, provider, cost, and duration. Independent research — no paid placements."
        })}</script>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="ESLVolunteerFinder home">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-[11px] tracking-tight leading-none">ESL</span>
              </div>
              <span className="font-bold text-lg text-foreground tracking-tight">
                <span className="text-primary">VolunteerFinder</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href, link.exact)
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href, link.exact)
                    ? "text-primary bg-primary/8"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-[10px] tracking-tight leading-none">ESL</span>
                </div>
                <span className="font-bold text-white">ESLVolunteerFinder</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Independent comparison of ESL volunteer programs worldwide. Data gathered from public provider information. Prices may change — always verify on the official provider site.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Explore</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/countries" className="hover:text-white transition-colors">Countries</Link></li>
                <li><Link href="/providers" className="hover:text-white transition-colors">Providers</Link></li>
                <li><Link href="/cost-guide" className="hover:text-white transition-colors">Cost Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Methodology</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
            <p>© {new Date().getFullYear()} ESLVolunteerFinder. All rights reserved.</p>
            <p>Data sourced from public provider information. Always verify pricing directly with providers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
