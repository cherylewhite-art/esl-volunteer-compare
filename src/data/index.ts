// ============================================================
// ESLVolunteerFinder — Structured Content Data
// Edit this file to update programs, countries, and providers.
// ============================================================

export interface Program {
  slug: string;
  name: string;
  providerSlug: string;
  countrySlug: string;
  city: string;
  minDurationWeeks: number;
  maxDurationWeeks: number | null;
  weeklyCostUsd: number | null;  // null = free
  applicationFeeUsd: number | null;
  housingIncluded: boolean;
  mealsIncluded: boolean;
  ageMin: number | null;
  ageMax: number | null;
  requiresDegree: boolean;
  teflRequired: boolean;
  teflProvided: boolean;
  languageRequirements: string;
  classroomHoursPerWeek: number | null;
  programStartDates: string;
  summary: string;
  highlights: string[];
  websiteUrl: string;
  applicationUrl: string | null;
  contactEmail: string | null;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  region: string;
  intro: string;
  costSummary: string;
  programTypes: string[];
  faqs: { question: string; answer: string }[];
}

export interface Provider {
  slug: string;
  name: string;
  shortName?: string;
  website: string;
  summary: string;
  countriesOffered: string[];
  typicalWeeklyCostRange: string;
  minDurationRange: string;
  housingStatus: "Yes" | "No" | "Mixed";
  pros: string[];
  cons: string[];
}

