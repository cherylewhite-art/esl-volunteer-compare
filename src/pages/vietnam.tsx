import React from "react";
import { CountryPage } from "./country-page";
import { getCountryBySlug, getProgramsByCountry } from "@/data";

export default function Vietnam() {
  const country = getCountryBySlug("vietnam")!;
  const programs = getProgramsByCountry("vietnam");
  return <CountryPage country={country} programs={programs} />;
}
