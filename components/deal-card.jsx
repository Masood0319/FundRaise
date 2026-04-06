import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function DealCard({
  startup,
  investor,
  amount,
  equity,
  status,
}) {
  return (
    <Card className="space-y-3 hover:bg-[var(--surface)]">
      <div className="flex items-center justify-between">
        <CardTitle>{startup}</CardTitle>
        <Badge className="text-[var(--secondary)]">{status}</Badge>
      </div>
      <CardDescription>Investor: {investor}</CardDescription>
      <p className="text-sm text-[var(--text-main)]">Proposed investment: {amount}</p>
      <p className="text-sm text-[var(--text-main)]">Equity: {equity}</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="success">
          Accept
        </Button>
        <Button size="sm" variant="outline">
          Reject
        </Button>
        <Button size="sm" variant="secondary">
          Start negotiation
        </Button>
      </div>
    </Card>
  );
}
