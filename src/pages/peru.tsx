import React from "react";
import { CountryPage } from "./country-page";
import { getCountryBySlug, getProgramsByCountry } from "@/data";

export default function Peru() {
  const country = getCountryBySlug("peru")!;
  const programs = getProgramsByCountry("peru");
  return <CountryPage country={country} programs={programs} />;
}
