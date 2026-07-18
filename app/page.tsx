"use client"

import { Button } from "@/components/ui/button"
import {
  LucideCheck,
  LucideMap,
  LucideShieldCheck,
  LucideZap,
  LucideInfo,
} from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-500">
      <LandingHeader />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden px-6 py-20 md:py-28 lg:py-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 font-sans mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-black text-primary tracking-widest uppercase">SISTEM AKTIF: PROVINSI ACEH</span>
            </div>

            <h1 className="max-w-5xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-foreground uppercase md:text-6xl lg:text-7xl mb-6">
              Peta Daerah Rawan 
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Banjir Aceh
              </span>
            </h1>

            <p className="mx-auto mb-3 max-w-2xl text-base font-medium leading-relaxed text-on-surface-variant/80 md:text-lg">
              Akses peta GIS Aceh dan analisis risiko banjir dalam satu tempat.
            </p>

            <p className="mx-auto mb-10 max-w-2xl text-sm font-medium leading-relaxed text-on-surface-variant/70 md:text-base">
              Login dibutuhkan untuk membuka peta, analisis, dan prediksi.
            </p>

            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Button asChild className="h-14 w-full rounded-[16px] border-none bg-primary px-8 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 sm:w-auto">
                <Link href="/login" aria-label="Masuk Portal Analisis">
                  Masuk Portal
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 w-full rounded-[16px] border-2 border-border/80 px-8 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:border-primary/20 hover:bg-surface-container sm:w-auto">
                <Link href="#features">
                  Lihat Fitur
                </Link>
              </Button>
            </div>

            <p className="mt-5 max-w-xl text-xs font-medium leading-relaxed text-on-surface-variant/60 md:text-sm">
              Login membuka akses ke peta, analisis, dan prediksi.
            </p>
          </div>

          {/* Decorative Grid Pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-6xl aspect-square opacity-[0.04] select-none pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#000]">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </section>

        {/* Strategic Authorities Bar */}
        <section className="border-y border-border/40 bg-surface/50 py-12 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant/40">Digunakan oleh otoritas kebencanaan</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale contrast-125 md:gap-24">
              <span className="font-heading text-lg font-black tracking-widest text-primary">BPBA ACEH</span>
              <span className="font-heading text-lg font-black tracking-widest text-primary">BMKG</span>
              <span className="font-heading text-lg font-black tracking-widest text-primary">DINAS PENGAIRAN</span>
              <span className="font-heading text-lg font-black tracking-widest text-primary">BNPB</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-surface-container-lowest px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-[10px] font-black text-primary tracking-widest uppercase mb-4 opacity-50">Fitur Inti</h2>
                <h3 className="font-heading text-4xl font-black leading-tight tracking-tight text-foreground uppercase md:text-5xl">
                  Data yang cepat <br /> untuk keputusan tepat.
                </h3>
              </div>
              <p className="max-w-md font-sans font-semibold leading-relaxed text-on-surface-variant/70">
                Visualisasi interaktif dan prediksi berbasis data topografi, iklim, dan tata guna lahan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="cal-card p-10 flex flex-col h-full border-2 border-surface-container hover:border-primary/20 transition-all rounded-[32px] bg-surface group">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <LucideMap className="size-6" />
                </div>
                <h4 className="font-heading text-lg font-black text-foreground uppercase tracking-tight mb-4">Peta GIS Presisi</h4>
                <p className="text-[13px] font-medium text-on-surface-variant/70 leading-relaxed font-sans flex-grow">
                  Poligon kerawanan per kecamatan di Aceh dengan data elevasi dan lereng interaktif.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="cal-card p-10 flex flex-col h-full border-2 border-surface-container hover:border-primary/20 transition-all rounded-[32px] bg-surface group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <LucideZap className="size-6" />
                </div>
                <h4 className="font-heading text-lg font-black text-foreground uppercase tracking-tight mb-4">Faktor Risiko Dinamis</h4>
                <p className="text-[13px] font-medium text-on-surface-variant/70 leading-relaxed font-sans flex-grow">
                  Analisis pemicu utama seperti curah hujan tinggi, lereng landai, dan lahan terbangun.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="cal-card p-10 flex flex-col h-full border-2 border-surface-container hover:border-primary/20 transition-all rounded-[32px] bg-surface group">
                <div className="w-12 h-12 rounded-2xl bg-error/5 text-error flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <LucideShieldCheck className="size-6" />
                </div>
                <h4 className="font-heading text-lg font-black text-foreground uppercase tracking-tight mb-4">Peringatan Cepat</h4>
                <p className="text-[13px] font-medium text-on-surface-variant/70 leading-relaxed font-sans flex-grow">
                  Informasi singkat untuk mempercepat respons dan kewaspadaan dini.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GIS Info & Visual Section */}
        <section id="gis-info" className="bg-background px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-secondary/10 px-3 py-1 font-sans">
                <LucideInfo className="size-4 text-secondary" />
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase">EKSPLORASI INTERAKTIF</span>
              </div>
              <h3 className="font-heading text-4xl font-black leading-tight tracking-tight text-foreground uppercase md:text-5xl">
                Pahami Risiko Tanpa Data Mentah
              </h3>
              <p className="font-sans font-medium leading-relaxed text-on-surface-variant/80">
                Data spasial disederhanakan menjadi indikator visual. Klik kecamatan untuk melihat risiko, riwayat banjir, dan faktor pemicu utama.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Warna poligon standar: Aman, Rawan, Sangat Rawan",
                  "Filter faktor hujan, elevasi, dan kelerengan",
                  "Integrasi data cuaca dan tata guna lahan"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <LucideCheck className="size-3" />
                    </span>
                    <span className="text-sm font-semibold text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative aspect-video overflow-hidden rounded-[32px] border-4 border-surface-container bg-surface-container shadow-2xl">
              <iframe
                src="/login"
                className="h-full w-full scale-[1.02] opacity-90 transition-transform duration-500 pointer-events-none"
                title="Preview Peta"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000]/60 to-transparent flex items-end p-8">
                <div>
                  <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Pratinjau sistem GIS</p>
                  <p className="text-lg font-black text-white uppercase tracking-wide">Peta Poligon Kecamatan Aceh</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="px-6 py-24 md:py-32">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border-none bg-primary p-12 text-center text-primary-foreground shadow-2xl md:p-20 cal-card">
            <h3 className="relative z-10 mb-8 font-heading text-3xl font-black tracking-tight uppercase md:text-5xl">
              Siap memantau <br /> risiko banjir Aceh?
            </h3>
            <p className="relative z-10 mx-auto mb-12 max-w-xl text-sm font-medium text-primary-foreground/70 font-sans">
              Masuk untuk melihat peta, analisis, dan prediksi dalam satu alur kerja.
            </p>
            <div className="relative z-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button asChild className="h-14 w-full rounded-[16px] border-none bg-white px-8 text-xs font-black uppercase tracking-widest text-primary shadow-xl shadow-white/5 transition-all hover:-translate-y-0.5 active:translate-y-0 sm:w-auto">
                <Link href="/login">
                  Masuk Portal
                </Link>
              </Button>
              <Button asChild variant="ghost" className="h-14 w-full rounded-[16px] px-8 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto">
                <Link href="#gis-info">
                  Pelajari Peta
                </Link>
              </Button>
            </div>
            
            {/* Background Gradient Glow */}
            <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-20 blur-3xl">
              <div className="h-full w-full rounded-full bg-secondary"></div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
