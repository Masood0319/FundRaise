"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { apiRequest } from "@/lib/apiClient"
import { logoutUser } from "@/lib/auth"

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oauthError = searchParams.get("error")

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [existingUser, setExistingUser] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [oauthLoading, setOauthLoading] = useState("")
  const [showContinueModal, setShowContinueModal] = useState(false)
  const [continueLoading, setContinueLoading] = useState(false)
  const modalRef = useRef(null)
  const lastActiveRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await apiRequest("auth/login", {
        method: "POST",
        data: formData,
      })

      setLoading(false)

      if (data.success) {
        if (data?.token) {
          localStorage.setItem("token", data.token)
        }
        try {
          const me = await apiRequest("auth/me", { method: "GET", cache: "no-store" })
          const user = me?.data?.user

          if (me?.success && user) {
            if (!user.role) return router.push("/role")
            if (user.role === "investor") return router.push("/home")
            if (user.role === "founder") return router.push("/home")   
          }
        } catch (err) {
          console.error(err)
        }

        router.push("/home")
      } else {
        setError(data.error || data.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError(err?.message || "Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    let active = true
    const check = async () => {
      try {
        const data = await apiRequest("auth/me", { method: "GET", cache: "no-store" })
        if (!active) return
        if (data?.success && data?.data?.user) {
          setExistingUser(data.data.user)
          setShowLoginForm(false)
          setShowContinueModal(true)
        } else {
          setShowLoginForm(true)
        }
      } catch (_) {
        if (active) setShowLoginForm(true)
      }
      finally {
        if (active) setCheckingSession(false)
      }
    }
    check()
    return () => { active = false }
  }, [router])

  useEffect(() => {
    if (oauthError) {
      setError("OAuth login failed. Please try again.")
    }
  }, [oauthError])

  const handleContinue = () => {
    setContinueLoading(true)
    const role = existingUser?.role
    if (!role) return router.push("/role")
    if (role === "investor") return router.push("/home")
    if (role === "founder") return router.push("/home")
    router.push("/role")
  }

  const handleUseAnotherAccount = async () => {
    await logoutUser({ redirect: false, toast: false })
    setExistingUser(null)
    setShowLoginForm(true)
    setShowContinueModal(false)
  }

  const closeModal = () => {
    setShowContinueModal(false)
    setShowLoginForm(true)
  }

  useEffect(() => {
    if (!showContinueModal) return
    lastActiveRef.current = document.activeElement

    const focusable = modalRef.current?.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    first?.focus()

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeModal()
      }
      if (e.key === "Tab" && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      lastActiveRef.current?.focus?.()
    }
  }, [showContinueModal])

  const startOAuth = (provider) => {
    setOauthLoading(provider)
    setError("")
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    const normalized = base.replace(/\/+$/, "")
    window.location.href = `${normalized}/api/auth/${provider}`
  }

  return (
    <div className="relative min-h-screen bg-[#050A10] text-white flex items-center justify-center px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600 opacity-20 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full" />
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-2 items-center">

        {/* LEFT SIDE (BRANDING / INFO) */}
        <div className="hidden lg:block space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Connect Founders <br /> with Investors
          </h1>

          <p className="text-gray-400 max-w-md">
            Discover funding opportunities, connect with verified investors,
            and grow your startup faster — all in one platform.
          </p>

          <div className="space-y-3 text-sm text-gray-300">
            <p>✔ Raise capital efficiently</p>
            <p>✔ Discover high-potential startups</p>
            <p>✔ Build meaningful connections</p>
          </div>
        </div>

        {/* RIGHT SIDE (LOGIN CARD) */}
        <div className="w-full max-w-md mx-auto">

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">

            {/* LOGO */}
            <div className="text-center mb-6">
              <img src="favicon.ico" className="h-10 mx-auto mb-3 rounded-lg" />
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-gray-400 text-sm mt-1">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* AUTO LOGIN FEEDBACK */}
            {checkingSession && existingUser && (
              <div className="flex items-center justify-center gap-3 text-sm text-gray-300 py-4">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>
                  Signing you in as {existingUser?.name || existingUser?.email}...
                </span>
              </div>
            )}

            {/* CONTINUE MODAL */}
            {showContinueModal && existingUser && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeModal()
                }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all duration-200 ease-out animate-[fadeInScale_200ms_ease-out]"
                >
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={closeModal}
                    className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-200 hover:bg-white/10"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full border border-white/10 bg-white/10 flex items-center justify-center text-sm font-semibold">
                      {(existingUser?.name || existingUser?.email || "U")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Continue as</p>
                      <p className="text-lg font-semibold">
                        {existingUser?.name || existingUser?.email}
                      </p>
                      {existingUser?.email && (
                        <p className="text-xs text-gray-400 mt-1">{existingUser.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2 text-sm font-semibold transition flex items-center justify-center gap-2"
                    >
                      {continueLoading && (
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {continueLoading ? "Redirecting..." : "Continue"}
                    </button>

                    <button
                      type="button"
                      onClick={handleUseAnotherAccount}
                      className="w-full rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-2 text-sm font-semibold transition"
                    >
                      Use another account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className={`space-y-5 transition-opacity duration-300 ${showLoginForm ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="text-right mt-2">
                  <Link href="forgot" className="text-xs text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2 text-sm font-semibold transition"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* OAUTH */}
            {showLoginForm && (
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => startOAuth("google")}
                  disabled={oauthLoading === "google"}
                  className="w-full rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 py-2 text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  <span className="h-4 w-4">
                    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
                      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .9 8.4 2.6l5.7-5.7C34.7 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 12 24 12c3.1 0 6 .9 8.4 2.6l5.7-5.7C34.7 6.3 29.6 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
                      <path fill="#4CAF50" d="M24 44c5.1 0 9.9-1.9 13.4-5.1l-6.2-5.2C29 35.5 26.6 36 24 36c-5.1 0-9.4-3.3-10.9-7.9l-6.6 5.1C9.6 39.7 16.4 44 24 44z" />
                      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-1.1 3-3.2 5.4-6 6.7l6.2 5.2C39.6 36.3 44 30.7 44 24c0-1.3-.1-2.7-.4-3.9z" />
                    </svg>
                  </span>
                  {oauthLoading === "google" ? "Redirecting..." : "Continue with Google"}
                </button>

                <button
                  type="button"
                  onClick={() => startOAuth("linkedin")}
                  disabled={oauthLoading === "linkedin"}
                  className="w-full rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 py-2 text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  <span className="h-4 w-4">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path fill="#0A66C2" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.47v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                    </svg>
                  </span>
                  {oauthLoading === "linkedin" ? "Redirecting..." : "Continue with LinkedIn"}
                </button>
              </div>
            )}

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?
              <Link href="signup" className="text-indigo-400 hover:text-indigo-300 ml-1">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  )
}
