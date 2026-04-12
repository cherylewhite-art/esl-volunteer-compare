import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Switch, Route, Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { countries, providers, getProgramsByCountry } from "./data";
export { countries, providers } from "./data";

import Home from "./pages/home";
import Vietnam from "./pages/vietnam";
import Thailand from "./pages/thailand";
import Nepal from "./pages/nepal";
import Ghana from "./pages/ghana";
import Peru from "./pages/peru";
import IVHQ from "./pages/ivhq";
import ProjectsAbroad from "./pages/projects-abroad";
import GVI from "./pages/gvi";
import WorldVolunteers from "./pages/world-volunteers";
import LoveVolunteers from "./pages/love-volunteers";
import Countries from "./pages/countries";
import Providers from "./pages/providers";
import CostGuide from "./pages/cost-guide";
import About from "./pages/about";
import NotFound from "./pages/not-found";

// Static metadata for each route — used by the prerender script to inject
// correct <title>, <meta description>, and <link rel="canonical"> into <head>.
// This sidesteps react-helmet-async SSR accumulation issues.
const BASE = "https://eslvolunteerfinder.com";

export const routeMetadata: Record<string, { title: string; description: string; canonical: string }> = {
  "/": {
    title: "ESLVolunteerFinder — Compare ESL Volunteer Programs Abroad",
    description: "Compare ESL volunteer programs by cost, housing, and duration. No TEFL or degree required for most programs. Independent research — no paid placements.",
    canonical: `${BASE}/`,
  },
  "/countries": {
    title: "Compare ESL Volunteer Programs by Country | ESLVolunteerFinder",
    description: "Browse all countries with ESL volunteer teaching programs. Compare programs in Vietnam, Thailand, Nepal, Ghana, and Peru.",
    canonical: `${BASE}/countries`,
  },
  "/providers": {
    title: "ESL Volunteer Program Providers — Comparison | ESLVolunteerFinder",
    description: "Compare the top ESL volunteer program providers: IVHQ, Projects Abroad, GVI, World Volunteers, and Love Volunteers.",
    canonical: `${BASE}/providers`,
  },
  "/cost-guide": {
    title: "The True Cost of ESL Volunteer Programs | ESLVolunteerFinder",
    description: "How much does ESL volunteering really cost? A clear breakdown of weekly program fees, application fees, what's included, and hidden extras to watch for.",
    canonical: `${BASE}/cost-guide`,
  },
  "/about": {
    title: "About ESLVolunteerFinder",
    description: "ESLVolunteerFinder is an independent comparison site for ESL volunteer programs abroad. Learn how we collect data and how to use the site.",
    canonical: `${BASE}/about`,
  },
  ...Object.fromEntries(
    countries.map((c) => {
      const count = getProgramsByCountry(c.slug).length;
      return [
        `/volunteer-teach-english-${c.slug}`,
        {
          title: `Volunteer Teaching English in ${c.name} | ESLVolunteerFinder`,
          description: `Compare ESL volunteer programs in ${c.name} by weekly cost, minimum duration, and included housing. Independent comparison — ${count} programs listed.`,
          canonical: `${BASE}/volunteer-teach-english-${c.slug}`,
        },
      ];
    })
  ),
  ...Object.fromEntries(
    providers.map((p) => [
      `/program/${p.slug}`,
      {
        title: `${p.shortName ?? p.name} Review — ESL Volunteer Programs & Costs | ESLVolunteerFinder`,
        description: `Independent review of ${p.name}${p.shortName ? ` (${p.shortName})` : ""} ESL volunteer programs — costs, countries, inclusions, and what volunteers can expect. No paid placements.`,
        canonical: `${BASE}/program/${p.slug}`,
      },
    ])
  ),
};

export function render(url: string) {
  // Simple static location hook for SSR — avoids useSyncExternalStore
  const hook = () => [url, () => {}] as [string, (path: string) => void];

  const html = renderToStaticMarkup(
    <HelmetProvider>
      <Router hook={hook}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/volunteer-teach-english-vietnam" component={Vietnam} />
          <Route path="/volunteer-teach-english-thailand" component={Thailand} />
          <Route path="/volunteer-teach-english-nepal" component={Nepal} />
          <Route path="/volunteer-teach-english-ghana" component={Ghana} />
          <Route path="/volunteer-teach-english-peru" component={Peru} />
          <Route path="/program/international-volunteer-hq" component={IVHQ} />
          <Route path="/program/projects-abroad" component={ProjectsAbroad} />
          <Route path="/program/gvi" component={GVI} />
          <Route path="/program/world-volunteers" component={WorldVolunteers} />
          <Route path="/program/love-volunteers" component={LoveVolunteers} />
          <Route path="/countries" component={Countries} />
          <Route path="/providers" component={Providers} />
          <Route path="/cost-guide" component={CostGuide} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </HelmetProvider>
  );

  return { html };
}
