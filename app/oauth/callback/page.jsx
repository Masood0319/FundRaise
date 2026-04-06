"use client";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/apiClient";

function OAuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const error = useMemo(() => searchParams.get("error") || "", [searchParams]);
  const [message, setMessage] = useState("Signing you in...");
  useEffect(() => {
    let active = true;
    const run = async () => {
      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error)}`);
        return;
      }
      if (!token) {
        router.replace("/login?error=oauth_failed");
        return;
      }
      try {
        localStorage.setItem("token", token);
      } catch (_) {}
      try {
        const me = await apiRequest("auth/me", { method: "GET", cache: "no-store" });
        const user = me?.data?.user;
        if (!active) return;
        if (!user) {
          router.replace("/login?error=oauth_failed");
          return;
        }
        if (!user.role) return router.replace("/role");
        if (user.role === "investor") return router.replace("/dashboard/investor");
        if (user.role === "founder") return router.replace("/dashboard/founder");
        router.replace("/role");
      } catch (_) {
        if (active) setMessage("Sign in failed. Redirecting...");
        router.replace("/login?error=oauth_failed");
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [error, router, token]);
  return (
    <div className="relative min-h-screen bg-[#050A10] text-white flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600 opacity-20 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full" />
      </div>
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="h-10 w-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <h1 className="text-xl font-semibold">Signing you in...</h1>
        <p className="mt-2 text-sm text-gray-300">{message}</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthCallbackInner />
    </Suspense>
  );
}
