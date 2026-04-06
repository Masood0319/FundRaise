import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function ConnectionCard({
  name,
  role,
  interests,
}) {
  return (
    <Card className="space-y-3 hover:bg-[var(--surface)]">
      <CardTitle>{name}</CardTitle>
      <Badge>{role}</Badge>
      <CardDescription>Industry interests</CardDescription>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge key={interest}>{interest}</Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="success">
          Accept
        </Button>
        <Button size="sm" variant="outline">
          Reject
        </Button>
      </div>
    </Card>
  );
}
