import React from "react";
import { ComparePage } from "./compare-page";
import { getProviderBySlug, getProgramsByProvider } from "@/data";

export default function CompareIVHQvsGVI() {
  const providerA = getProviderBySlug("international-volunteer-hq")!;
  const programsA = getProgramsByProvider("international-volunteer-hq").filter(
    (p) => p.countrySlug === "vietnam"
  );
  const providerB = getProviderBySlug("gvi")!;
  const programsB = getProgramsByProvider("gvi");

  return (
    <ComparePage
      providerA={providerA}
      programsA={programsA}
      providerB={providerB}
      programsB={programsB}
      title="IVHQ vs GVI: ESL Volunteer Programs in Vietnam Compared | ESLVolunteerFinder"
      description="IVHQ vs GVI for ESL volunteering in Vietnam: cost breakdown, TEFL inclusion, meals, and which program suits which type of volunteer. Independent comparison."
      canonical="https://eslvolunteerfinder.com/compare/ivhq-vs-gvi"
      intro="IVHQ and GVI both run ESL volunteer programs in Vietnam, making them directly comparable options for the same destination. GVI costs nearly twice as much per week — but includes a TEFL certificate, meals, and a more structured base camp model. This comparison breaks down whether that premium is worth it for your specific trip."
      verdictA="You want the most affordable option for Vietnam and are comfortable with a lighter-touch placement model. At $190/week with housing included, IVHQ Vietnam is one of the better-value ESL programs in Southeast Asia. You won't get a TEFL qualification, but you'll save several hundred dollars over a 4-week stay."
      verdictB="You want a TEFL certificate as a tangible outcome of your trip — either for your CV, for confidence in the classroom, or as a stepping stone toward paid ESL work. GVI's Vietnam program includes TEFL training, meals, and a structured base camp community, which suits volunteers who want more comprehensive preparation and a stronger support network."
      faqs={[
        {
          question: "How much more expensive is GVI than IVHQ for Vietnam?",
          answer: "GVI costs $320/week in Vietnam; IVHQ costs $190/week. Over a 4-week stay, that's $520 more in weekly fees. GVI includes meals and has no separate application fee (pricing is all-inclusive), while IVHQ charges a $249 application fee. Factoring these in, a 4-week placement costs approximately $1,529 total with GVI vs $1,009 with IVHQ — a difference of around $520 before flights and personal spending money.",
        },
        {
          question: "Is the TEFL certificate from GVI internationally recognized?",
          answer: "GVI provides a TEFL certificate as part of their Vietnam program. This certificate is recognized by most schools and volunteer organizations. If your goal is to use the qualification specifically for paid teaching work — particularly in countries with formal TEFL requirements like China or South Korea — verify whether the specific certification meets that country's requirements before assuming it will qualify you. For volunteer purposes and most freelance ESL work, it is widely accepted.",
        },
        {
          question: "Do IVHQ and GVI operate in the same city in Vietnam?",
          answer: "No — they're based in different cities. IVHQ's Vietnam program is in Ho Chi Minh City (Saigon), Vietnam's largest and most urban destination. GVI operates from Hoi An, a historically rich coastal town with a slower pace and a well-preserved old town. The programs offer genuinely different experiences beyond just price, and your preferred destination may make the choice for you.",
        },
        {
          question: "Is GVI's program more structured than IVHQ's?",
          answer: "Yes, noticeably so. GVI places volunteers in a base camp model with structured daily schedules, regular volunteer training sessions, and a curriculum aligned with UN Sustainable Development Goals. IVHQ placements are more flexible — you work alongside local teachers with more autonomy and less scheduled oversight. Neither approach is objectively better, but if you prefer clear structure and daily guidance, GVI suits you better. If you prefer independence and flexibility, IVHQ is the stronger fit.",
        },
        {
          question: "Does GVI include meals in Vietnam?",
          answer: "Yes — GVI's Vietnam program is fully all-inclusive: weekly fee covers accommodation, meals, and TEFL training with no separate application fee. IVHQ's Vietnam program includes housing only; meals are your own responsibility, which adds approximately $70–$100/week in food costs to the total budget. When comparing the two programs on a full-cost basis, GVI's effective premium over IVHQ is lower than the weekly fee difference suggests.",
        },
      ]}
    />
  );
}