// -------------------------------------------------------
// COUNTRIES
// -------------------------------------------------------
export const countries: Country[] = [
  {
    slug: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Southeast Asia",
    intro:
      "Vietnam is one of the most popular destinations for ESL volunteers in Asia. With a fast-growing economy and strong national emphasis on English education, demand for volunteer teachers is high. Programs are available in Hanoi, Ho Chi Minh City, Da Nang, and smaller provinces. Costs are generally affordable, and housing is often included. Most programs run year-round, making it easy to join at any time.",
    costSummary:
      "Weekly costs in Vietnam range from free to around $250/week. Most mid-range programs cost $100–$175/week and include shared housing. Application fees typically range from $195–$295. Meals are included in roughly half of programs.",
    programTypes: [
      "Primary school English teaching",
      "Secondary school classroom support",
      "Community English conversation clubs",
      "Rural village teaching programs",
      "Orphanage and underprivileged youth programs",
    ],
    faqs: [
      {
        question: "Do I need a TEFL certificate to volunteer in Vietnam?",
        answer:
          "Most volunteer programs do not require TEFL certification, though some programs offer it as part of the placement. A few programs aimed at long-term placements may prefer certified candidates.",
      },
      {
        question: "How long do I need to stay?",
        answer:
          "Minimum durations vary by program, typically 2–4 weeks. Longer commitments of 8–12 weeks are more impactful for the students and often preferred by providers.",
      },
      {
        question: "Are flights included in the program fee?",
        answer:
          "No. Flights are not included in any of the programs listed here. You are responsible for booking your own travel to Vietnam.",
      },
      {
        question: "Is housing included in the program?",
        answer:
          "Housing is included in most Vietnam programs listed on this site. Check each program's details for the exact inclusion status.",
      },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Southeast Asia",
    intro:
      "Thailand is a classic destination for ESL volunteers, with placements in schools, temples, and community centers across Bangkok, Chiang Mai, and rural provinces. The country's welcoming culture and affordable living costs make it ideal for first-time volunteers. Programs range from urban classroom support to immersive rural placements.",
    costSummary:
      "Weekly costs in Thailand typically range from $100–$250/week. Housing is commonly included. Application fees average $200–$350.",
    programTypes: [
      "Public school English teaching",
      "Temple school programs",
      "Rural community placements",
      "After-school conversation clubs",
    ],
    faqs: [
      {
        question: "Do I need a TEFL certificate for Thailand?",
        answer:
          "Most volunteer placements in Thailand do not require TEFL certification. Some providers include a short orientation or teaching workshop.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Most Thailand programs require a minimum of 2–4 weeks. Longer stays of 8+ weeks are more common and more impactful.",
      },
      {
        question: "Are meals included?",
        answer:
          "Meals are included in some programs, particularly rural placements. Urban placements often provide breakfast only or no meals.",
      },
      {
        question: "Is Thailand safe for solo volunteers?",
        answer:
          "Thailand is considered one of the safer countries for volunteer travel. Reputable providers offer in-country support and orientation on arrival.",
      },
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    flag: "🇳🇵",
    region: "South Asia",
    intro:
      "Nepal offers a uniquely meaningful volunteer experience, with programs in Kathmandu, Pokhara, and remote mountain villages. The education system is under-resourced in many areas, so ESL volunteers provide real impact. Living costs are low, and the cultural richness of Nepal makes it a memorable destination.",
    costSummary:
      "Nepal is one of the more affordable destinations for ESL volunteers. Weekly costs range from free to $180/week. Many programs include housing and meals.",
    programTypes: [
      "Government school support",
      "Remote mountain village teaching",
      "Kathmandu community programs",
      "Monastery school programs",
    ],
    faqs: [
      {
        question: "Is Nepal suitable for first-time volunteers?",
        answer:
          "Yes. Nepal is popular with first-time volunteers due to the warm welcome from local communities and strong provider support networks.",
      },
      {
        question: "What is the minimum duration?",
        answer:
          "Most Nepal programs start at 2 weeks minimum, with 4–8 week stays being most common.",
      },
      {
        question: "Are flights included?",
        answer: "No. Flights to Nepal are your own responsibility.",
      },
      {
        question: "Do programs include meals?",
        answer:
          "Most Nepal programs include meals with host families or at program accommodation. This is one of the benefits of programs in this region.",
      },
    ],
  },
  {
    slug: "ghana",
    name: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    intro:
      "Ghana is the most accessible entry point for volunteering in West Africa, with a stable democracy, English-speaking population, and a wide range of established volunteer programs. ESL placements focus on improving English literacy in schools and community centers in Accra, Cape Coast, and rural regions.",
    costSummary:
      "Weekly costs in Ghana range from $100–$210/week. Housing is commonly included. Application fees average $200–$300.",
    programTypes: [
      "Primary school English literacy",
      "Secondary school support",
      "Community adult education",
      "After-school tutoring programs",
    ],
    faqs: [
      {
        question: "Is Ghana English-speaking?",
        answer:
          "English is the official language of Ghana, which makes the transition easier for volunteers. Local languages such as Twi are also widely spoken.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Most Ghana programs require a minimum of 2–4 weeks. Longer stays of 8–12 weeks are recommended for deeper community impact.",
      },
      {
        question: "Is housing safe and included?",
        answer:
          "Most reputable programs in Ghana include accommodation in safe, vetted housing. Always verify this with your provider before booking.",
      },
      {
        question: "Do I need any vaccinations for Ghana?",
        answer:
          "Recommended vaccinations include Yellow Fever (required), Typhoid, Hepatitis A, and Malaria prophylaxis. Consult your doctor at least 6 weeks before travel.",
      },
    ],
  },
  {
    slug: "peru",
    name: "Peru",
    flag: "🇵🇪",
    region: "South America",
    intro:
      "Peru combines rich history and natural beauty with meaningful volunteer opportunities. ESL programs are concentrated in Cusco, Lima, and the Sacred Valley. English education demand is high in Peru's growing economy, and volunteer programs range from short immersion experiences to long-term school placements.",
    costSummary:
      "Weekly costs in Peru range from $100–$230/week. Housing is often included. Some programs also include meals with host families.",
    programTypes: [
      "Primary and secondary school teaching",
      "Community ESL conversation classes",
      "Sacred Valley village programs",
      "Lima urban school placements",
    ],
    faqs: [
      {
        question: "Do I need to speak Spanish to volunteer in Peru?",
        answer:
          "Basic Spanish is helpful but not required by most programs. Teaching in English is the goal, and providers offer orientation to help you communicate.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Most Peru programs start at 2 weeks. Placements of 4–12 weeks are more impactful and commonly offered.",
      },
      {
        question: "Is altitude sickness a concern?",
        answer:
          "Cusco sits at about 3,400m elevation. Most people acclimatize within 2–3 days. Your provider will advise on arrival protocols.",
      },
      {
        question: "Are meals included?",
        answer:
          "Some Peru programs include meals, particularly those with host family placements. Urban placements in Lima less commonly include meals.",
      },
    ],
  },
];

// -------------------------------------------------------
// PROVIDERS
// -------------------------------------------------------
export const providers: Provider[] = [
  {
    slug: "international-volunteer-hq",
    name: "International Volunteer HQ",
    shortName: "IVHQ",
    website: "https://www.volunteerhq.org",
    summary:
      "International Volunteer HQ (IVHQ) is one of the world's largest and most affordable volunteer travel organizations, operating since 2007. They offer structured ESL programs in dozens of countries with a strong track record of in-country support. IVHQ is known for transparent pricing and a straightforward application process.",
    countriesOffered: ["Vietnam", "Nepal", "Ghana", "Peru", "Thailand"],
    typicalWeeklyCostRange: "$160–$265/week",
    minDurationRange: "1–2 weeks",
    housingStatus: "Yes",
    pros: [
      "Very affordable program fees compared to the industry average",
      "Operates in 50+ countries — strong global network",
      "Straightforward application with quick placement confirmations",
      "Strong in-country support coordinators",
      "Good track record since 2007",
    ],
    cons: [
      "Larger group placements — less personalized than boutique providers",
      "Program quality varies by country and coordinator",
      "Shorter minimum stays can limit community impact",
    ],
  },
  {
    slug: "projects-abroad",
    name: "Projects Abroad",
    website: "https://www.projects-abroad.org",
    summary:
      "Projects Abroad is a premium volunteer organization founded in 1992, offering highly structured and support-intensive programs. They are known for their professional in-country staff and comprehensive pre-departure preparation. Programs tend to cost more but come with more hands-on support and longer-term structured placements.",
    countriesOffered: ["Peru"],
    typicalWeeklyCostRange: "$300–$450/week",
    minDurationRange: "2–4 weeks",
    housingStatus: "Yes",
    pros: [
      "Premium in-country support and professional coordinators",
      "Highly structured placements with clear objectives",
      "Strong pre-departure preparation and training",
      "Long operating history (since 1992) — well established",
      "Comprehensive insurance often included",
    ],
    cons: [
      "Significantly more expensive than competitors",
      "Less flexibility in placement dates and locations",
      "Application process can take longer",
    ],
  },
  {
    slug: "gvi",
    name: "GVI",
    website: "https://www.gvi.co.uk",
    summary:
      "GVI (Global Vision International) focuses on skills-based volunteering with an emphasis on sustainability and UN Sustainable Development Goals. Their ESL programs are designed for meaningful, measurable impact. GVI maintains dedicated base camps in many countries and places a strong emphasis on community-led development.",
    countriesOffered: ["Vietnam"],
    typicalWeeklyCostRange: "$290–$430/week",
    minDurationRange: "2 weeks",
    housingStatus: "Yes",
    pros: [
      "Strong emphasis on sustainable, community-led impact",
      "Well-organized base camps with good facilities",
      "Aligned with UN Sustainable Development Goals",
      "Regular skills training for volunteers",
    ],
    cons: [
      "Higher weekly cost compared to budget providers",
      "Programs can feel more regimented",
      "Fewer country options compared to largest providers",
    ],
  },
  {
    slug: "world-volunteers",
    name: "World Volunteers",
    website: "https://www.worldvolunteers.org",
    summary:
      "World Volunteers offers budget-conscious programs with a focus on accessibility for younger and first-time volunteers. Their ESL programs are available in several Southeast Asian and African countries with flexible start dates and shorter minimum stays.",
    countriesOffered: ["Ghana"],
    typicalWeeklyCostRange: "$120–$190/week",
    minDurationRange: "1 week",
    housingStatus: "Yes",
    pros: [
      "Lower weekly cost — good for budget-conscious travelers",
      "Flexible start dates throughout the year",
      "Short minimum stays of 1–2 weeks",
      "Good for first-time volunteers",
    ],
    cons: [
      "Less in-country support infrastructure than larger providers",
      "Housing quality more variable",
      "Fewer countries than major providers",
    ],
  },
  {
    slug: "love-volunteers",
    name: "Love Volunteers",
    website: "https://www.lovevolunteers.org",
    summary:
      "Love Volunteers is a New Zealand-based nonprofit that operates ESL and education programs in 50+ countries. They focus on low-cost, flexible placements and are popular with budget travelers who still want a supported volunteer experience.",
    countriesOffered: ["Vietnam", "Nepal"],
    typicalWeeklyCostRange: "$150–$230/week",
    minDurationRange: "2 weeks",
    housingStatus: "Yes",
    pros: [
      "Nonprofit organization — more of your fee goes to programs",
      "Low fees relative to the industry",
      "Wide country selection",
      "Flexible, year-round placements",
    ],
    cons: [
      "Variable in-country support quality",
      "Less structured than premium providers",
      "Fewer pre-departure resources",
    ],
  },
];

// -------------------------------------------------------
// PROGRAMS
// -------------------------------------------------------
export const programs: Program[] = [
  // ---- VIETNAM ----
  {
    slug: "ivhq-esl-vietnam",
    name: "ESL Teaching Volunteer Program in Vietnam",
    providerSlug: "international-volunteer-hq",
    countrySlug: "vietnam",
    city: "Ho Chi Minh City",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 190,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: false,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round (weekly start dates)",
    summary:
      "Volunteer with IVHQ in Ho Chi Minh City and support English-language education in local schools and community centers. This program places volunteers in structured classroom settings with local teacher supervisors. No teaching experience is required. Housing is provided in shared volunteer accommodation close to your placement site.",
    highlights: [
      "Placement in public schools and community centers",
      "Shared volunteer housing included",
      "Weekly start dates for maximum flexibility",
      "In-country coordinator support",
      "Orientation on arrival",
      "No TEFL or degree required",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/vietnam/teaching-english-in-ho-chi-minh/",
    applicationUrl: "https://www.volunteerhq.org/destinations/vietnam/teaching-english-in-ho-chi-minh/",
    contactEmail: null,
  },
  {
    slug: "gvi-vietnam-teaching",
    name: "Community Teaching in Vietnam",
    providerSlug: "gvi",
    countrySlug: "vietnam",
    city: "Hoi An",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 320,
    applicationFeeUsd: null,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: true,
    languageRequirements: "Native or fluent English",
    classroomHoursPerWeek: 20,
    programStartDates: "Monthly intake",
    summary:
      "GVI's community teaching program in Hoi An, Vietnam places volunteers in local community centers and public schools. A TEFL qualification is provided as part of the program. GVI emphasizes sustainable, community-led impact aligned with UN Sustainable Development Goals.",
    highlights: [
      "TEFL qualification included",
      "Accommodation and meals provided",
      "Base camp with facilities and community",
      "Structured program with clear goals",
      "Monthly intake for community cohesion",
      "Aligned with UN SDGs",
    ],
    websiteUrl: "https://people.gvi.co.uk/programs/volunteer-with-children-and-teach-english-in-vietnam/",
    applicationUrl: null,
    contactEmail: null,
  },
  {
    slug: "love-volunteers-vietnam",
    name: "Volunteer Teaching English in Vietnam",
    providerSlug: "love-volunteers",
    countrySlug: "vietnam",
    city: "Ho Chi Minh City",
    minDurationWeeks: 2,
    maxDurationWeeks: 12,
    weeklyCostUsd: 175,
    applicationFeeUsd: 279,
    housingIncluded: true,
    mealsIncluded: false,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or fluent English",
    classroomHoursPerWeek: 18,
    programStartDates: "Year-round (flexible start dates)",
    summary:
      "Love Volunteers places ESL volunteers in public schools and community English programs in Ho Chi Minh City. As a nonprofit, Love Volunteers keeps fees low while maintaining vetted, supported placements. Housing in shared volunteer accommodation is included.",
    highlights: [
      "Nonprofit with low program fees",
      "Flexible year-round start dates",
      "Placement in Ho Chi Minh City's local schools",
      "Shared volunteer housing included",
      "18+ with no degree required",
    ],
    websiteUrl: "https://www.lovevolunteers.org/destinations/volunteer-vietnam/teaching-english-ho-chi-minh-city",
    applicationUrl: null,
    contactEmail: null,
  },
  // ---- THAILAND ----
  {
    slug: "ivhq-esl-thailand",
    name: "ESL Teaching Volunteer Program in Thailand",
    providerSlug: "international-volunteer-hq",
    countrySlug: "thailand",
    city: "Chiang Mai",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 180,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round (weekly start dates)",
    summary:
      "IVHQ's Thailand ESL program places volunteers in public schools and after-school English clubs in and around Chiang Mai. Accommodation is included and start dates are available every week throughout the year.",
    highlights: [
      "Weekly flexible start dates",
      "Public school and community placements",
      "Shared housing included",
      "In-country IVHQ coordinator",
      "No TEFL or degree required",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/thailand/teaching-in-chiang-mai/",
    applicationUrl: "https://www.volunteerhq.org/destinations/thailand/teaching-in-chiang-mai/",
    contactEmail: null,
  },
  {
    slug: "ivhq-esl-thailand-hua-hin",
    name: "ESL Teaching Volunteer Program in Thailand (Hua Hin)",
    providerSlug: "international-volunteer-hq",
    countrySlug: "thailand",
    city: "Hua Hin",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 263,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round (weekly start dates)",
    summary:
      "IVHQ's Hua Hin ESL program places volunteers in public schools and community English programs in this coastal city south of Bangkok. Accommodation is included and start dates are available every week throughout the year.",
    highlights: [
      "Weekly flexible start dates",
      "Public school and community placements",
      "Shared housing included",
      "In-country IVHQ coordinator",
      "No TEFL or degree required",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/thailand/teaching-english-in-hua-hin/",
    applicationUrl: "https://www.volunteerhq.org/destinations/thailand/teaching-english-in-hua-hin/",
    contactEmail: null,
  },
  // ---- NEPAL ----
  {
    slug: "ivhq-esl-nepal",
    name: "ESL Teaching Volunteer Program in Nepal",
    providerSlug: "international-volunteer-hq",
    countrySlug: "nepal",
    city: "Kathmandu",
    minDurationWeeks: 1,
    maxDurationWeeks: 24,
    weeklyCostUsd: 160,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 18,
    programStartDates: "Year-round",
    summary:
      "IVHQ's Nepal teaching program is based in Kathmandu and places volunteers in local schools serving underprivileged communities. At $160/week with housing and meals included, this is one of the most affordable structured programs available.",
    highlights: [
      "Housing AND meals included",
      "One of the lowest weekly costs available",
      "1-week minimum for maximum flexibility",
      "Placement in underserved community schools",
      "In-country IVHQ coordinator",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/nepal/teaching-english/",
    applicationUrl: null,
    contactEmail: null,
  },
  {
    slug: "love-volunteers-nepal",
    name: "Volunteer Teaching English in Nepal",
    providerSlug: "love-volunteers",
    countrySlug: "nepal",
    city: "Pokhara",
    minDurationWeeks: 2,
    maxDurationWeeks: 12,
    weeklyCostUsd: 155,
    applicationFeeUsd: 279,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or fluent English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round",
    summary:
      "Love Volunteers places ESL volunteers in schools in Pokhara, the gateway to the Annapurna mountain range. One of the most affordable all-inclusive programs available, with housing and meals covered by the weekly fee.",
    highlights: [
      "Housing and meals included",
      "Very affordable all-inclusive fee",
      "Pokhara base — stunning mountain setting",
      "Nonprofit organization",
      "Year-round start dates",
    ],
    websiteUrl: "https://www.lovevolunteers.org/destinations/volunteer-nepal/teaching-monasteries-pokhara",
    applicationUrl: null,
    contactEmail: null,
  },
  // ---- GHANA ----
  {
    slug: "ivhq-esl-ghana",
    name: "ESL Teaching Volunteer Program in Ghana",
    providerSlug: "international-volunteer-hq",
    countrySlug: "ghana",
    city: "Accra",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 195,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round",
    summary:
      "IVHQ's Ghana teaching program is based in Accra and places volunteers in primary schools and community education centers. Housing and meals are included. Ghana is an excellent entry point for first-time Africa volunteers due to its stable environment and English-speaking population.",
    highlights: [
      "Housing and meals included",
      "First-time Africa volunteer friendly",
      "English-speaking country",
      "Accra base with good transport links",
      "Flexible duration up to 24 weeks",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/ghana/teaching-english/",
    applicationUrl: null,
    contactEmail: null,
  },
  {
    slug: "world-volunteers-ghana",
    name: "Teach English in Ghana",
    providerSlug: "world-volunteers",
    countrySlug: "ghana",
    city: "Cape Coast",
    minDurationWeeks: 1,
    maxDurationWeeks: 12,
    weeklyCostUsd: 145,
    applicationFeeUsd: 195,
    housingIncluded: true,
    mealsIncluded: false,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or fluent English",
    classroomHoursPerWeek: 18,
    programStartDates: "Monthly intake",
    summary:
      "World Volunteers offers an affordable short-stay teaching program based in Cape Coast, Ghana's historic coastal city. The 1-week minimum makes it accessible for those with limited time. Housing is provided. Cape Coast schools serve communities near the city's famous castles and fishing districts.",
    highlights: [
      "1-week minimum — highly flexible",
      "Budget-friendly weekly cost",
      "Cape Coast historic location",
      "Housing included",
      "Monthly group intakes",
    ],
    websiteUrl: "https://www.worldvolunteers.org",
    applicationUrl: null,
    contactEmail: null,
  },
  // ---- PERU ----
  {
    slug: "ivhq-esl-peru",
    name: "ESL Teaching Volunteer Program in Peru",
    providerSlug: "international-volunteer-hq",
    countrySlug: "peru",
    city: "Cusco",
    minDurationWeeks: 2,
    maxDurationWeeks: 24,
    weeklyCostUsd: 205,
    applicationFeeUsd: 249,
    housingIncluded: true,
    mealsIncluded: false,
    ageMin: 18,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Native or near-native English",
    classroomHoursPerWeek: 20,
    programStartDates: "Year-round (weekly start dates)",
    summary:
      "Volunteer with IVHQ in Cusco, the historic capital of the Inca Empire. This program places volunteers in local schools and community English clubs. Weekly start dates provide maximum flexibility.",
    highlights: [
      "Cusco base — close to Machu Picchu",
      "Weekly flexible start dates",
      "Housing included",
      "Community school placements",
      "No TEFL or degree required",
    ],
    websiteUrl: "https://www.volunteerhq.org/destinations/peru/teaching-english-in-cusco/",
    applicationUrl: null,
    contactEmail: null,
  },
  {
    slug: "projects-abroad-peru",
    name: "Teaching English in Peru",
    providerSlug: "projects-abroad",
    countrySlug: "peru",
    city: "Cusco",
    minDurationWeeks: 2,
    maxDurationWeeks: 12,
    weeklyCostUsd: 420,
    applicationFeeUsd: null,
    housingIncluded: true,
    mealsIncluded: true,
    ageMin: 16,
    ageMax: null,
    requiresDegree: false,
    teflRequired: false,
    teflProvided: false,
    languageRequirements: "Fluent English",
    classroomHoursPerWeek: 25,
    programStartDates: "Year-round",
    summary:
      "Projects Abroad offers a premium teaching placement in Cusco, Peru with full accommodation, meals, and professional in-country support. Volunteers teach in local schools and receive structured lesson frameworks.",
    highlights: [
      "Accommodation and meals included",
      "Professional in-country support team",
      "Structured lesson frameworks provided",
      "Suitable from age 16",
      "Cusco — stunning Andean location",
    ],
    websiteUrl: "https://www.projects-abroad.org/projects/volunteer-teaching-peru/",
    applicationUrl: null,
    contactEmail: null,
  },
];

// -------------------------------------------------------
// HELPERS
// -------------------------------------------------------
export function getProgramsByCountry(countrySlug: string): Program[] {
  return programs.filter((p) => p.countrySlug === countrySlug);
}

export function getProgramsByProvider(providerSlug: string): Program[] {
  return programs.filter((p) => p.providerSlug === providerSlug);
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function formatCost(weeklyCostUsd: number | null): string {
  if (weeklyCostUsd === null) return "Free";
  return `$${weeklyCostUsd}/wk`;
}

export function formatDuration(min: number, max: number | null): string {
  if (max === null) return `${min}+ weeks`;
  if (min === max) return `${min} weeks`;
  return `${min}–${max} weeks`;
}

export function getProviderName(providerSlug: string): string {
  return getProviderBySlug(providerSlug)?.name ?? providerSlug;
}

export function getCountryName(countrySlug: string): string {
  return getCountryBySlug(countrySlug)?.name ?? countrySlug;
}

export function getFlagEmoji(countrySlug: string): string {
  const flags: Record<string, string> = {
    vietnam: "🇻🇳",
    thailand: "🇹🇭",
    nepal: "🇳🇵",
    ghana: "🇬🇭",
    peru: "🇵🇪",
  };
  return flags[countrySlug] ?? "🌍";
}
