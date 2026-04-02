import React from "react";
import { CountryPage } from "./country-page";
import { getCountryBySlug, getProgramsByCountry } from "@/data";

export default function Ghana() {
  const country = getCountryBySlug("ghana")!;
  const programs = getProgramsByCountry("ghana");
  return <CountryPage country={country} programs={programs} />;
}
