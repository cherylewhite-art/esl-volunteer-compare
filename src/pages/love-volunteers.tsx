import React from "react";
import { ProviderPage } from "./provider-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function LoveVolunteers() {
  const provider = getProviderBySlug("love-volunteers")!;
  const programs = getProgramsByProvider("love-volunteers");
  return <ProviderPage provider={provider} programs={programs} />;
}
