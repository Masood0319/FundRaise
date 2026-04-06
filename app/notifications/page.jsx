"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";

const initialNotifications = [
  {
    id: 1,
    type: "startup_interest",
    title: "Investor showed interest in your startup",
    description: "Michael Chen reviewed your MedAI deck and bookmarked your profile.",
    time: "5 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    type: "connection",
    title: "Connection request",
    description: "Michael Chen requested to connect with you.",
    time: "18 minutes ago",
    isRead: false,
  },
  {
    id: 3,
    type: "investment",
    title: "New funding inquiry",
    description: "Your startup received a new funding inquiry from Aster Ventures.",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 4,
    type: "investment",
    title: "New Investment",
    description: "Sarah Lee invested $100k in MedAI.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 5,
    type: "message",
    title: "New message",
    description: "You received a new message from Nadia Kapoor.",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: 6,
    type: "deal",
    title: "Deal update",
    description: "Your SAFE agreement moved to review with Northbridge Capital.",
    time: "Yesterday",
    isRead: true,
  },
  {
    id: 7,
    type: "alert",
    title: "Platform alert",
    description: "Complete your startup profile to increase investor matches.",
    time: "2 days ago",
    isRead: true,
  },
];

function matchesFilter(notification, activeFilter) {
  if (activeFilter === "all") return true;
  if (activeFilter === "unread") return !notification.isRead;
  return notification.type === activeFilter;
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = useMemo(
    () => notifications.filter((notification) => matchesFilter(notification, activeFilter)),
    [notifications, activeFilter]
  );

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <AppShell title="Notifications">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)]">
              Stay updated with activity related to your startups, investments, and connections.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] transition hover:border-[var(--primary)]/40 hover:bg-white"
            >
              Mark all as read
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="min-h-[44px] rounded-full border border-transparent bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              Clear notifications
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
          <NotificationFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="rounded-xl border border-dashed border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--text-muted)]">
            You&apos;re all caught up! No notifications right now.
          </div>
        )}
      </section>
    </AppShell>
  );
}
