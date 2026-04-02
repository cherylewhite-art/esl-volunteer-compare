import React from "react";
import { ProviderPage } from "./provider-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function WorldVolunteers() {
  const provider = getProviderBySlug("world-volunteers")!;
  const programs = getProgramsByProvider("world-volunteers");
  return <ProviderPage provider={provider} programs={programs} />;
}
