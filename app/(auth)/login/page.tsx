"use client"

import { useState } from "react"
import {
  Waves,
  Mail,
  Lock,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Globe,
} from "lucide-react"
import { GlassPanel } from "@/components/sentinel/GlassPanel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk")
      }

      setUser(data.user)
      router.push("/")
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover object-center opacity-40 grayscale"
          alt="Aceh Aerial View"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl79upPaxR6KZay69FuulGgx70cV5OQYqWI_BLDHc-pGoQ48olPa6IHSnJquS1HYAzv2cO4Dvp3tgPU6XmceDwVEkyOBGODEh7RO6EsgWjnCpswYVGi72nUYVA4Ygp6X4iSc35GfU7Bk84DQf_gfKXQ45p-ba2DVwM8jUqko_aLp2jaQCkkADQYkTa8mT7ZBzMarIKA0FvxPZnpHI_iXsrSdpE6Oi1S9mufDEh_2THAam3BOIIIt14lRif0AzConis4x39uI60CmA"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Branding */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-[20px] bg-primary mb-6 shadow-2xl shadow-primary/40">
            <Waves className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white font-heading">
            Sentinel Hydro
          </h1>
          <p className="mt-4 text-[17px] text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            Advanced GIS Analysis for high-precision flood risk assessment and real-time regional monitoring.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1c1c1e]/80 backdrop-blur-2xl border border-white/10 rounded-[28px] p-10 shadow-3xl animate-in fade-in zoom-in-95 delay-300 duration-1000">
           <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-[13px] font-medium text-red-400">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="text-[12px] font-semibold tracking-wide text-gray-400 uppercase px-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="analyst@aceh.gov.id"
                  className="h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-[15px] text-white focus:bg-white/10 focus:border-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="text-[12px] font-semibold tracking-wide text-gray-400 uppercase">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[12px] font-medium text-primary hover:text-primary/80"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-[15px] text-white focus:bg-white/10 focus:border-primary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              disabled={loading}
              type="submit"
              size="xl"
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold tracking-wide shadow-2xl shadow-primary/20"
            >
              {loading ? "AUTHENTICATING..." : "SIGN IN"}
            </Button>

            <div className="text-center pt-2">
               <p className="text-[13px] font-medium text-gray-500">
                New Analyst?{" "}
                <Link href="/register" className="text-primary hover:text-primary/80">
                  Create a new account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-16 flex justify-center flex-wrap items-center gap-8 text-[11px] font-semibold tracking-[0.2em] text-gray-600 uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/80"></span>
            SECURE ACCESS
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            ACEH-GIS-NODE-1
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            TLS 1.3
          </div>
        </div>
      </div>
    </main>
  )
}

