import React from "react";
import { ProviderPage } from "./provider-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function IVHQ() {
  const provider = getProviderBySlug("international-volunteer-hq")!;
  const programs = getProgramsByProvider("international-volunteer-hq");
  return <ProviderPage provider={provider} programs={programs} />;
}
