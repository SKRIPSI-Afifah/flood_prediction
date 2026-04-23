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

      // Simpan user dengan role ke context
      setUser(data.user)
      
      router.push("/")
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-start overflow-hidden bg-[#f6fafe]">
      {/* Background Hero Section */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover object-center"
          alt="Pemandangan udara pesisir Aceh"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl79upPaxR6KZay69FuulGgx70cV5OQYqWI_BLDHc-pGoQ48olPa6IHSnJquS1HYAzv2cO4Dvp3tgPU6XmceDwVEkyOBGODEh7RO6EsgWjnCpswYVGi72nUYVA4Ygp6X4iSc35GfU7Bk84DQf_gfKXQ45p-ba2DVwM8jUqko_aLp2jaQCkkADQYkTa8mT7ZBzMarIKA0FvxPZnpHI_iXsrSdpE6Oi1S9mufDEh_2THAam3BOIIIt14lRif0AzConis4x39uI60CmA"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center px-8 py-12 md:px-24">
        {/* Branding Header */}
        <div className="mb-12 animate-in duration-700 slide-in-from-left">
          <div className="mb-2 flex items-center gap-3">
            <Waves className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">
              Sentinel Hydro
            </h1>
          </div>
          <div className="h-1 w-12 rounded-full bg-tertiary"></div>
          <p className="mt-6 max-w-sm leading-relaxed font-medium text-muted-foreground">
            FloodGuard Aceh: Gerbang analisis GIS presisi tinggi untuk penilaian risiko banjir regional dan pemantauan real-time.
          </p>
        </div>

        {/* Login Card */}
        <GlassPanel className="max-w-md animate-in rounded-2xl border-white/40 p-10 shadow-2xl delay-200 duration-700 zoom-in-95">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Masuk ke Sistem
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Khusus untuk personel terdaftar.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="ml-1 block text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Email Kerja
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="analis@aceh.gov.id"
                  className="rounded-xl border-none bg-white py-6 pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  Kata Sandi
                </label>
                <Link
                  href="#"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Lupa?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="rounded-xl border-none bg-white py-6 pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="cursor-pointer text-xs font-medium text-muted-foreground"
              >
                Ingat sesi selama 24 jam
              </label>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 py-7 text-sm font-bold tracking-wide shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
            >
              {loading ? "MEMPROSES..." : "MASUK"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-6 text-center text-xs font-semibold text-muted-foreground">
              Analis Baru?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Daftar Akun Baru
              </Link>
            </p>
          </form>
        </GlassPanel>


        {/* Footer Info */}
        <div className="mt-12 flex animate-in flex-wrap items-center gap-6 text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase delay-500 duration-1000 fade-in">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
            SYSTEM ONLINE
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            ACEH REGION (GIS-1)
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" />
            SSL SECURED
          </div>
        </div>
      </div>

      {/* Decorative Coordinates */}
      <div className="absolute top-12 right-12 z-20 hidden animate-in text-right duration-1000 fade-in slide-in-from-right lg:block">
        <div className="font-mono text-[10px] leading-tight font-bold tracking-tighter text-primary/60">
          LAT: 5.5483° N<br />
          LONG: 95.3238° E<br />
          ALT: 4.2m MSL
        </div>
        <div className="mt-4 ml-auto h-16 w-[1px] bg-primary/20"></div>
      </div>
    </main>
  )
}
