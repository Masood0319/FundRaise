export type Startup = {
  id: string;
  name: string;
  industry: string;
  stage: string;
  fundingNeeded: string;
  location: string;
  description: string;
};

export type Investor = {
  id: string;
  name: string;
  range: string;
  industries: string[];
  verified: boolean;
};

export const startups: Startup[] = [
  {
    id: "1",
    name: "FlowLedger",
    industry: "Fintech",
    stage: "Seed",
    fundingNeeded: "$1.2M",
    location: "Austin, TX",
    description: "AI-powered treasury workflow platform for SMB finance teams.",
  },
  {
    id: "2",
    name: "MediSpan",
    industry: "HealthTech",
    stage: "Pre-Series A",
    fundingNeeded: "$3.5M",
    location: "Boston, MA",
    description: "Remote chronic care coordination for multi-clinic networks.",
  },
  {
    id: "3",
    name: "GridNova",
    industry: "ClimateTech",
    stage: "Series A",
    fundingNeeded: "$8M",
    location: "San Jose, CA",
    description: "Predictive optimization for distributed battery systems.",
  },
];

export const investors: Investor[] = [
  {
    id: "i1",
    name: "Nadia Kapoor",
    range: "$250K - $2M",
    industries: ["Fintech", "SaaS", "B2B Infra"],
    verified: true,
  },
  {
    id: "i2",
    name: "RiverStone Capital",
    range: "$1M - $10M",
    industries: ["HealthTech", "Bioinformatics"],
    verified: true,
  },
  {
    id: "i3",
    name: "Kai Morgan",
    range: "$100K - $750K",
    industries: ["ClimateTech", "DeepTech"],
    verified: false,
  },
];

export const notifications = [
  { id: "n1", title: "New message", subtitle: "Nadia Kapoor sent you a pitch follow-up", time: "2m ago" },
  { id: "n2", title: "Connection request", subtitle: "RiverStone Capital wants to connect", time: "14m ago" },
  { id: "n3", title: "Startup viewed", subtitle: "3 investors viewed your startup profile", time: "1h ago" },
  { id: "n4", title: "Funding proposal", subtitle: "New proposal from Aster Ventures", time: "4h ago" },
];
