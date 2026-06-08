// Central data store for portfolio companies, events, news, team, FAQs, opportunities
// In Phase 3 this gets replaced with a CMS

export const team = [
  {
    name: "Adewale Okonkwo",
    role: "Founding Chairman",
    bio: "Serial entrepreneur with 20+ years building businesses in Ogun State. Former MD at a regional manufacturing company. Angel investor in 8 startups.",
    linkedin: "#",
    sectors: ["AgriTech", "Manufacturing"],
  },
  {
    name: "Dr. Folake Adeyemi",
    role: "Managing Partner",
    bio: "VC professional and former venture builder. Holds an MBA from Lagos Business School. Previously at Ventures Platform. Passionate about university-linked founders.",
    linkedin: "#",
    sectors: ["EdTech", "HealthTech"],
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "Head of Deal Flow",
    bio: "Ex-investment banker turned angel. Spent 10 years structuring deals across West Africa before returning to build in secondary cities. CFA charterholder.",
    linkedin: "#",
    sectors: ["FinTech", "Logistics"],
  },
  {
    name: "Temilola Fashola",
    role: "Ecosystem Lead",
    bio: "Community builder and startup ecosystem specialist. Grew FUNAAB's innovation hub from 0 to 200+ founders. Connects the network to ABAN and EBAN.",
    linkedin: "#",
    sectors: ["Creative Industries", "EdTech"],
  },
  {
    name: "Babatunde Adekunle",
    role: "Legal & Compliance",
    bio: "Commercial lawyer with expertise in startup investment structures, term sheets, and regulatory compliance. Based in Abeokuta with a Lagos satellite practice.",
    linkedin: "#",
    sectors: ["FinTech", "HealthTech"],
  },
  {
    name: "Amina Bello-Kasim",
    role: "Investor Relations",
    bio: "HNWI relationship manager and former private banking executive. Connects diaspora capital to the Abeokuta ecosystem. Fluent in 4 languages.",
    linkedin: "#",
    sectors: ["FinTech", "AgriTech"],
  },
];

export const portfolioCompanies = [
  {
    slug: "farmlink-ng",
    name: "FarmLink NG",
    tagline: "Connecting smallholder farmers to premium buyers.",
    sector: "AgriTech",
    stage: "Pre-seed",
    year: 2024,
    location: "Abeokuta",
    description:
      "FarmLink digitises the farmer-to-buyer supply chain in Ogun State, giving smallholder farmers access to premium offtakers in Lagos and Abuja. The platform handles produce verification, logistics coordination, and payment settlement.",
    problem:
      "Smallholder farmers in Ogun State sell at 30–50% below market rates due to lack of market access and aggregation infrastructure.",
    team: "Founded by two FUNAAB agricultural science graduates who grew up on farms in Abeokuta.",
    website: "#",
    metrics: { users: "340 farmers", revenue: "₦4.2M GMV", growth: "Pilot stage" },
  },
  {
    slug: "edubuild-ng",
    name: "EduBuild NG",
    tagline: "Vocational skills for Ogun State youth.",
    sector: "EdTech",
    stage: "Seed",
    year: 2024,
    location: "Abeokuta",
    description:
      "EduBuild partners with trade associations and vocational institutes to deliver certified skills training via mobile. Focus on construction, electrical, and hospitality trades.",
    problem:
      "Youth unemployment in Ogun State sits above 35%. Technical and vocational skills are under-supplied, while the construction boom near Lagos creates huge demand.",
    team: "Led by a former NBTE official and a product engineer who built edtech tools at a pan-African NGO.",
    website: "#",
    metrics: { users: "1,200 learners", revenue: "₦2.8M ARR", growth: "3x YoY" },
  },
  {
    slug: "paylocal",
    name: "PayLocal",
    tagline: "Agent banking for underserved secondary cities.",
    sector: "FinTech",
    stage: "Pre-seed",
    year: 2024,
    location: "Sagamu",
    description:
      "PayLocal builds and manages agent banking networks in Ogun State secondary cities — towns underserved by traditional banks. Agents offer savings, transfers, and bill payments.",
    problem:
      "67% of adults in Ogun State's secondary cities are within 5km of a PayLocal agent but more than 20km from the nearest bank branch.",
    team: "Founders previously built agent networks for a tier-2 microfinance bank.",
    website: "#",
    metrics: { users: "85 active agents", revenue: "₦890K MRR", growth: "Early traction" },
  },
];

