"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ImageIcon,
  MessageSquare,
  Share2,
  ThumbsUp,
  Video,
} from "lucide-react";

const feedItems = [
  {
    id: "post-1",
    author: "Ava Thompson",
    role: "Founder · FlowLedger",
    time: "12m",
    content:
      "We just crossed $500k ARR with 3 enterprise pilots. Looking to connect with investors focused on fintech infrastructure.",
    tags: ["FinTech", "SaaS", "Series A"],
    stats: { likes: 128, comments: 24, shares: 8 },
  },
  {
    id: "post-2",
    author: "Nadia Kapoor",
    role: "Investor · Northbridge Capital",
    time: "1h",
    content:
      "Actively sourcing climate and energy AI startups with strong data moats. DM if you are raising Seed to Series A.",
    tags: ["ClimateTech", "Energy", "Seed"],
    stats: { likes: 92, comments: 18, shares: 6 },
  },
  {
    id: "post-3",
    author: "Aster Ventures",
    role: "Venture Fund · HealthTech",
    time: "3h",
    content:
      "Congrats to MediSpan on closing their $3.5M round. Excited to support remote chronic care at scale.",
    tags: ["HealthTech", "Series A"],
    stats: { likes: 210, comments: 34, shares: 12 },
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ShareComposer() {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold text-[var(--primary)]">
          AT
        </div>
        <div className="flex-1">
          <Input placeholder="Share an update with investors or founders..." />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-sm text-[var(--text-muted)]">
          <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5">
            <ImageIcon size={16} /> Photo
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5">
            <Video size={16} /> Video
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5">
            <Calendar size={16} /> Event
          </button>
        </div>
        <Button>Post</Button>
      </div>
    </Card>
  );
}

function FeedCard({ post }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold text-[var(--primary)]">
            {getInitials(post.author)}
          </div>
          <div>
            <CardTitle className="text-base">{post.author}</CardTitle>
            <CardDescription className="text-xs">
              {post.role} · {post.time}
            </CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Follow
        </Button>
      </div>
      <p className="text-sm text-[var(--text-main)] md:text-base">{post.content}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>{post.stats.likes} likes</span>
        <span>
          {post.stats.comments} comments · {post.stats.shares} shares
        </span>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-3">
        <Button variant="ghost" size="sm" className="flex-1">
          <ThumbsUp size={16} className="mr-2" /> Like
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <MessageSquare size={16} className="mr-2" /> Comment
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 size={16} className="mr-2" /> Share
        </Button>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("feed");

  const filteredFeed = useMemo(() => feedItems, []);

  return (
    <AppShell
      title="Home"
      subtitle="Your personalized founder and investor activity feed."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "feed", label: "Feed" },
            { id: "connections", label: "Connections" },
            { id: "investments", label: "Investments" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "border-transparent bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ShareComposer />

        <div className="space-y-4">
          {filteredFeed.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
