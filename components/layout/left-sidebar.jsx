"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LogoutButton } from "@/components/auth/logout-button";

const userProfile = {
  name: "Alex Morgan",
  role: "Founder",
  startup: "Northwind Labs",
  fundingGoal: 750000,
  raised: 420000,
};

const quickActions = [
  { id: "create-startup", label: "Create Startup" },
  { id: "find-investors", label: "Find Investors" },
  { id: "browse-startups", label: "Browse Startups" },
  { id: "start-conversation", label: "Start Conversation" },
  { id: "upload-deck", label: "Upload Pitch Deck" },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function LeftSidebar() {
  const progress = Math.min(
    100,
    Math.round((userProfile.raised / userProfile.fundingGoal) * 100)
  );

  return (
    <aside className="space-y-4">
      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-base font-semibold text-[var(--primary)]">
            {userProfile.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div>
            <CardTitle>{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.role}</CardDescription>
          </div>
        </div>
        <div className="rounded-xl bg-[var(--surface)] p-3">
          <p className="text-xs font-semibold text-[var(--text-muted)]">
            Startup
          </p>
          <p className="text-sm font-semibold text-[var(--text-main)]">
            {userProfile.startup}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Funding goal</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[var(--surface)]">
            <div
              className="h-2 rounded-full bg-[var(--primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {formatCurrency(userProfile.raised)} raised of{" "}
            {formatCurrency(userProfile.fundingGoal)}
          </p>
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Quick actions</CardTitle>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="w-full justify-start"
              type="button"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <CardTitle className="text-base">Account</CardTitle>
        <LogoutButton variant="outline" fullWidth />
      </Card>
    </aside>
  );
}