export const events = [
  {
    slug: "aan-founding-pitch-day",
    title: "AAN Founding Pitch Day",
    date: "September 2025",
    dateISO: "2025-09-20",
    location: "Abeokuta, Ogun State",
    venue: "Lisabi Gardens Conference Centre",
    type: "Pitch Day",
    status: "upcoming",
    description:
      "Our inaugural pitch day — 5 pre-selected startups present to AAN founding angel members. Open to founding members and invited guests only.",
    agenda: [
      "09:00 — Arrival & networking breakfast",
      "10:00 — AAN Chairman welcome address",
      "10:30 — Startup pitches (5 × 12 min + 8 min Q&A)",
      "13:30 — Lunch & informal investor-founder conversations",
      "15:00 — Investment committee closed session",
      "16:00 — Ecosystem panel: Building in secondary cities",
      "17:30 — Close & networking drinks",
    ],
  },
  {
    slug: "angel-investor-breakfast",
    title: "Angel Investor Breakfast",
    date: "August 2025",
    dateISO: "2025-08-14",
    location: "Abeokuta",
    venue: "Hillview Hotel",
    type: "Networking",
    status: "upcoming",
    description:
      "Closed-door breakfast for founding angel members. Investment thesis, governance structure, and Q3 deal flow discussion.",
    agenda: [
      "08:00 — Arrival & breakfast",
      "09:00 — AAN governance and operating model",
      "10:00 — Q3 deal flow review",
      "11:00 — Co-investment framework discussion",
      "12:00 — Close",
    ],
  },
  {
    slug: "founder-meetup-july",
    title: "Founder Meetup — Ogun State Builders",
    date: "July 2025",
    dateISO: "2025-07-10",
    location: "Abeokuta",
    venue: "FUNAAB Innovation Hub",
    type: "Community",
    status: "upcoming",
    description:
      "Open meetup for founders building in Ogun State. No pitching. No investors. Just connection, honest conversation, and community.",
    agenda: [
      "18:00 — Doors open",
      "18:30 — Lightning talks (3 founders × 5 mins)",
      "19:00 — Open discussion: Challenges building in Abeokuta",
      "20:00 — Networking",
      "21:00 — Close",
    ],
  },
];

export const newsArticles = [
  {
    slug: "abeokuta-angels-network-launches",
    title: "Abeokuta Angels Network Officially Launches",
    date: "June 2025",
    dateISO: "2025-06-01",
    category: "Network News",
    excerpt:
      "A group of investors, operators, and ecosystem builders has launched Abeokuta Angels Network — the city's first organised angel investment infrastructure.",
    readTime: "4 min read",
    content: `
Abeokuta Angels Network (AAN) has officially launched, marking a milestone for the Ogun State startup ecosystem. The network was founded by a group of professionals, entrepreneurs, and returning diaspora who identified a structural gap: brilliant founders building in secondary cities with no organised local capital to back them.

**Why Abeokuta?**

Ogun State has long punched below its weight in the Nigerian startup ecosystem. Home to two universities, a significant manufacturing base, proximity to Lagos, and deep agricultural land, the state has the raw ingredients for a thriving innovation economy. What it has lacked is organised belief — and a cheque book.

**The Investment Thesis**

AAN deploys patient pre-seed to early-stage capital with a deliberate local-first approach. The network's initial focus is Abeokuta, expanding to the wider Ogun State ecosystem and selected secondary cities as the portfolio matures.

Sectors of focus include EdTech, AgriTech, FinTech, Logistics, HealthTech, and the Creative Industries — all areas where Ogun State has a demonstrable local advantage.

**What's Next**

The founding cohort of angel members is being assembled now. The first pitch day is scheduled for Q3 2025. Founders can submit pitches via the network's platform, and accredited investors can apply for membership through the website.

*"Abeokuta does not need saviors. It needs believers with patience, structure, and small cheques deployed wisely."* — AAN Founding Charter
    `,
  },
  {
    slug: "why-secondary-cities-are-next",
    title: "Why Nigeria's Secondary Cities Are the Next Frontier for Angel Investment",
    date: "May 2025",
    dateISO: "2025-05-15",
    category: "Investment Insights",
    excerpt:
      "Lagos and Abuja dominate Nigeria's venture landscape. But the next wave of breakout startups may come from cities like Abeokuta, Enugu, and Ibadan.",
    readTime: "6 min read",
    content: `
The concentration of Nigerian startup capital in Lagos is well documented. Roughly 78% of all venture investment in Nigeria flows to Lagos-based companies. Abuja accounts for most of the remainder. Secondary cities — despite housing over 60% of Nigeria's population — receive less than 5% of total startup funding.

This is both a market failure and an opportunity.

**The Secondary City Advantage**

Building in Abeokuta, Ibadan, or Enugu carries real advantages that Lagos founders often overlook: lower operating costs, tighter community networks, university talent pools, and proximity to the agricultural and manufacturing supply chains that still drive the Nigerian economy.

**The Capital Gap**

The problem is not a lack of entrepreneurial activity. It's a lack of organised capital infrastructure. Lagos angels investing from a remove rarely understand the unit economics of a Sagamu-based logistics startup or the regulatory dynamics of a Microfinance Bank licence in Abeokuta.

Local angels — people who grew up here, know the mayor, understand the market — are the answer. But they've historically lacked the structure, deal flow systems, and co-investment frameworks to act consistently.

**What Changes Now**

Networks like Abeokuta Angels Network are changing this by doing what angel networks do in mature ecosystems: aggregating local capital, building structured deal flow, and staying close to founders. The playbook is not new. Applying it outside Lagos is.
    `,
  },
  {
    slug: "what-we-look-for-in-founders",
    title: "What Abeokuta Angels Network Looks For in Founders",
    date: "May 2025",
    dateISO: "2025-05-05",
    category: "Investment Insights",
    excerpt:
      "Not every brilliant idea deserves funding. Here's the honest criteria we use when evaluating founders pitching to AAN.",
    readTime: "5 min read",
    content: `
We see a lot of pitch decks. Most of them are optimistic. Many are well-designed. Very few tell us the truth.

Here's what we actually look for when evaluating founders who pitch to Abeokuta Angels Network.

**1. Problem Clarity**

Can you explain the problem in one sentence without jargon? Is it painful? Is it local and real? "Improving financial access" is not a problem. "Smallholder farmers in Ijebu-Ode sell produce at 40% below Lagos market rates because they lack transport coordination" — that's a problem.

**2. Local Market Understanding**

We invest in Abeokuta and Ogun State because we believe local founders have an edge. If you've spent 10 years in the market you're building for, that's a moat. If you're parachuting in from Lagos because land is cheaper, that's a risk factor.

**3. Honest Traction**

We use the Entrylevel deal flow framework internally. Under traction, we ask: what's real, what's vanity, and what's missing? Don't give us registered users who never opened the app. Give us weekly actives, GMV, retention, or NPS. If you're pre-revenue, say so clearly.

**4. Realistic Market Sizing**

Do your own TAM calculation — don't copy a global report and divide by population. How many potential customers are in Ogun State? What's realistic penetration in year 3? We'll stress-test the numbers, so it's better to have done it first.

**5. Founder-Market Fit**

Why you? Why now? Why here? The best founders we've met have either lived the problem themselves or spent years inside the industry they're disrupting. Background isn't destiny, but it matters.
    `,
  },
];

