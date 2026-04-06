"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { InvestorCard } from "@/components/investor-card";
import { InvestorSearchBar } from "@/components/investor-search-bar";

const investors = [
  {
    id: "inv-1",
    name: "Sarah Johnson",
    type: "Angel Investor",
    industries: ["AI", "FinTech"],
    range: "$50k - $250k",
    location: "San Francisco, CA",
    bio: "Backing early-stage fintech and applied AI teams with go-to-market discipline.",
    verified: true,
  },
  {
    id: "inv-2",
    name: "Michael Chen",
    type: "Venture Capitalist",
    industries: ["HealthTech", "SaaS"],
    range: "$100k - $1M",
    location: "New York, NY",
    bio: "Former operator investing in SaaS and digital health founders building durable revenue.",
    verified: true,
  },
  {
    id: "inv-3",
    name: "Aster Ventures",
    type: "Seed Fund",
    industries: ["ClimateTech", "Energy"],
    range: "$250k - $2M",
    location: "Austin, TX",
    bio: "Partnering with climate founders on hardware-light infrastructure and grid intelligence.",
    verified: true,
  },
  {
    id: "inv-4",
    name: "Priya Nair",
    type: "Angel Investor",
    industries: ["EdTech", "AI"],
    range: "$25k - $150k",
    location: "Seattle, WA",
    bio: "Focused on learning platforms and AI tutors with measurable student outcomes.",
    verified: false,
  },
  {
    id: "inv-5",
    name: "Northbridge Capital",
    type: "Venture Capitalist",
    industries: ["FinTech", "B2B SaaS"],
    range: "$500k - $5M",
    location: "Boston, MA",
    bio: "Institutional capital for B2B fintech platforms serving regulated enterprises.",
    verified: true,
  },
  {
    id: "inv-6",
    name: "Luis Ortega",
    type: "Angel Investor",
    industries: ["Marketplace", "Logistics"],
    range: "$75k - $300k",
    location: "Miami, FL",
    bio: "Investing in logistics tech and marketplace infrastructure across LATAM and the US.",
    verified: false,
  },
  {
    id: "inv-7",
    name: "Orchid Growth Partners",
    type: "Growth Fund",
    industries: ["HealthTech", "Bioinformatics"],
    range: "$2M - $10M",
    location: "Chicago, IL",
    bio: "Scaling growth-stage healthcare platforms with strong compliance and clinical adoption.",
    verified: true,
  },
  {
    id: "inv-8",
    name: "Keiko Tanaka",
    type: "Angel Investor",
    industries: ["Cybersecurity", "SaaS"],
    range: "$50k - $200k",
    location: "Denver, CO",
    bio: "Security-first investor with a focus on SaaS resilience and developer trust tooling.",
    verified: true,
  },
  {
    id: "inv-9",
    name: "Summit Ridge Ventures",
    type: "Micro VC",
    industries: ["AI", "Developer Tools"],
    range: "$150k - $750k",
    location: "Los Angeles, CA",
    bio: "Backing infrastructure that helps AI-native teams ship and scale faster.",
    verified: false,
  },
];

function uniqueValues(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export default function InvestorsPage() {
  const [filters, setFilters] = useState({
    search: "",
    industry: "",
    range: "",
    location: "",
  });

  const industryOptions = useMemo(
    () => uniqueValues(investors.flatMap((investor) => investor.industries)),
    []
  );
  const rangeOptions = useMemo(
    () => uniqueValues(investors.map((investor) => investor.range)),
    []
  );
  const locationOptions = useMemo(
    () => uniqueValues(investors.map((investor) => investor.location)),
    []
  );

  const filteredInvestors = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return investors.filter((investor) => {
      const matchesSearch = query
        ? investor.name.toLowerCase().includes(query) ||
          investor.industries.some((industry) => industry.toLowerCase().includes(query)) ||
          investor.type.toLowerCase().includes(query)
        : true;

      const matchesIndustry = filters.industry
        ? investor.industries.includes(filters.industry)
        : true;

      const matchesRange = filters.range ? investor.range === filters.range : true;

      const matchesLocation = filters.location
        ? investor.location === filters.location
        : true;

      return matchesSearch && matchesIndustry && matchesRange && matchesLocation;
    });
  }, [filters]);

  return (
    <AppShell
      title="Investors"
      subtitle="Discover investors interested in funding startups."
    >

      <InvestorSearchBar
        filters={filters}
        onFiltersChange={setFilters}
        industryOptions={industryOptions}
        rangeOptions={rangeOptions}
        locationOptions={locationOptions}
      />

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInvestors.map((investor) => (
          <InvestorCard key={investor.id} investor={investor} variant="detailed" />
        ))}
      </section>

      {filteredInvestors.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--text-muted)]">
          No investors found matching your search.
        </div>
      )}
    </AppShell>
  );
}
