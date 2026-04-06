"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  Rocket,
  Search,
  Users,
  MessageSquare,
  Handshake,
  BellRing,
  Settings,
  UserRound,
} from "lucide-react";

import { notifications } from "@/data/mock";
import { NotificationItem } from "@/components/notification-item";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { LogoutButton } from "@/components/auth/logout-button";
import { BRAND_NAME } from "@/config/branding";

const founderNav = [
  { href: "/startup/1", label: "My Startup", icon: Rocket },
  { href: "/investors", label: "Investors", icon: Search },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/deals", label: "Deals", icon: Handshake },
  { href: "/notifications", label: "Notifications", icon: BellRing },
];

export function AppShell({ children, title, subtitle, actions }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setAuthReady(true);
  }, [router]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-sm text-[var(--text-muted)]">
        Checking your session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* Navbar */}
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="text-lg font-semibold text-[var(--primary)]">
            {BRAND_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {founderNav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex justify-center flex-col items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <details className="relative">
              <summary className="list-none cursor-pointer rounded-lg border border-[var(--border)] bg-white p-2">
                <Bell size={18} />
              </summary>

              <div className="absolute right-0 mt-2 w-80 space-y-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 shadow-xl">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    title={n.title}
                    subtitle={n.subtitle}
                    time={n.time}
                  />
                ))}
              </div>
            </details>

            {/* Profile dropdown */}
            <details className="relative hidden md:block">
              <summary className="list-none cursor-pointer rounded-lg border border-[var(--border)] bg-white p-2">
                <UserRound size={18} />
              </summary>
              <div className="absolute right-0 mt-2 w-48 space-y-1 rounded-xl border border-[var(--border)] bg-white p-2 shadow-xl">
                <Link
                  href="/profile/founder"
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                >
                  Profile
                </Link>
                <LogoutButton
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="justify-start"
                />
              </div>
            </details>

            {/* Navbar logout */}
            <div className="hidden md:block">
              <LogoutButton variant="outline" size="sm" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-[var(--border)] bg-white md:hidden">
            <nav className="space-y-1 px-4 py-3">

              {founderNav.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-2">
                <LogoutButton variant="outline" size="sm" fullWidth />
              </div>

            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[260px_1fr_300px] lg:px-8">
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        <main>
          <div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[var(--text-main)] md:text-2xl lg:text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-[var(--text-muted)] md:text-base">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
          {children}
        </main>

        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-8 md:px-6 lg:hidden lg:px-8">
        <LeftSidebar />
        <RightSidebar />
      </div>

    </div>
  );
}
