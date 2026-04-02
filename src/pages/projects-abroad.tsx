import React from "react";
import { ProviderPage } from "./provider-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function ProjectsAbroad() {
  const provider = getProviderBySlug("projects-abroad")!;
  const programs = getProgramsByProvider("projects-abroad");
  return <ProviderPage provider={provider} programs={programs} />;
}
