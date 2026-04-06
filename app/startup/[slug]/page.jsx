import { Download, FileUp, MapPin, Users } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { startups } from "@/data/mock";

export default function StartupProfilePage() {
  const startup = startups[0];

  return (
    <AppShell
      title="Startup Profile"
      subtitle="Showcase traction, funding needs, and investor interest."
    >
      <Card className="overflow-hidden p-0">
        <div className="h-36 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-2xl">{startup.name}</CardTitle>
            <Button variant="secondary">Connect with founder</Button>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
            <span>Industry: {startup.industry}</span>
            <span>Funding stage: {startup.stage}</span>
            <span>Funding required: {startup.fundingNeeded}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={14} /> {startup.location}</span>
          </div>
          <p className="max-w-3xl text-sm text-[var(--text-main)]">{startup.description}</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm"><FileUp size={14} className="mr-1" /> Upload pitch deck</Button>
            <Button size="sm" variant="outline"><Download size={14} className="mr-1" /> Download pitch deck</Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle className="flex items-center gap-2"><Users size={16} /> Team members</CardTitle>
          <CardDescription className="mt-2">Ava (CEO), Miguel (CTO), Priya (COO), Nate (Growth)</CardDescription>
        </Card>
        <Card>
          <CardTitle>Interested investors</CardTitle>
          <CardDescription className="mt-2">9 investors shortlisted, 4 in active diligence.</CardDescription>
        </Card>
      </div>
    </AppShell>
  );
}
