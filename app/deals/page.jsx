import { AppShell } from "@/components/layout/app-shell";
import { DealCard } from "@/components/deal-card";

export default function DealsPage() {
  const deals = [
    { id: "d1", startup: "FlowLedger", investor: "Nadia Kapoor", amount: "$750,000", equity: "8%", status: "Requested" },
    { id: "d2", startup: "MediSpan", investor: "RiverStone Capital", amount: "$2,200,000", equity: "14%", status: "Under Review" },
    { id: "d3", startup: "GridNova", investor: "Aster Ventures", amount: "$5,000,000", equity: "18%", status: "Negotiation" },
  ];

  return (
    <AppShell
      title="Deals & Funding"
      subtitle="Track active negotiations, requested terms, and closed rounds."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            startup={deal.startup}
            investor={deal.investor}
            amount={deal.amount}
            equity={deal.equity}
            status={deal.status}
          />
        ))}
      </section>

      {deals.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--text-muted)]">
          No deals available.
        </div>
      )}
    </AppShell>
  );
}
