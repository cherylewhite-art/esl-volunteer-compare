import React from "react";
import { ComparePage } from "./compare-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function CompareIVHQvsLoveVolunteers() {
  const providerA = getProviderBySlug("international-volunteer-hq")!;
  const programsA = getProgramsByProvider("international-volunteer-hq");
  const providerB = getProviderBySlug("love-volunteers")!;
  const programsB = getProgramsByProvider("love-volunteers");

  return (
    <ComparePage
      providerA={providerA}
      programsA={programsA}
      providerB={providerB}
      programsB={programsB}
      title="IVHQ vs Love Volunteers: ESL Volunteer Programs Compared | ESLVolunteerFinder"
      description="IVHQ vs Love Volunteers: side-by-side comparison of costs, countries, housing, and support for ESL volunteer programs in Vietnam and Nepal. Independent analysis."
      canonical="https://eslvolunteerfinder.com/compare/ivhq-vs-love-volunteers"
      intro="IVHQ and Love Volunteers are the two most affordable ESL volunteer providers on this site — and both operate programs in Vietnam and Nepal. The differences are subtle but real: organizational model, country breadth, and slight cost variations. This comparison covers everything you need to decide between them."
      verdictA="You want the largest provider network, the most country options, and a well-documented track record since 2007. IVHQ's scale means more consistency across countries and more volunteers to connect with in-country. It's the safer default for first-timers who want a proven, well-supported experience."
      verdictB="You value a nonprofit model where more of your fee goes directly to programs rather than to a for-profit operator. Love Volunteers runs placements in 50+ countries globally and is a strong option if you care about organizational ethics or want flexibility to explore programs across multiple trip types."
      faqs={[
        {
          question: "Is IVHQ or Love Volunteers cheaper?",
          answer: "Love Volunteers is slightly cheaper in Vietnam ($175/week vs $190/week for IVHQ) and comparable in Nepal. Both charge application fees on top of the weekly rate — Love Volunteers at $279 and IVHQ at $249. Over a 4-week stay in Vietnam, the total difference is roughly $60–$120 in weekly fees, which is small relative to the overall trip cost including flights and spending money.",
        },
        {
          question: "Do both IVHQ and Love Volunteers require a TEFL certificate?",
          answer: "No — neither IVHQ nor Love Volunteers requires TEFL certification for their ESL volunteer programs. Both accept volunteers who are native or near-native English speakers with no prior teaching experience. A willingness to engage with students and basic classroom management are the primary qualifications. IVHQ provides some pre-departure teaching resources, but formal certification is not expected.",
        },
        {
          question: "Which countries do both IVHQ and Love Volunteers operate in for ESL?",
          answer: "For the ESL programs listed on this site, both providers operate in Vietnam (Ho Chi Minh City) and Nepal. IVHQ additionally offers ESL programs in Thailand, Ghana, and Peru. Love Volunteers has a wider global footprint — programs in 50+ countries — but fewer ESL-specific programs in this region. If you're committed to Southeast Asia or South Asia specifically, both cover the key destinations.",
        },
        {
          question: "Which provider has better in-country support?",
          answer: "IVHQ is the larger organization and has more established in-country support infrastructure, particularly in high-volume destinations like Vietnam and Nepal. Love Volunteers' support quality is generally solid but varies more by country and coordinator. Neither is unreliable, but IVHQ's scale gives it an advantage in support consistency. If this matters to you, read reviews on GoOverseas or Trustpilot for the specific country you're targeting.",
        },
        {
          question: "Can I do programs with both IVHQ and Love Volunteers on the same trip?",
          answer: "Yes. Both accept independent applications and there's no exclusivity requirement. Some volunteers use IVHQ for one destination and Love Volunteers for another within a longer multi-country trip. If you're planning back-to-back volunteer stints — for example, Vietnam followed by Nepal — this can be a cost-effective way to compare both providers firsthand.",
        },
      ]}
    />
  );
}