export const opportunities = [
  {
    id: "1",
    type: "Grant",
    title: "Tony Elumelu Foundation Entrepreneurship Programme",
    organisation: "Tony Elumelu Foundation",
    deadline: "Annually — check website",
    funding: "Up to $5,000 non-refundable seed capital",
    eligibility: "African entrepreneurs, early-stage businesses",
    link: "#",
    tags: ["Grant", "Pan-Africa", "Early-stage"],
  },
  {
    id: "2",
    type: "Accelerator",
    title: "Ventures Platform Catalysis Accelerator",
    organisation: "Ventures Platform",
    deadline: "Rolling applications",
    funding: "₦15M – ₦50M investment + acceleration programme",
    eligibility: "Nigerian startups with product-market fit evidence",
    link: "#",
    tags: ["Accelerator", "Nigeria", "Seed"],
  },
  {
    id: "3",
    type: "Grant",
    title: "NITDA Technology Innovation Fund",
    organisation: "NITDA Nigeria",
    deadline: "Check NITDA website for current cycle",
    funding: "Up to ₦10M grant funding",
    eligibility: "Nigerian technology startups, 2+ years operating",
    link: "#",
    tags: ["Grant", "Nigeria", "TechStartup"],
  },
  {
    id: "4",
    type: "Accelerator",
    title: "Google for Startups Accelerator Africa",
    organisation: "Google",
    deadline: "Annual — Q1 applications",
    funding: "Up to $200,000 in Google Cloud credits + mentorship",
    eligibility: "Series A+ African startups in AI/ML",
    link: "#",
    tags: ["Accelerator", "Pan-Africa", "AI", "Growth"],
  },
  {
    id: "5",
    type: "Competition",
    title: "Ogun State SME Innovation Challenge",
    organisation: "Ogun State Government / OGSMEDAN",
    deadline: "Check OGSMEDAN website",
    funding: "₦5M – ₦20M grants + business support",
    eligibility: "Businesses registered and operating in Ogun State",
    link: "#",
    tags: ["Grant", "OgunState", "SME"],
  },
  {
    id: "6",
    type: "Accelerator",
    title: "ABAN Angel Investment Readiness Programme",
    organisation: "African Business Angel Network",
    deadline: "Rolling, cohort-based",
    funding: "Non-dilutive readiness support + investor introductions",
    eligibility: "African startups seeking angel investment",
    link: "#",
    tags: ["Programme", "Pan-Africa", "Pre-seed"],
  },
  {
    id: "7",
    type: "Grant",
    title: "USAID West Africa Trade & Investment Hub",
    organisation: "USAID",
    deadline: "Programme-specific — check website",
    funding: "Grants up to $250,000 for AgriTech / TradeFinance",
    eligibility: "West African businesses in agriculture value chains",
    link: "#",
    tags: ["Grant", "AgriTech", "WestAfrica"],
  },
  {
    id: "8",
    type: "Fellowship",
    title: "AAN Angel Mentorship Circle",
    organisation: "Abeokuta Angels Network",
    deadline: "Rolling — apply via AAN portal",
    funding: "No equity. Structured 6-month mentorship from AAN angels.",
    eligibility: "Startups in AAN pipeline or AAN portfolio companies",
    link: "/apply/startup",
    tags: ["Mentorship", "Abeokuta", "Pre-seed"],
  },
];

