import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function InvestorProfilePage() {
  return (
    <AppShell
      title="Investor Profile"
      subtitle="Investor verification, focus areas, and portfolio summary."
    >
      <Card className="space-y-3">
        <CardTitle className="flex items-center gap-2">Nadia Kapoor <CheckCircle2 size={16} className="text-[var(--accent)]" /></CardTitle>
        <CardDescription>Verified Investor</CardDescription>
        <p className="text-sm text-[var(--text-main)]">Investment range: $250K - $2M</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Fintech</Badge>
          <Badge>SaaS</Badge>
          <Badge>B2B Infra</Badge>
        </div>
        <p className="text-sm text-[var(--text-main)]">Portfolio startups: LedgerPort, CrewFlow, TaxPilot</p>
        <p className="text-sm text-[var(--text-muted)]">Bio: Operator-turned-angel focused on capital-efficient fintech teams.</p>
      </Card>
    </AppShell>
  );
}
