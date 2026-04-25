import { Button } from "@/components/ui/button"
import { LucideShield, LucideZap, LucideCpu, LucideLayers, LucideMap, LucideLocate, LucideMail, LucideExternalLink, LucideSatellite, LucideCheckCircle2 } from "lucide-react"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function AboutPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "About" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-12 max-w-[1600px] mx-auto w-full">
        {/* Header Hero Section */}
        <section className="relative h-[480px] rounded-[64px] overflow-hidden flex items-center px-12 lg:px-20 group border-8 border-white shadow-2xl">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFIUFdByCJQz82ZLqP9C92QQz4Nfe9l5dCIrk6mTnAB9iCwtDq3l_yEGAgAsYu-RgBqAyjS3IWJ6tCZSVVJgl2UTEhvvB-RnpUnKXROD84VzCMmAyAuVpifmCz1woQ3cEqSPKoKGbzPJs7-OGtIkUnXWNVq9xGvAAD0ea4W79YQ-QrMUsKUqXdAJwcsl3sSHd355iQ0iOO1PStlTjVD-PNflxXcLIi2YEVMy3GVhhbJVHAfRCcGwV376LxI4wAEbBNHe6r5pddwJw" 
            alt="Aceh Landscape" 
            fill 
            className="object-cover transition-transform duration-[5000ms] group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary-container/20 backdrop-blur-xl border border-white/10">
              <LucideShield className="size-4 text-secondary-fixed animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Project FloodGuard</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-[0.95] tracking-tighter uppercase">
              Securing the Future <br/>
              <span className="text-primary-fixed">of Aceh's Ecosystem.</span>
            </h2>
            <p className="text-lg text-primary-fixed/80 font-medium leading-relaxed max-w-xl">
              FloodGuard Aceh is a state-of-the-art predictive intelligence system designed to anticipate and mitigate seasonal flood risks across the Aceh province using satellite telemetry and advanced machine learning.
            </p>
            <div className="pt-4 flex gap-6">
                <Button className="h-16 px-10 rounded-[28px] bg-white text-primary font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all">
                    Our Mission
                </Button>
                <Button variant="ghost" className="h-16 px-10 rounded-[28px] border-2 border-white/20 text-white font-black uppercase text-[11px] tracking-widest hover:bg-white/10">
                    Watch Documentary
                </Button>
            </div>
          </div>
        </section>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-12 lg:col-span-8 space-y-10">
            <div className="bg-surface-container-lowest p-12 rounded-[56px] shadow-sm border border-surface-container/50">
              <div className="flex items-center gap-6 mb-10">
                <div className="size-16 rounded-[28px] bg-primary/5 flex items-center justify-center text-primary group">
                  <LucideZap className="size-8 group-hover:scale-110 transition-transform" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-black tracking-tight text-primary uppercase">Technical Methodology</h3>
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Scientific Foundations</p>
                </div>
              </div>
              <p className="text-base font-medium text-on-surface-variant/80 leading-[1.8] mb-12 max-w-3xl">
                Our system processes multi-dimensional data including precipitation patterns, soil moisture index, and topographical slope variants to output high-precision risk heatmaps with minute-level granularity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface-container-low p-8 rounded-[40px] border-l-8 border-primary flex flex-col justify-between group cursor-default hover:bg-white transition-colors">
                  <div className="space-y-4">
                    <h4 className="font-black text-primary text-xs uppercase tracking-[0.2em]">XGBoost Engine</h4>
                    <p className="text-sm font-bold text-on-surface-variant/60 leading-relaxed">
                      Utilizing eXtreme Gradient Boosting for high-performance supervised learning. This algorithm excels at capturing non-linear relationships between meteorological variables.
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-8 rounded-[40px] border-l-8 border-secondary flex flex-col justify-between group cursor-default hover:bg-white transition-colors">
                  <div className="space-y-4">
                    <h4 className="font-black text-secondary text-xs uppercase tracking-[0.2em]">SMOTE Balancing</h4>
                    <p className="text-sm font-bold text-on-surface-variant/60 leading-relaxed">
                      Synthetic Minority Over-sampling Technique (SMOTE) is applied to address historical dataset imbalances, ensuring the model accurately predicts rare, high-impact flood events.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats Overlay Card */}
            <div className="bg-surface-container p-10 rounded-[56px] grid grid-cols-1 md:grid-cols-3 gap-10 relative overflow-hidden border border-surface-container">
                {[
                    { label: "Model Accuracy", value: "94.2%" },
                    { label: "Early Warning", value: "24h" },
                    { label: "Sensors Tracked", value: "1.2k" },
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-2 relative z-10">
                        <p className="text-5xl font-black text-primary tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">{stat.label}</p>
                    </div>
                ))}
                {/* Decoration */}
                <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Agency Sidebar Card */}
          <div className="md:col-span-12 lg:col-span-4 h-full">
            <div className="bg-primary text-white p-12 rounded-[56px] h-full relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-primary/20">
              <div className="space-y-10 relative z-10">
                <div className="size-20 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-2xl border border-white/5 shadow-xl">
                  <LucideShield className="size-10 text-secondary-fixed" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Aceh Flood Monitoring Agency</h3>
                    <div className="h-1.5 w-16 bg-secondary-fixed rounded-full"></div>
                </div>
                <p className="text-primary-fixed/60 font-medium text-base leading-relaxed">
                  The lead provincial body responsible for disaster risk reduction and environmental stewardship. AFMA coordinates local emergency response units using real-time data from FloodGuard.
                </p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <LucideLocate className="size-5 text-secondary-fixed" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-primary-fixed">Banda Aceh, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <LucideMail className="size-5 text-secondary-fixed" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-primary-fixed">contact@afma.gov.id</span>
                  </div>
                </div>
              </div>
              <Button className="mt-12 w-full h-16 bg-secondary text-white font-black uppercase text-[11px] tracking-widest rounded-[28px] border-none shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 relative z-10">
                  Contact Agency
                  <LucideExternalLink className="size-4" />
              </Button>
              {/* Background Art */}
              <div className="absolute -bottom-20 -right-20 size-80 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Partnerships Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10">
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Inter-Agency <br/> Collaboration</h3>
            <p className="text-base font-medium text-on-surface-variant/60 leading-[1.8] max-w-xl">
              We partner with national meteorological departments and international geospatial intelligence firms to ensure the highest fidelity of topographical data possible.
            </p>
            <div className="flex flex-wrap gap-6">
                {[
                    { label: "BMKG Certified", icon: LucideCheckCircle2 },
                    { label: "Sentinel-2 Data", icon: LucideSatellite },
                ].map((tag, i) => (
                    <div key={i} className="h-14 px-8 bg-surface-container-high rounded-[24px] flex items-center gap-4 border border-surface-container/50">
                        <tag.icon className="size-5 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{tag.label}</span>
                    </div>
                ))}
            </div>
          </div>
          <div className="relative rounded-[64px] overflow-hidden h-80 bg-surface-container border-8 border-white shadow-2xl">
            <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgKqABmCpBOsXvr84JS6S3Paav8RFdgmfkrEaqoqBkyQtVYo45Rq_spDxz5gVIgcTRkf9m0TT9zitEiGLvho8sUtWTifFXxadhY6tSIT2AB0lrlJk8BPf69MLx40GfFsdU8pSwgYCNsYWO3t4MqxjVfKwQv2IuAdYzvXDKKjXJeGKCUZL_Bk06FpftCg9vZ3DlllLisGiB-YVTfPB7NSm7SZMxyTuAdBMUFf_Rte8xv3wyfE5lWfUhFShpMJ0gcVlTPZt5ecPAtE" 
                alt="Collaboration" 
                fill 
                className="object-cover grayscale opacity-20 transition-all duration-1000 hover:grayscale-0 hover:opacity-100"
            />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
          </div>
        </section>

        {/* Footer Brand */}
        <footer className="pt-20 pb-10 text-center flex flex-col items-center gap-6">
            <div className="h-px w-20 bg-primary/10"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/40 block">FloodGuard Aceh • Geographic Information System Division</p>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/20">All Rights Reserved © 2024</p>
        </footer>
      </main>
    </>
  )
}
