"use client"

import { useState } from "react"
import {
  Waves,
  Mail,
  Lock,
  ArrowRight,
  User,
  ShieldCheck,
  MapPin,
  ChevronLeft,
} from "lucide-react"
import { GlassPanel } from "@/components/sentinel/GlassPanel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Security codes do not match")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to register")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
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
          className="h-full w-full object-cover object-center scale-110 motion-safe:animate-[pulse_10s_infinite]"
          alt="Cinematic aerial view of Aceh coastal terrain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl79upPaxR6KZay69FuulGgx70cV5OQYqWI_BLDHc-pGoQ48olPa6IHSnJquS1HYAzv2cO4Dvp3tgPU6XmceDwVEkyOBGODEh7RO6EsgWjnCpswYVGi72nUYVA4Ygp6X4iSc35GfU7Bk84DQf_gfKXQ45p-ba2DVwM8jUqko_aLp2jaQCkkADQYkTa8mT7ZBzMarIKA0FvxPZnpHI_iXsrSdpE6Oi1S9mufDEh_2THAam3BOIIIt14lRif0AzConis4x39uI60CmA"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
      </div>

      {/* Register Container */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col justify-center px-8 py-12 md:px-24">
        {/* Branding Header */}
        <div className="mb-10 animate-in duration-700 slide-in-from-left">
          <Link 
            href="/login" 
            className="group mb-6 flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:text-primary/70"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Portal
          </Link>
          <div className="mb-2 flex items-center gap-3">
            <Waves className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">
              Sentinel Hydro
            </h1>
          </div>
          <div className="h-1 w-12 rounded-full bg-tertiary"></div>
          <p className="mt-6 max-w-sm leading-relaxed font-medium text-muted-foreground">
            Ajukan akun operasional untuk gerbang analisis GIS FloodGuard Aceh.
          </p>
        </div>

        {/* Register Card */}
        <GlassPanel className="w-full max-w-lg animate-in rounded-2xl border-white/40 p-10 shadow-2xl delay-200 duration-700 zoom-in-95">
          {success ? (
            <div className="py-12 text-center animate-in zoom-in-50 duration-500">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Registrasi Berhasil</h2>
              <p className="mt-4 text-muted-foreground">
                Permintaan Anda telah diproses. Mengalihkan ke gerbang masuk...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Permohonan Kredensial
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Identifikasi diri Anda dalam jaringan regional Aceh.
                </p>
              </div>
              <form className="space-y-5" onSubmit={handleRegister}>
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                    {error}
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Ir. Teuku Firdaus"
                      className="rounded-xl border-none bg-white py-6 pl-12 text-sm"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 block text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Email Resmi
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="analis@aceh.gov.id"
                      className="rounded-xl border-none bg-white py-6 pl-12 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="ml-1 block text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-none bg-white py-6 pl-12 text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="ml-1 block text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                      Verifikasi Sandi
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-none bg-white py-6 pl-12 text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 py-7 text-sm font-bold tracking-wide shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? "MEMPROSES..." : "DAFTAR ANALIS BARU"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="mt-6 text-center text-xs font-semibold text-muted-foreground">
                  Sudah punya akses?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Masuk ke Sesi
                  </Link>
                </p>
              </form>
            </>
          )}
        </GlassPanel>

        {/* Footer Info */}
        <div className="mt-12 flex animate-in flex-wrap items-center gap-6 text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase delay-500 duration-1000 fade-in">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
            JARINGAN TERAMANKAN
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            WILAYAH ACEH (GIS-1)
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-12 right-12 z-20 hidden animate-in text-right duration-1000 fade-in slide-in-from-right lg:block">
        <div className="font-mono text-[10px] leading-tight font-bold tracking-tighter text-primary/60">
          SYS_STATE: REGISTRATION_MODE<br />
          NODE: sentinel-n1<br />
          VER: 4.2.0-STABLE
        </div>
        <div className="mt-4 ml-auto h-16 w-[1px] bg-primary/20"></div>
      </div>
    </main>
  )
}
