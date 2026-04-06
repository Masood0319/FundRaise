import Link from "next/link";
import { Home, Search, MessageSquare, HandCoins, UserRound } from "lucide-react";

const tabs = [
  { href: "/founder/dashboard", label: "Home", icon: Home },
  { href: "/investor/dashboard", label: "Discover", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/deals", label: "Deals", icon: HandCoins },
  { href: "/profile/founder", label: "Profile", icon: UserRound },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white md:hidden">
      <div className="grid grid-cols-5 px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 text-[10px] text-[var(--text-muted)]">
              <Icon size={16} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
