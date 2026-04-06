import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function InvestorCard({ investor, variant = "compact" }) {
  const isDetailed = variant === "detailed";

  return (
    <Card className={cn("space-y-3 hover:bg-[var(--surface)]", isDetailed && "space-y-4")}> 
      {isDetailed ? (
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold text-[var(--primary)]">
            {getInitials(investor.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="truncate">{investor.name}</CardTitle>
              {investor.verified && <CheckCircle2 className="text-[var(--accent)]" size={16} />}
            </div>
            {investor.type && (
              <p className="text-sm text-[var(--text-muted)]">{investor.type}</p>
            )}
            {investor.location && (
              <p className="text-xs text-[var(--text-muted)]">{investor.location}</p>
            )}
          </div>
          {investor.range && <Badge>{investor.range}</Badge>}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {investor.name}
            {investor.verified && <CheckCircle2 className="text-[var(--accent)]" size={16} />}
          </CardTitle>
          {investor.range && <Badge>{investor.range}</Badge>}
        </div>
      )}

      <CardDescription>Preferred sectors</CardDescription>
      <div className="flex flex-wrap gap-2">
        {investor.industries.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {isDetailed && investor.bio && (
        <p className="text-sm text-[var(--text-muted)]">{investor.bio}</p>
      )}

      <div className={cn("flex gap-2", isDetailed ? "pt-1" : "")}> 
        {isDetailed && (
          <Button variant="outline" size="sm" type="button">
            View Profile
          </Button>
        )}
        <Button variant={isDetailed ? "default" : "outline"} size="sm" type="button">
          Connect
        </Button>
      </div>
    </Card>
  );
}
