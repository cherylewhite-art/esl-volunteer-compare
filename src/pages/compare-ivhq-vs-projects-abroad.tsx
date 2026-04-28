import React from "react";
import { ComparePage } from "./compare-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function CompareIVHQvsProjectsAbroad() {
  const providerA = getProviderBySlug("international-volunteer-hq")!;
  const programsA = getProgramsByProvider("international-volunteer-hq");
  const providerB = getProviderBySlug("projects-abroad")!;
  const programsB = getProgramsByProvider("projects-abroad");

  return (
    <ComparePage
      providerA={providerA}
      programsA={programsA}
      providerB={providerB}
      programsB={programsB}
      title="IVHQ vs Projects Abroad: ESL Volunteer Programs Compared | ESLVolunteerFinder"
      description="IVHQ vs Projects Abroad: a direct comparison of the budget and premium ends of ESL volunteering. Costs, support quality, countries, and who each suits. Independent analysis."
      canonical="https://eslvolunteerfinder.com/compare/ivhq-vs-projects-abroad"
      intro="IVHQ and Projects Abroad sit at opposite ends of the ESL volunteer cost spectrum — IVHQ at $160–$265/week, Projects Abroad at $300–$450/week. This isn't really a comparison of similar products. It's a question of what you're willing to pay for, and whether the premium structure of Projects Abroad justifies the significantly higher cost for your specific situation."
      verdictA="You're working with a limited budget, want a straightforward application process, and are comfortable managing some logistics yourself. IVHQ's scale gives you solid in-country support at a price that leaves room for flights, spending money, and additional countries. It's the right choice for the majority of ESL volunteers."
      verdictB="You want the highest level of in-country support, a fully structured curriculum, and comprehensive pre-departure preparation. Projects Abroad suits volunteers who are going for a longer placement, want everything organized, or need the structured experience for professional or academic purposes — and are prepared to pay significantly more for it."
      faqs={[
        {
          question: "Is Projects Abroad worth the higher cost compared to IVHQ?",
          answer: "It depends entirely on what you prioritize. Projects Abroad offers more intensive in-country staff support, a structured curriculum, and a longer track record with complex placements. IVHQ offers a thoroughly adequate experience at a fraction of the cost. Most budget-conscious volunteers find IVHQ entirely sufficient. If you're making a significant career or academic investment in the placement — or simply want everything managed for you — Projects Abroad's premium is justifiable.",
        },
        {
          question: "Do IVHQ and Projects Abroad both operate ESL programs in the same countries?",
          answer: "There is some overlap. For the ESL programs listed on this site, IVHQ operates in Vietnam, Thailand, Nepal, Ghana, and Peru. Projects Abroad's ESL programs on this site cover Peru. Both organizations have wider footprints globally, but for the specific countries covered here, IVHQ has significantly broader regional coverage. If Southeast Asia or West Africa is your target, IVHQ has a clear advantage in options.",
        },
        {
          question: "Which provider has a longer operating history?",
          answer: "Projects Abroad was founded in 1992, giving it over 30 years of operational history. IVHQ launched in 2007. Both are well-established and credible organizations, but Projects Abroad's longer track record means a deeper body of alumni, more institutional knowledge in challenging placements, and a more mature staff infrastructure. IVHQ has grown considerably faster and now operates at larger scale.",
        },
        {
          question: "Do both IVHQ and Projects Abroad include housing?",
          answer: "Yes — both providers include accommodation in their program fees. Projects Abroad typically also includes meals, which partially offsets the higher weekly cost when you calculate total in-country spend. IVHQ's housing is generally shared volunteer dorms; Projects Abroad's accommodation tends to be better resourced with more amenities. In both cases, you should verify exact inclusions for the specific country and program you're applying to.",
        },
        {
          question: "Does either provider require a TEFL certificate?",
          answer: "Neither IVHQ nor Projects Abroad requires TEFL certification for their ESL volunteer programs. Both accept volunteers with native or near-native English fluency and no prior teaching experience. Projects Abroad includes more structured in-country training to compensate — you'll receive more preparation before your first classroom day than you would with IVHQ.",
        },
      ]}
    />
  );
}
