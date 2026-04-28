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
  housingType: "Shared dorm" | "Volunteer house" | "Host family" | "Private room" | null;
  mealsIncluded: boolean;
  applicationFeeNote: string | null;
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
  lastVerified: string;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  region: string;
  intro: string;
  metaDescription?: string;
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
          "No — most ESL volunteer programs in Vietnam do not require TEFL certification. Fluent English is the primary qualification, and providers generally offer a short in-country orientation before your first classroom day. A TEFL certificate can strengthen your application for more structured school placements, but it is rarely a hard requirement and will not disqualify you from any program listed here.",
      },
      {
        question: "How long do I need to stay?",
        answer:
          "Minimum durations in Vietnam start at 2 weeks, but a 4-week stay is widely considered the most practical commitment. Two weeks gives you just enough time to settle in before it's over; four weeks allows you to build genuine rapport with students and make a measurable difference. Providers increasingly prefer volunteers who commit to 8–12 weeks, and some offer discounted weekly rates for longer stays.",
      },
      {
        question: "Are flights included in the program fee?",
        answer:
          "No — flights to Vietnam are your own responsibility and are not included in any program fee listed on this site. Vietnam is well-served by major international carriers with connections through Bangkok, Hong Kong, and Singapore. Budget approximately $600–$1,200 for a round-trip from North America or Europe depending on your departure city and how far in advance you book.",
      },
      {
        question: "Is housing included in the program?",
        answer:
          "Yes — housing is included in all three Vietnam programs listed on this site. Accommodation is typically shared volunteer housing or a dorm-style facility within commuting distance of your placement school. Note that meals are not included in most Vietnam programs — budget $10–15 per day for food, which is easy to manage on local street food.",
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
          "No — the majority of volunteer placements in Thailand do not require TEFL certification. A willingness to engage with students and native or near-native English fluency are the main requirements. Most providers run a short teaching orientation in the first few days to help you prepare. A TEFL certificate is helpful if you want a longer-term or more formal placement, but it is not a standard requirement.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Most Thailand programs start at a minimum of 2 weeks, though 4-week placements are more common and more effective for students. If you're on a gap year or career break, committing to 6–8 weeks gives you time to settle into the community, build relationships with students, and explore the country on weekends. Many providers offer discounted weekly rates for stays of 8 weeks or more.",
      },
      {
        question: "Are meals included?",
        answer:
          "Meals are included in most Thailand programs, particularly in rural temple schools and village placements where you eat alongside the local community. Urban placements in Bangkok and Chiang Mai may include breakfast only or no meals at all. A $180/week program with meals included can work out significantly cheaper overall than a $140/week program without — always check inclusions before comparing prices.",
      },
      {
        question: "Is Thailand safe for solo volunteers?",
        answer:
          "Thailand is consistently rated one of the safest countries in Southeast Asia for solo travelers and volunteers, with a well-developed tourism infrastructure and low rates of serious crime directed at visitors. Reputable providers include in-country coordinators, 24/7 emergency support, and a structured arrival orientation covering local norms and practical safety. As with any international travel, standard precautions apply — keep copies of important documents and follow your provider's local guidance.",
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
          "Yes — Nepal is one of the most recommended destinations for first-time volunteers. Local communities are exceptionally welcoming, the cultural adjustment is manageable, and providers operating here tend to have strong on-the-ground support that helps new volunteers settle quickly. Living costs are low, and the overall experience tends to be deeply meaningful. Many people choose Nepal for their first volunteer trip precisely because it offers real impact without demanding prior experience.",
      },
      {
        question: "What is the minimum duration?",
        answer:
          "Most Nepal programs start at a minimum of 2 weeks, but 4–8 week stays are more typical and considerably more effective. A two-week placement leaves very little active teaching time once you account for arrival orientation and altitude acclimatization in higher-elevation placements. For a genuinely impactful experience, plan for at least 4 weeks.",
      },
      {
        question: "Are flights included?",
        answer:
          "No — flights to Nepal are your own responsibility and are not included in any program fee listed here. Kathmandu is the entry point for most volunteers and is served by Qatar Airways, Turkish Airlines, Air India, and Emirates among others. Budget approximately $700–$1,400 for a round-trip from North America or Europe depending on routing and booking lead time.",
      },
      {
        question: "Do programs include meals?",
        answer:
          "Yes — most Nepal programs include meals, either with a host family or at program accommodation. Meals are typically home-cooked Nepali food, with dal bhat (lentil soup with rice) as the staple. This inclusion significantly reduces your daily spending needs and is one reason Nepal ranks as one of the most affordable 4-week volunteer destinations on this site.",
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
          "Yes — English is the official language of Ghana and the primary medium of instruction in schools, which makes it uniquely accessible among African volunteer destinations. You won't need a translator to work with students or teachers. That said, most Ghanaians also speak Twi, Fante, or other regional languages in daily life — picking up a few basic phrases is appreciated and goes a long way in building rapport with the local community.",
      },
      {
        question: "What is the minimum stay?",
        answer:
          "Most Ghana programs require a minimum of 2–4 weeks. For volunteers who want to build real connections with students and move beyond surface-level impact, 8–12 week stays are strongly recommended. Ghana's school calendar follows a structure similar to the UK academic year, so aligning your arrival with the start of a school term will maximize your teaching time.",
      },
      {
        question: "Is housing safe and included?",
        answer:
          "Yes — all reputable programs listed on this site include accommodation in vetted housing, typically a shared volunteer house or homestay near your placement in Accra, Cape Coast, or a surrounding community. Providers conduct regular checks on housing quality and maintain 24/7 emergency contact protocols. Ghana is widely considered the most politically stable and safe entry point for volunteers to West Africa.",
      },
      {
        question: "Do I need any vaccinations for Ghana?",
        answer:
          "The following are recommended before traveling to Ghana: Yellow Fever vaccination (required for entry — proof is checked at the border), Typhoid, Hepatitis A, Tetanus, and Meningitis. Malaria prophylaxis is strongly advised for your entire stay. Consult a travel health clinic or your GP at least 6–8 weeks before departure to allow time for medication courses to take effect, and bring sufficient malaria tablets for the full length of your placement.",
      },
    ],
  },
  {
    slug: "peru",
    name: "Peru",
    flag: "🇵🇪",
    region: "South America",
    intro:
      "Peru is one of Latin America's most rewarding destinations to volunteer teach English. With programs based in Cusco, Lima, and the Sacred Valley, you can choose between urban classrooms in the capital and community schools near Machu Picchu. English education demand is growing rapidly across Peru — from primary schools in highland villages to secondary schools in Lima's expanding suburbs.\n\nMost ESL volunteer programs in Peru run year-round with flexible start dates, making it easier to fit a placement around your schedule. Costs typically range from $100–$230 per week, and housing — often with a host family or in a shared volunteer house — is usually included. A host family placement in Cusco typically includes meals as well, which keeps daily expenses low.\n\nNo prior teaching experience is required by most programs. Basic Spanish is helpful but not a prerequisite — your role is to deliver English instruction, and providers include in-country orientation before your first classroom day. Program lengths start at two weeks, though four weeks or longer tends to be more impactful for students and more rewarding for volunteers.",
    metaDescription:
      "Compare ESL volunteer programs in Peru by cost, location, and duration. Programs in Cusco, Lima, and the Sacred Valley from $100–$230/week. Independent comparison — no paid placements.",
    costSummary:
      "Weekly costs in Peru range from $100–$230/week. Housing is often included. Some programs also include meals with host families.",
    programTypes: [
      "Primary and secondary school teaching (Cusco highlands)",
      "Secondary school classroom support in Lima",
      "Community ESL conversation classes and adult literacy",
      "Sacred Valley and rural village programs",
      "Orphanage and underprivileged youth English programs",
      "TEFL-supported structured curriculum placements",
    ],
    faqs: [
      {
        question: "Do I need to speak Spanish to volunteer teach English in Peru?",
        answer:
          "Basic Spanish is helpful but not required by most programs. Your job is to teach English, and providers include in-country orientation to help you navigate daily life and communicate with school staff.",
      },
      {
        question: "What is the minimum stay for ESL volunteer programs in Peru?",
        answer:
          "Most Peru programs start at 2 weeks. Placements of 4–12 weeks are more impactful for students and more personally rewarding — many providers offer discounts for longer stays.",
      },
      {
        question: "Is altitude sickness a concern in Peru?",
        answer:
          "Cusco sits at about 3,400m elevation. Most volunteers acclimatize within 2–3 days. Your provider will advise on arrival protocols, and Lima-based placements have no altitude concerns.",
      },
      {
        question: "Are meals included in Peru volunteer programs?",
        answer:
          "Some Peru programs include meals, particularly those with host family placements in Cusco and the Sacred Valley. Urban placements in Lima less commonly include meals.",
      },
      {
        question: "What is the best time of year to volunteer teach English in Peru?",
        answer:
          "Peru's dry season runs May–September, making it the most popular time — especially in Cusco and the Sacred Valley. Most programs run year-round, so placements in the rainy season (October–April) are equally available and can be just as rewarding.",
      },
      {
        question: "Do I need a TEFL certificate to volunteer in Peru?",
        answer:
          "The majority of ESL volunteer programs in Peru do not require a TEFL certificate. A few providers offer an optional TEFL training component as part of the placement. What matters most is enthusiasm and reliability.",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: "No separate application fee — cost is all-inclusive",
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Host family",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: null,
    housingIncluded: true,
    housingType: "Shared dorm",
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
    lastVerified: "April 2026",
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
    applicationFeeNote: "No separate application fee — cost is all-inclusive",
    housingIncluded: true,
    housingType: "Host family",
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
    lastVerified: "April 2026",
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
