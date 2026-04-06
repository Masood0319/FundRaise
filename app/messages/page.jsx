import { AppShell } from "@/components/layout/app-shell";
import { RealtimeChat } from "@/components/chat/realtime-chat";

export default function MessagesPage() {
  return (
    <AppShell
      title="Messages"
      subtitle="Stay in sync with founders and investors across your active deals."
    >
      <RealtimeChat />
    </AppShell>
  );
}
