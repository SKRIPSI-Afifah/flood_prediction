"use client";

import { 
  ChevronRight, 
  Download, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  BarChart2, 
  Activity,
  Zap,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/sentinel/GlassPanel";

export default function PreprocessingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">
            <span>Project</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Preprocessing</span>
          </nav>
          <h3 className="text-4xl font-black tracking-tight text-primary">Data Balancing (SMOTE)</h3>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-primary/20 text-primary rounded-full px-6 bg-card/50">
            <Download className="w-4 h-4 mr-2" /> Export Log
          </Button>
          <Button className="font-bold bg-gradient-to-r from-primary to-primary/80 rounded-full px-8 shadow-xl shadow-primary/20">
            <RefreshCw className="w-4 h-4 mr-2" /> Re-run SMOTE
          </Button>
        </div>
      </div>

      {/* Main Grid: Info + Stats */}
      <div className="grid grid-cols-12 gap-8">
        {/* Editorial Hero: What is SMOTE? */}
        <div className="col-span-12 lg:col-span-4 bg-primary text-white rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-2xl font-black mb-4 tracking-tight uppercase italic">What is SMOTE?</h4>
            <p className="text-white/80 leading-relaxed font-medium">
              <strong className="text-white">Synthetic Minority Over-sampling Technique</strong> is a statistical methodology for balancing imbalanced datasets by synthesizing new minority class samples.
            </p>
            <p className="mt-6 text-white/80 leading-relaxed text-sm font-medium">
              Instead of simple duplication, SMOTE selects similar records and performs interpolation, preventing "overfitting via memorization" and improving model generalization in high-risk zones.
            </p>
            <div className="mt-10 p-5 bg-white/10 rounded-2xl flex items-start gap-4 border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Target Variable</p>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter">Flood Risk Level (Binary)</p>
                </div>
            </div>
          </div>
          <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 opacity-50 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
        </div>

        {/* Stats Summary Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Row 1: High Level Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-10 rounded-[3rem] border border-border/10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 p-8">
                    <BarChart2 className="w-12 h-12 text-muted-foreground/10 group-hover:text-primary/10 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Initial Row Count</p>
                <h5 className="text-5xl font-black text-primary tracking-tighter">14,208</h5>
                <div className="flex items-center gap-3 mt-6">
                    <span className="px-3 py-1 bg-destructive/10 text-destructive text-[10px] font-black uppercase rounded-full border border-destructive/20">Imbalanced</span>
                    <span className="text-[11px] font-bold text-muted-foreground">Ratio: 4.1 : 1</span>
                </div>
            </div>
            <div className="bg-gradient-to-br from-secondary to-secondary/80 p-10 rounded-[3rem] text-white shadow-xl shadow-secondary/10 relative overflow-hidden group hover:scale-[1.01] transition-all">
                <div className="absolute top-0 right-0 p-8">
                    <Activity className="w-12 h-12 text-white/10" />
                </div>
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Balanced Row Count</p>
                <h5 className="text-5xl font-black text-white tracking-tighter">22,732</h5>
                <div className="flex items-center gap-3 mt-6">
                    <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase rounded-full border border-white/20">Optimal</span>
                    <span className="text-[11px] font-bold text-white/80">Ratio: 1 : 1</span>
                </div>
            </div>
          </div>

          {/* Row 2: Distribution Comparison Card */}
          <div className="bg-card p-10 rounded-[3rem] border border-border/10 shadow-sm relative">
            <div className="flex justify-between items-center mb-10">
                <h6 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Distribution Shift</h6>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                    <span className="text-[10px] font-black text-muted-foreground uppercase opacity-70">Safe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                    <span className="text-[10px] font-black text-muted-foreground uppercase opacity-70">Risk</span>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Before */}
                <div className="space-y-8">
                    <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center italic">Before Resampling</h5>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-primary">
                                <span>Tidak Rawan</span>
                                <span>80% (11,366)</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary/40 w-[80%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-tertiary">
                                <span>Rawan (Minority)</span>
                                <span>20% (2,842)</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary w-[20%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Arrow Decorator */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-border items-center justify-center text-primary shadow-md z-10 mt-6">
                    <ChevronRight className="w-6 h-6" />
                </div>

                {/* After */}
                <div className="space-y-8">
                    <h5 className="text-[10px] font-black text-primary uppercase tracking-widest text-center italic">After SMOTE</h5>
                    <div className="space-y-6">
                         <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-primary">
                                <span>Tidak Rawan</span>
                                <span>50% (11,366)</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[50%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-secondary">
                                <span>Rawan (Synthetic)</span>
                                <span>50% (11,366)</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-[50%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="mt-12 text-center text-xs text-muted-foreground font-medium max-w-lg mx-auto italic">
              "Resampling operation confirmed. The minority class (Rawan) has been synthetically augmented to eliminate predictive bias during the XGBoost modeling phase."
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-muted/40 p-10 rounded-[3rem] border border-border/10">
        {[
          { label: "Neighbors", val: "K=5", sub: "Euclidean Space" },
          { label: "Strategy", val: "Auto", sub: "Ratio 1:1 Target" },
          { label: "Random State", val: "42", sub: "Deterministic Seed" },
          { label: "Execution", val: "1.24s", sub: "Core GPU Accelerated" }
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-black text-primary tracking-tighter">{item.val}</p>
            <p className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Visualization Card */}
      <GlassPanel className="p-12 rounded-[4rem] border-white/40 shadow-2xl relative overflow-hidden bg-white/40">
        <div className="flex justify-between items-start mb-12">
            <div>
              <h4 className="text-2xl font-black text-primary tracking-tight">Feature Space Visualization</h4>
              <p className="text-sm text-muted-foreground mt-1 font-medium italic">PCA Projection showing synthesis interpolation between multi-dimensional clusters.</p>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20"></span>
                    <span className="text-xs font-black text-primary uppercase">Original</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-secondary"></span>
                    <span className="text-xs font-black text-secondary uppercase">Synthetic</span>
                </div>
            </div>
        </div>

        <div className="relative w-full aspect-[21/9] bg-primary/5 rounded-[2rem] overflow-hidden border border-white/60">
            <img 
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.2] opacity-80"
              alt="Cluster Visualization"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_WKM7O3C-4u5Ls9hoZLCFeH5cOmbRLxIouGqBQ3HZ4SMiO4teDi7IztCv1viWtuOiEp25AJfZQ6pmSBOmKV2vupXiuKq_xRD-2JVX4-qdq7sJ0vM4i2NENwqujIsnC0Oq8T2w1c-7C6qxUQKqL20qGp1TPv0xGeKI5-kQGUP2V7Npld9safWHXaPolRXWwzZIWZqiYMzS3KjdEX2nCBJ9cZarG10WJwE9ZaQ__zQm43k7o4BzASbhaOCsMCABJbpxtfxd8q2K56M" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="px-10 py-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white flex items-center gap-4">
                    <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                    <span className="text-sm font-black text-primary uppercase tracking-tight">Synthesizing 8,524 new spatial records via linear interpolation</span>
                </div>
            </div>
        </div>
      </GlassPanel>
    </div>
  );
}
