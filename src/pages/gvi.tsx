import React from "react";
import { ProviderPage } from "./provider-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function GVI() {
  const provider = getProviderBySlug("gvi")!;
  const programs = getProgramsByProvider("gvi");
  return <ProviderPage provider={provider} programs={programs} />;
}
