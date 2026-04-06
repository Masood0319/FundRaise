import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const trendingIndustries = ["AI", "FinTech", "HealthTech", "Clean Energy", "SaaS"];

const recommendedInvestors = [
  { id: "inv-1", name: "Sarah Johnson", focus: "AI, FinTech" },
  { id: "inv-2", name: "Michael Chen", focus: "HealthTech, SaaS" },
  { id: "inv-3", name: "Aster Ventures", focus: "ClimateTech, Energy" },
];

const recentDeals = [
  { id: "deal-1", text: "John Smith invested $200k in PayFlow" },
  { id: "deal-2", text: "Sarah Lee invested $500k in MedAI" },
  { id: "deal-3", text: "RiverStone backed $1.2M in GridNova" },
];

const spotlightStartup = {
  name: "FlowLedger",
  industry: "FinTech",
  fundingNeeded: "$1.2M",
};

const platformStats = [
  { label: "New startups today", value: "18" },
  { label: "New investors", value: "7" },
  { label: "Active deals", value: "54" },
];

export function RightSidebar() {
  return (
    <aside className="space-y-4">
      <Card className="space-y-3">
        <CardTitle className="text-base">Trending industries</CardTitle>
        <div className="flex flex-wrap gap-2">
          {trendingIndustries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
            >
              {industry}
            </span>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Recommended investors</CardTitle>
        <div className="space-y-3">
          {recommendedInvestors.map((investor) => (
            <div key={investor.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)]">
                  {investor.name}
                </p>
                <CardDescription className="text-xs">{investor.focus}</CardDescription>
              </div>
              <Button size="sm" variant="outline" type="button">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Recent deals</CardTitle>
        <div className="space-y-2">
          {recentDeals.map((deal) => (
            <CardDescription key={deal.id}>{deal.text}</CardDescription>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Startup spotlight</CardTitle>
        <div className="space-y-2 rounded-xl bg-[var(--surface)] p-3">
          <p className="text-sm font-semibold text-[var(--text-main)]">
            {spotlightStartup.name}
          </p>
          <CardDescription>{spotlightStartup.industry}</CardDescription>
          <p className="text-sm text-[var(--text-muted)]">
            Funding needed: {spotlightStartup.fundingNeeded}
          </p>
        </div>
        <Button variant="secondary" size="sm" type="button">
          View startup
        </Button>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Platform activity</CardTitle>
        <div className="grid gap-3">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-[var(--surface)] p-3 text-center"
            >
              <p className="text-lg font-semibold text-[var(--primary)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
