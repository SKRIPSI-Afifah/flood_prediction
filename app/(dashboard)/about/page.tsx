"use client"

import {
  Info,
  Cpu,
  Zap,
  Target,
  Clock,
  Radio,
  ShieldAlert,
  Mail,
  MapPin,
  ExternalLink,
  Satellite,
  Verified,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassPanel } from "@/components/sentinel/GlassPanel"

export default function AboutPage() {
  return (
    <div className="animate-in space-y-16 pb-12 duration-1000 fade-in">
      {/* Hero Section */}
      <section className="group relative flex h-[500px] items-center overflow-hidden rounded-[4rem] px-12 shadow-2xl md:px-20">
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="Aceh Coastal"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFIUFdByCJQz82ZLqP9C92QQz4Nfe9l5dCIrk6mTnAB9iCwtDq3l_yEGAgAsYu-RgBqAyjS3IWJ6tCZSVVJgl2UTEhvvB-RnpUnKXROD84VzCMmAyAuVpifmCz1woQ3cEqSPKoKGbzPJs7-OGtIkUnXWNVq9xGvAAD0ea4W79YQ-QrMUsKUqXdAJwcsl3sSHd355iQ0iOO1PStlTjVD-PNflxXcLIi2YEVMy3GVhhbJVHAfRCcGwV376LxI4wAEbBNHe6r5pddwJw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-secondary-container text-on-secondary-container ring-secondary-container/20 mb-8 rounded-full border-none px-4 py-1 text-xs font-black tracking-[0.3em] uppercase ring-4">
            Project Sentinel Hydro
          </Badge>
          <h2 className="mb-8 text-5xl leading-tight font-black tracking-tighter text-white uppercase italic transition-all duration-700 md:text-7xl">
            Securing the Future of <br />
            <span className="text-secondary drop-shadow-lg">
              Aceh&apos;s Ecosystem.
            </span>
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed font-medium text-white/80">
            Sentinel Hydro is a state-of-the-art predictive intelligence system
            designed to anticipate and mitigate seasonal flood risks across the
            Aceh province using satellite telemetry and advanced machine
            learning.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 space-y-10 lg:col-span-8">
          {/* Methodology */}
          <GlassPanel className="rounded-[3.5rem] border-white/60 bg-white/40 p-12 shadow-xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-black tracking-tight text-primary uppercase italic">
                Technical Methodology
              </h3>
            </div>
            <p className="mb-10 text-lg leading-relaxed font-medium text-muted-foreground">
              Our system processes multi-dimensional data including
              precipitation patterns, soil moisture index, and topographical
              slope variants to output high-precision risk heatmaps.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="group rounded-3xl border-l-8 border-primary bg-white/80 p-8 shadow-sm transition-all hover:scale-[1.02]">
                <h4 className="mb-3 text-sm font-black tracking-widest text-primary uppercase italic">
                  XGBoost Engine
                </h4>
                <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                  Utilizing eXtreme Gradient Boosting for high-performance
                  supervised learning. This algorithm excels at capturing
                  non-linear relationships between variables.
                </p>
              </div>
              <div className="group rounded-3xl border-l-8 border-secondary bg-white/80 p-8 shadow-sm transition-all hover:scale-[1.02]">
                <h4 className="mb-3 text-sm font-black tracking-widest text-secondary uppercase italic">
                  SMOTE Balancing
                </h4>
                <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                  Synthetic Minority Over-sampling Technique (SMOTE) addresses
                  historical dataset imbalances, ensuring accuracy for rare,
                  high-impact flood events.
                </p>
              </div>
            </div>
          </GlassPanel>

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-10 rounded-[3rem] border border-border/10 bg-muted px-12 py-10 shadow-inner md:grid-cols-3">
            {[
              { val: "94.2%", label: "Model Accuracy" },
              { val: "24h", label: "Early Warning" },
              { val: "1.2k", label: "Sensors Tracked" },
            ].map((m, idx) => (
              <div key={idx} className="group text-center">
                <p className="mb-2 text-5xl font-black tracking-tighter text-primary transition-transform group-hover:scale-110">
                  {m.val}
                </p>
                <p className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="col-span-12 lg:col-span-4">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[4rem] bg-primary p-12 text-white shadow-2xl">
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/5 blur-3xl transition-colors group-hover:bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
                <ShieldAlert className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="mb-6 text-2xl font-black tracking-tight uppercase italic">
                Aceh Flood Monitoring Agency
              </h3>
              <p className="mb-10 text-base leading-relaxed font-medium text-white/60">
                The lead provincial body responsible for disaster risk reduction
                and environmental stewardship. AFMA coordinates local emergency
                response units using real-time data from Sentinel Hydro.
              </p>
              <div className="space-y-6">
                <div className="group/item flex cursor-default items-center gap-4 font-bold text-white/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/item:bg-white/20">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="text-sm">Banda Aceh, Indonesia</span>
                </div>
                <div className="group/item flex cursor-default items-center gap-4 font-bold text-white/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/item:bg-white/20">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="text-sm">contact@afma.acehprov.go.id</span>
                </div>
              </div>
            </div>
            <Button className="mt-12 w-full rounded-2xl bg-secondary py-8 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] active:scale-95">
              Contact Agency <ExternalLink className="ml-3 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Collaboration */}
      <section className="grid grid-cols-1 items-center gap-16 pt-8 md:grid-cols-2">
        <div className="space-y-8 px-4">
          <h3 className="text-4xl leading-none font-black tracking-tighter text-primary uppercase italic">
            Inter-Agency Collaboration
          </h3>
          <p className="text-lg leading-relaxed font-medium text-muted-foreground">
            We partner with national meteorological departments and
            international geospatial intelligence firms to ensure the highest
            fidelity of topographical data possible.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-full border border-border/10 bg-muted px-6 py-3 shadow-sm transition-colors hover:bg-white">
              <Verified className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                BMKG Certified
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border/10 bg-muted px-6 py-3 shadow-sm transition-colors hover:bg-white">
              <Satellite className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                Sentinel-2 Data
              </span>
            </div>
          </div>
        </div>
        <div className="group relative h-80 overflow-hidden rounded-[4rem] border-[10px] border-white bg-muted shadow-2xl">
          <img
            className="h-full w-full object-cover opacity-40 mix-blend-multiply grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
            alt="Data Analysis"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgKqABmCpBOsXvr84JS6S3Paav8RFdgmfkrEaqoqBkyQtVYo45Rq_spDxz5gVIgcTRkf9m0TT9zitEiGLvho8sUtWTifFXxadhY6tSIT2AB0lrlJk8BPf69MLx40GfFsdU8pSwgYCNsYWO3t4MqxjVfKwQv2IuAdYzvXDKKjXJeGKCUZL_Bk06FpftCg9vZ3DlllLisGiB-YVTfPB7NSm7SZMxyTuAdBMUFf_Rte8xv3wyfE5lWfUhFShpMJ0gcVlTPZt5ecPAtE"
          />
          <div className="pointer-events-none absolute inset-0 bg-primary/20 transition-colors group-hover:bg-transparent"></div>
          <div className="pointer-events-none absolute inset-0 border-[20px] border-white/10"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/10 pt-16 pb-8 text-center">
        <p className="text-xs font-black tracking-[0.4em] text-muted-foreground uppercase">
          © 2024 Sentinel Hydro • Geographic Info System Division • All Rights
          Reserved
        </p>
      </footer>
    </div>
  )
}
