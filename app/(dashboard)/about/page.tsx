"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/sentinel/GlassPanel";

export default function AboutPage() {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-[4rem] overflow-hidden flex items-center px-12 md:px-20 group shadow-2xl">
        <img 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt="Aceh Coastal"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFIUFdByCJQz82ZLqP9C92QQz4Nfe9l5dCIrk6mTnAB9iCwtDq3l_yEGAgAsYu-RgBqAyjS3IWJ6tCZSVVJgl2UTEhvvB-RnpUnKXROD84VzCMmAyAuVpifmCz1woQ3cEqSPKoKGbzPJs7-OGtIkUnXWNVq9xGvAAD0ea4W79YQ-QrMUsKUqXdAJwcsl3sSHd355iQ0iOO1PStlTjVD-PNflxXcLIi2YEVMy3GVhhbJVHAfRCcGwV376LxI4wAEbBNHe6r5pddwJw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
        <div className="relative z-10 max-w-3xl">
          <Badge className="px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-black tracking-[0.3em] uppercase mb-8 border-none ring-4 ring-secondary-container/20">
            Project Sentinel Hydro
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-8 uppercase italic transition-all duration-700">
            Securing the Future of <br />
            <span className="text-secondary drop-shadow-lg">Aceh's Ecosystem.</span>
          </h2>
          <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl">
            Sentinel Hydro is a state-of-the-art predictive intelligence system designed to anticipate and mitigate seasonal flood risks across the Aceh province using satellite telemetry and advanced machine learning.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          {/* Methodology */}
          <GlassPanel className="p-12 rounded-[3.5rem] bg-white/40 border-white/60 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-primary uppercase italic tracking-tight">Technical Methodology</h3>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed mb-10 text-lg">
              Our system processes multi-dimensional data including precipitation patterns, soil moisture index, and topographical slope variants to output high-precision risk heatmaps.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-3xl border-l-8 border-primary shadow-sm group hover:scale-[1.02] transition-all">
                <h4 className="font-black text-primary text-sm mb-3 uppercase tracking-widest italic">XGBoost Engine</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Utilizing eXtreme Gradient Boosting for high-performance supervised learning. This algorithm excels at capturing non-linear relationships between variables.
                </p>
              </div>
              <div className="bg-white/80 p-8 rounded-3xl border-l-8 border-secondary shadow-sm group hover:scale-[1.02] transition-all">
                <h4 className="font-black text-secondary text-sm mb-3 uppercase tracking-widest italic">SMOTE Balancing</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Synthetic Minority Over-sampling Technique (SMOTE) addresses historical dataset imbalances, ensuring accuracy for rare, high-impact flood events.
                </p>
              </div>
            </div>
          </GlassPanel>

          {/* Metrics */}
          <div className="bg-muted px-12 py-10 rounded-[3rem] grid grid-cols-1 md:grid-cols-3 gap-10 border border-border/10 shadow-inner">
            {[
              { val: "94.2%", label: "Model Accuracy" },
              { val: "24h", label: "Early Warning" },
              { val: "1.2k", label: "Sensors Tracked" },
            ].map((m, idx) => (
              <div key={idx} className="text-center group">
                <p className="text-5xl font-black text-primary mb-2 tracking-tighter group-hover:scale-110 transition-transform">{m.val}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-primary text-white p-12 rounded-[4rem] h-full relative overflow-hidden shadow-2xl flex flex-col justify-between group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 backdrop-blur-xl border border-white/10 shadow-xl">
                <ShieldAlert className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-black mb-6 uppercase italic tracking-tight">Aceh Flood Monitoring Agency</h3>
              <p className="text-white/60 text-base font-medium leading-relaxed mb-10">
                The lead provincial body responsible for disaster risk reduction and environmental stewardship. AFMA coordinates local emergency response units using real-time data from Sentinel Hydro.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/80 font-bold group/item cursor-default">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-white/20 transition-colors">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm">Banda Aceh, Indonesia</span>
                </div>
                <div className="flex items-center gap-4 text-white/80 font-bold group/item cursor-default">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm">contact@afma.acehprov.go.id</span>
                </div>
              </div>
            </div>
            <Button className="mt-12 w-full py-8 bg-secondary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Contact Agency <ExternalLink className="ml-3 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Collaboration */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-8">
        <div className="space-y-8 px-4">
          <h3 className="text-4xl font-black text-primary tracking-tighter uppercase italic leading-none">Inter-Agency Collaboration</h3>
          <p className="text-muted-foreground font-medium leading-relaxed text-lg">
            We partner with national meteorological departments and international geospatial intelligence firms to ensure the highest fidelity of topographical data possible.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-3 bg-muted rounded-full flex items-center gap-3 border border-border/10 shadow-sm hover:bg-white transition-colors">
              <Verified className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">BMKG Certified</span>
            </div>
            <div className="px-6 py-3 bg-muted rounded-full flex items-center gap-3 border border-border/10 shadow-sm hover:bg-white transition-colors">
              <Satellite className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Sentinel-2 Data</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-[4rem] overflow-hidden h-80 bg-muted shadow-2xl border-[10px] border-white group">
          <img 
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
            alt="Data Analysis"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgKqABmCpBOsXvr84JS6S3Paav8RFdgmfkrEaqoqBkyQtVYo45Rq_spDxz5gVIgcTRkf9m0TT9zitEiGLvho8sUtWTifFXxadhY6tSIT2AB0lrlJk8BPf69MLx40GfFsdU8pSwgYCNsYWO3t4MqxjVfKwQv2IuAdYzvXDKKjXJeGKCUZL_Bk06FpftCg9vZ3DlllLisGiB-YVTfPB7NSm7SZMxyTuAdBMUFf_Rte8xv3wyfE5lWfUhFShpMJ0gcVlTPZt5ecPAtE"
          />
          <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:bg-transparent transition-colors"></div>
          <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8 border-t border-border/10 text-center">
        <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.4em]">
          © 2024 Sentinel Hydro • Geographic Info System Division • All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
