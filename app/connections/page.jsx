import { AppShell } from "@/components/layout/app-shell";
import { ConnectionCard } from "@/components/connection-card";

export default function ConnectionsPage() {
  const connections = [
    { id: "c1", name: "Nadia Kapoor", role: "Investor", interests: ["Fintech", "B2B SaaS", "AI"] },
    { id: "c2", name: "RiverStone Capital", role: "Investor", interests: ["HealthTech", "MedInfra"] },
    { id: "c3", name: "Ava Thompson", role: "Founder", interests: ["ClimateTech", "Energy AI"] },
  ];

  return (
    <AppShell
      title="Connections"
      subtitle="Manage relationships with founders and investors you've connected with."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection.id}
            name={connection.name}
            role={connection.role}
            interests={connection.interests}
          />
        ))}
      </section>

      {connections.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--text-muted)]">
          No connections yet.
        </div>
      )}
    </AppShell>
  );
}
