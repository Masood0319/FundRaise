import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
export function StartupCard({ startup }) {
  return (
    <Card className="space-y-3 hover:bg-[var(--surface)]">
      <div className="flex items-start justify-between">
        <CardTitle>{startup.name}</CardTitle>
        <Badge>{startup.stage}</Badge>
      </div>
      <CardDescription>{startup.industry}</CardDescription>
      <p className="text-sm text-[var(--text-main)]">{startup.description}</p>
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <MapPin size={14} /> {startup.location}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--primary)]">Need: {startup.fundingNeeded}</span>
      </div>
      <div className="flex gap-2">
        <Link href={`/startup/${startup.id}`}>
          <Button size="sm">View startup</Button>
        </Link>
        <Button size="sm" variant="outline">
          Connect
        </Button>
        <Button size="sm" variant="secondary">
          Show interest
        </Button>
      </div>
    </Card>
  );
}
