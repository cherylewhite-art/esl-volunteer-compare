import React from "react";
import { CountryPage } from "./country-page";
import { getCountryBySlug, getProgramsByCountry } from "@/data";

export default function Thailand() {
  const country = getCountryBySlug("thailand")!;
  const programs = getProgramsByCountry("thailand");
  return <CountryPage country={country} programs={programs} />;
}
