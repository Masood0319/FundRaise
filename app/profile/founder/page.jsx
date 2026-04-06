import { AppShell } from "@/components/layout/app-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function FounderProfilePage() {
  return (
    <AppShell
      title="Founder Profile"
      subtitle="Your verified founder details and startup overview."
    >
      <Card className="space-y-3">
        <CardTitle>Ava Thompson</CardTitle>
        <CardDescription>Founder & CEO</CardDescription>
        <p className="text-sm text-[var(--text-main)]">Startup: FlowLedger</p>
        <p className="text-sm text-[var(--text-main)]">Role: Product-led fintech founder</p>
        <p className="text-sm text-[var(--text-muted)]">
          Startup description: FlowLedger automates treasury workflows with AI-powered forecasting and variance controls for growing finance teams.
        </p>
      </Card>
    </AppShell>
  );
}
