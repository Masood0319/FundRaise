"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Paperclip, Send } from "lucide-react";
import { MessageBubble } from "@/components/message-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const starterMessages = [
  { id: "1", text: "Thanks for sharing your deck. We are interested in next steps.", time: "10:31", read: true },
  { id: "2", text: "Great. Happy to walk through customer traction data.", time: "10:32", me: true, read: true },
];

export function RealtimeChat() {
  const [messages, setMessages] = useState(starterMessages);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);

  const socketUrl = useMemo(() => process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000", []);

  useEffect(() => {
    const socket = io(socketUrl, { transports: ["websocket"], autoConnect: true });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("message", (payload) => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: payload.text, time: payload.time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const next = { id: crypto.randomUUID(), text: message, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), me: true, read: true };
    setMessages((prev) => [...prev, next]);
    setMessage("");
  };

  return (
    <div className="grid h-[70vh] overflow-hidden rounded-2xl border border-[var(--border)] bg-white md:grid-cols-[300px_1fr]">
      <aside className="border-r border-[var(--border)] p-4">
        <p className="mb-3 text-sm font-semibold text-[var(--text-main)]">Conversations</p>
        <div className="space-y-2">
          {[
            "Nadia Kapoor",
            "RiverStone Capital",
            "Aster Ventures",
            "Kai Morgan",
          ].map((name) => (
            <button key={name} className="w-full rounded-xl border border-[var(--border)] p-3 text-left text-sm hover:bg-[var(--surface)]">
              <p className="font-medium text-[var(--text-main)]">{name}</p>
              <p className="text-xs text-[var(--text-muted)]">Active deal discussion</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex h-full flex-col">
        <div className="border-b border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
          Realtime status: <span className={connected ? "text-[var(--accent)]" : "text-amber-500"}>{connected ? "Connected" : "Offline mode"}</span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--surface)] p-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} me={msg.me} read={msg.read} time={msg.time} />
          ))}
        </div>

        <div className="border-t border-[var(--border)] p-3">
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)]" aria-label="Attach file">
              <Paperclip size={16} />
            </button>
            <Input placeholder="Share update, files, or pitch deck notes..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
            <Button onClick={sendMessage} size="sm">
              <Send size={14} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
