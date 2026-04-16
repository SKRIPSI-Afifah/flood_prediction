"use client"

import {
  ChevronRight,
  Download,
  Sparkles,
  CheckCircle2,
  BarChart2,
  Activity,
  Zap,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassPanel } from "@/components/sentinel/GlassPanel"

export default function PreprocessingPage() {
  return (
    <div className="animate-in space-y-8 pb-12 duration-700 fade-in">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
            <span>Project</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary">Preprocessing</span>
          </nav>
          <h3 className="text-4xl font-black tracking-tight text-primary">
            Data Balancing (SMOTE)
          </h3>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-card/50 rounded-full border-primary/20 px-6 font-bold text-primary"
          >
            <Download className="mr-2 h-4 w-4" /> Export Log
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 font-bold shadow-xl shadow-primary/20">
            <RefreshCw className="mr-2 h-4 w-4" /> Re-run SMOTE
          </Button>
        </div>
      </div>

      {/* Main Grid: Info + Stats */}
      <div className="grid grid-cols-12 gap-8">
        {/* Editorial Hero: What is SMOTE? */}
        <div className="group relative col-span-12 flex flex-col justify-center overflow-hidden rounded-[3rem] bg-primary p-10 text-white shadow-2xl lg:col-span-4">
          <div className="relative z-10">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h4 className="mb-4 text-2xl font-black tracking-tight uppercase italic">
              What is SMOTE?
            </h4>
            <p className="leading-relaxed font-medium text-white/80">
              <strong className="text-white">
                Synthetic Minority Over-sampling Technique
              </strong>{" "}
              is a statistical methodology for balancing imbalanced datasets by
              synthesizing new minority class samples.
            </p>
            <p className="mt-6 text-sm leading-relaxed font-medium text-white/80">
              Instead of simple duplication, SMOTE selects similar records and
              performs interpolation, preventing &quot;overfitting via
              memorization&quot; and improving model generalization in high-risk
              zones.
            </p>
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <CheckCircle2 className="h-6 w-6 text-secondary" />
              <div>
                <p className="text-[10px] font-black tracking-widest text-white/60 uppercase">
                  Target Variable
                </p>
                <p className="text-sm font-bold tracking-tighter text-white uppercase">
                  Flood Risk Level (Binary)
                </p>
              </div>
            </div>
          </div>
          <Zap className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 text-white/5 opacity-50 transition-transform duration-1000 group-hover:scale-110" />
        </div>

        {/* Stats Summary Column */}
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-8">
          {/* Row 1: High Level Stats */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-card group relative overflow-hidden rounded-[3rem] border border-border/10 p-10 shadow-sm transition-all hover:shadow-lg">
              <div className="absolute top-0 right-0 p-8">
                <BarChart2 className="h-12 w-12 text-muted-foreground/10 transition-colors group-hover:text-primary/10" />
              </div>
              <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                Initial Row Count
              </p>
              <h5 className="text-5xl font-black tracking-tighter text-primary">
                14,208
              </h5>
              <div className="mt-6 flex items-center gap-3">
                <span className="rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-[10px] font-black text-destructive uppercase">
                  Imbalanced
                </span>
                <span className="text-[11px] font-bold text-muted-foreground">
                  Ratio: 4.1 : 1
                </span>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-secondary to-secondary/80 p-10 text-white shadow-xl shadow-secondary/10 transition-all hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-8">
                <Activity className="h-12 w-12 text-white/10" />
              </div>
              <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">
                Balanced Row Count
              </p>
              <h5 className="text-5xl font-black tracking-tighter text-white">
                22,732
              </h5>
              <div className="mt-6 flex items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/20 px-3 py-1 text-[10px] font-black text-white uppercase">
                  Optimal
                </span>
                <span className="text-[11px] font-bold text-white/80">
                  Ratio: 1 : 1
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Distribution Comparison Card */}
          <div className="bg-card relative rounded-[3rem] border border-border/10 p-10 shadow-sm">
            <div className="mb-10 flex items-center justify-between">
              <h6 className="text-xs font-black tracking-[0.3em] text-primary uppercase">
                Distribution Shift
              </h6>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary/20"></span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase opacity-70">
                    Safe
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase opacity-70">
                    Risk
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
              {/* Before */}
              <div className="space-y-8">
                <h5 className="text-center text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">
                  Before Resampling
                </h5>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-primary">
                      <span>Tidak Rawan</span>
                      <span>80% (11,366)</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[80%] rounded-full bg-primary/40"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-tertiary">
                      <span>Rawan (Minority)</span>
                      <span>20% (2,842)</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[20%] rounded-full bg-tertiary"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Decorator */}
              <div className="absolute top-1/2 left-1/2 z-10 mt-6 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-md lg:flex">
                <ChevronRight className="h-6 w-6" />
              </div>

              {/* After */}
              <div className="space-y-8">
                <h5 className="text-center text-[10px] font-black tracking-widest text-primary uppercase italic">
                  After SMOTE
                </h5>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-primary">
                      <span>Tidak Rawan</span>
                      <span>50% (11,366)</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[50%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-secondary">
                      <span>Rawan (Synthetic)</span>
                      <span>50% (11,366)</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[50%] rounded-full bg-secondary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-lg text-center text-xs font-medium text-muted-foreground italic">
              &quot;Resampling operation confirmed. The minority class (Rawan)
              has been synthetically augmented to eliminate predictive bias
              during the XGBoost modeling phase.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Metadata Grid */}
      <div className="grid grid-cols-2 gap-8 rounded-[3rem] border border-border/10 bg-muted/40 p-10 md:grid-cols-4">
        {[
          { label: "Neighbors", val: "K=5", sub: "Euclidean Space" },
          { label: "Strategy", val: "Auto", sub: "Ratio 1:1 Target" },
          { label: "Random State", val: "42", sub: "Deterministic Seed" },
          { label: "Execution", val: "1.24s", sub: "Core GPU Accelerated" },
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
              {item.label}
            </p>
            <p className="text-2xl font-black tracking-tighter text-primary">
              {item.val}
            </p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Visualization Card */}
      <GlassPanel className="relative overflow-hidden rounded-[4rem] border-white/40 bg-white/40 p-12 shadow-2xl">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h4 className="text-2xl font-black tracking-tight text-primary">
              Feature Space Visualization
            </h4>
            <p className="mt-1 text-sm font-medium text-muted-foreground italic">
              PCA Projection showing synthesis interpolation between
              multi-dimensional clusters.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-primary/20"></span>
              <span className="text-xs font-black text-primary uppercase">
                Original
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-secondary"></span>
              <span className="text-xs font-black text-secondary uppercase">
                Synthetic
              </span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-white/60 bg-primary/5">
          <img
            className="h-full w-full object-cover opacity-80 contrast-[1.2] grayscale-[0.2]"
            alt="Cluster Visualization"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_WKM7O3C-4u5Ls9hoZLCFeH5cOmbRLxIouGqBQ3HZ4SMiO4teDi7IztCv1viWtuOiEp25AJfZQ6pmSBOmKV2vupXiuKq_xRD-2JVX4-qdq7sJ0vM4i2NENwqujIsnC0Oq8T2w1c-7C6qxUQKqL20qGp1TPv0xGeKI5-kQGUP2V7Npld9safWHXaPolRXWwzZIWZqiYMzS3KjdEX2nCBJ9cZarG10WJwE9ZaQ__zQm43k7o4BzASbhaOCsMCABJbpxtfxd8q2K56M"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4 rounded-full border border-white bg-white/90 px-10 py-4 shadow-2xl backdrop-blur-xl">
              <Sparkles className="h-5 w-5 animate-pulse text-secondary" />
              <span className="text-sm font-black tracking-tight text-primary uppercase">
                Synthesizing 8,524 new spatial records via linear interpolation
              </span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