export const investorFaqs = [
  {
    q: "What is the minimum investment amount?",
    a: "Our minimum ticket size is ₦5 million per deal. There is no cap, and members often co-invest in syndicates to write larger cheques.",
  },
  {
    q: "How many deals will I see per year?",
    a: "Our target is 4–6 curated investment opportunities per year. Quality over quantity — we would rather surface 4 exceptional deals than 20 mediocre ones.",
  },
  {
    q: "Do I have to invest in every deal?",
    a: "No. Membership gives you access to deal flow. You invest at your own discretion and pace. The only expectation is at least one investment per membership year.",
  },
  {
    q: "What sectors does AAN focus on?",
    a: "AgriTech, EdTech, FinTech, Logistics, HealthTech, and Creative Industries — sectors where Ogun State has a demonstrable local advantage.",
  },
  {
    q: "How are startups screened before I see them?",
    a: "Every startup goes through a two-stage internal screening: initial application review against our thesis, then a founder interview with the AAN deal team. You only see pre-screened opportunities.",
  },
  {
    q: "Can I lead a deal or syndicate?",
    a: "Yes. Experienced members are encouraged to lead deals. AAN provides standard term sheet templates and legal support for syndicate structuring.",
  },
  {
    q: "What is the annual membership fee?",
    a: "Membership fees are disclosed during the screening call. They cover platform access, deal sourcing operations, legal templates, events, and ecosystem programming.",
  },
  {
    q: "Are you affiliated with other angel networks?",
    a: "Yes. AAN is pursuing affiliation with ABAN (African Business Angel Network) and EBAN (European Business Angel Network), giving members access to their broader deal flow and co-investment pipelines.",
  },
];

export const startupFaqs = [
  {
    q: "What stage do you invest in?",
    a: "Pre-seed to early-stage. We are comfortable with pre-revenue companies that have a strong founding team, clear problem articulation, and early evidence of market demand.",
  },
  {
    q: "How much can I raise from AAN?",
    a: "We facilitate rounds of ₦5M to ₦50M, deployed by individual angels or syndicates. Larger rounds may involve co-investors from our ABAN/EBAN network.",
  },
  {
    q: "Do you only fund Abeokuta-based startups?",
    a: "Our primary focus is Abeokuta and Ogun State. We also consider startups from other secondary cities in Nigeria if the founder or business has a compelling local story.",
  },
  {
    q: "How long does the review process take?",
    a: "We review every application within 2 weeks and send a response — either a pass with brief feedback, or an invitation to move forward. We don't do black holes.",
  },
  {
    q: "Do I need to be incorporated before applying?",
    a: "Not necessarily. We evaluate the team, problem, and early traction first. If we are interested in proceeding, we will discuss incorporation as part of the investment readiness process.",
  },
  {
    q: "What do you take in equity?",
    a: "Terms are deal-specific. Typical angel investments in our range come with 5–15% equity, convertible notes, or SAFEs. We use standard documentation and don't over-complicate early-stage terms.",
  },
  {
    q: "Can I apply if I already have investors?",
    a: "Yes. We frequently co-invest alongside existing angels or institutional investors. We'll need disclosure of your current cap table.",
  },
  {
    q: "What happens after we're funded?",
    a: "We stay close. Funded founders get access to the AAN member network, quarterly check-ins with an assigned angel mentor, access to the opportunities board, and introductions to follow-on investors.",
  },
];
