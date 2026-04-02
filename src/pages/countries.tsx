import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { countries, programs } from "@/data";

export default function Countries() {
  return (
    <Layout
      title="Compare ESL Volunteer Programs by Country"
      description="Browse all countries with ESL volunteer teaching programs. Compare programs in Vietnam, Thailand, Nepal, Ghana, and Peru."
      canonical="https://eslvolunteerfinder.com/countries"
    >
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">ESL Volunteer Programs by Country</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Select a country to compare programs by provider, cost, duration, and what's included.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {countries.map((country) => {
            const count = programs.filter((p) => p.countrySlug === country.slug).length;
            return (
              <Link
                key={country.slug}
                href={`/volunteer-teach-english-${country.slug}`}
                className="group flex flex-col p-6 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{country.flag}</div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{country.name}</div>
                    <div className="text-sm text-muted-foreground">{country.region}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                  {country.intro}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary/8 text-primary font-medium px-2.5 py-1 rounded-full border border-primary/15">
                    {count} programs
                  </span>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:underline">
                    Compare <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
