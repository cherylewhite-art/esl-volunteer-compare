import React from "react";
import { CountryPage } from "./country-page";
import { getCountryBySlug, getProgramsByCountry } from "@/data";

export default function Nepal() {
  const country = getCountryBySlug("nepal")!;
  const programs = getProgramsByCountry("nepal");
  return <CountryPage country={country} programs={programs} />;
}
