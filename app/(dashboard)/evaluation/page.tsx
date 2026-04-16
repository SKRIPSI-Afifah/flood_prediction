"use client"

import {
  Target,
  History as HistoryIcon,
  Scale,
  TrendingUp,
  Download,
  RefreshCw,
  ShieldCheck,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassPanel } from "@/components/sentinel/GlassPanel"

export default function EvaluationPage() {
  return (
    <div className="animate-in space-y-12 pb-12 duration-700 fade-in">
      {/* Header Section */}
      <div className="max-w-7xl">
        <h2 className="mb-4 text-5xl leading-tight font-black tracking-tighter text-primary uppercase italic">
          Model Performance Analysis
        </h2>
        <p className="max-w-2xl text-lg font-medium text-muted-foreground">
          Detailed statistical breakdown of the flood risk predictive engine.
          Validated against historical rainfall and elevation data from the Aceh
          regional GIS repository.
        </p>
      </div>

      {/* Bento Metrics Grid */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {[
          {
            label: "Accuracy",
            value: "94.2%",
            icon: ShieldCheck,
            trend: "+2.4%",
            color: "border-primary",
            subText: "from last epoch",
          },
          {
            label: "Precision",
            value: "91.8%",
            icon: Target,
            trend: null,
            color: "border-secondary",
            subText: "True Positive consistency",
          },
          {
            label: "Recall",
            value: "89.5%",
            icon: HistoryIcon,
            trend: null,
            color: "border-tertiary",
            subText: "False Negative mitigation",
          },
          {
            label: "F1-Score",
            value: "90.6%",
            icon: Scale,
            trend: null,
            color: "border-primary",
            subText: "Harmonic mean balance",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`bg-card rounded-[2.5rem] border-l-8 p-8 ${item.color} group flex flex-col justify-between shadow-sm transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                {item.label}
              </span>
              <item.icon
                className={`h-5 w-5 ${item.color.replace("border-", "text-")}`}
              />
            </div>
            <div>
              <div className="mt-6 text-4xl font-black tracking-tighter text-primary">
                {item.value}
              </div>
              {item.trend ? (
                <p className="mt-2 flex items-center gap-1 text-[10px] font-black tracking-widest text-secondary uppercase italic">
                  <TrendingUp className="h-3 w-3" /> {item.trend} {item.subText}
                </p>
              ) : (
                <p className="mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  {item.subText}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Confusion Matrix */}
        <div className="relative overflow-hidden rounded-[3rem] border border-border/10 bg-muted/40 p-10 lg:col-span-5">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black tracking-tight text-primary uppercase italic">
                Confusion Matrix
              </h3>
              <p className="mt-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                Model: Aceh-Sentinel-v4.2
              </p>
            </div>
            <Button
              variant="link"
              className="text-[10px] font-black tracking-widest text-primary uppercase hover:text-secondary hover:no-underline"
            >
              Download CSV
            </Button>
          </div>

          <div className="grid grid-cols-[3rem_1fr_1fr] grid-rows-[3rem_1fr_1fr] gap-4">
            {/* Labels */}
            <div></div>
            <div className="text-center text-[9px] font-black tracking-widest text-muted-foreground uppercase">
              Predicted: Flood
            </div>
            <div className="text-center text-[9px] font-black tracking-widest text-muted-foreground uppercase">
              Predicted: Safe
            </div>

            <div className="flex rotate-180 items-center justify-center text-[9px] font-black tracking-widest text-muted-foreground uppercase [writing-mode:vertical-lr]">
              Actual: Flood
            </div>

            {/* TP */}
            <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-xl shadow-primary/20">
              <span className="z-10 text-4xl font-black tracking-tighter">
                4,821
              </span>
              <span className="z-10 mt-2 text-[9px] font-black tracking-widest uppercase opacity-60">
                True Positives
              </span>
              <div className="absolute inset-0 scale-0 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150"></div>
            </div>

            {/* FN */}
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border/50 bg-muted p-8 text-primary">
              <span className="text-4xl font-black tracking-tighter">214</span>
              <span className="mt-2 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                False Negatives
              </span>
            </div>

            <div className="flex rotate-180 items-center justify-center text-[9px] font-black tracking-widest text-muted-foreground uppercase [writing-mode:vertical-lr]">
              Actual: Safe
            </div>

            {/* FP */}
            <div className="flex flex-col items-center justify-center rounded-3xl border-l-8 border-tertiary bg-tertiary/10 p-8 text-tertiary">
              <span className="text-4xl font-black tracking-tighter">156</span>
              <span className="mt-2 text-[9px] font-black tracking-widest uppercase opacity-60">
                False Positives
              </span>
            </div>

            {/* TN */}
            <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-xl shadow-secondary/20">
              <span className="z-10 text-4xl font-black tracking-tighter">
                8,942
              </span>
              <span className="z-10 mt-2 text-[9px] font-black tracking-widest uppercase opacity-60">
                True Negatives
              </span>
              <div className="absolute inset-0 scale-0 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150"></div>
            </div>
          </div>

          <div className="mt-10 border-t border-border/10 pt-8">
            <div className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm">
              <Lightbulb className="h-5 w-5 text-primary" />
              <p className="text-xs leading-relaxed font-medium text-muted-foreground italic">
                <strong>Insight:</strong> The model shows exceptional
                specificity (Safe areas) but has a slight tendency for type-2
                errors in mountainous flash-flood scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* ROC-AUC Curve */}
        <div className="bg-card rounded-[3rem] border border-border/10 p-10 shadow-sm lg:col-span-7">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black tracking-tight text-primary uppercase italic">
                ROC-AUC Characteristic Curve
              </h3>
              <p className="mt-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                AUC = 0.978 (Class-A Performance)
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                  CNN-LSTM Model
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-dashed border-muted-foreground"></span>
                <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                  Baseline
                </span>
              </div>
            </div>
          </div>

          {/* Chart Placeholder (SVG) */}
          <div className="relative mt-8 h-[400px] w-full border-b border-l border-border">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-[1px] w-full bg-black"></div>
              ))}
            </div>
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {/* Baseline */}
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                stroke="#CBD5E1"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              {/* ROC Curve */}
              <path
                d="M 0 100 Q 5 10, 100 0"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Fill */}
              <path
                d="M 0 100 Q 5 10, 100 0 L 100 100 Z"
                fill="currentColor"
                className="text-primary/5"
              />
            </svg>

            {/* Tooltip Dot */}
            <div className="group absolute top-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-pulse cursor-pointer rounded-full bg-primary ring-8 ring-primary/10"></div>
              <GlassPanel className="absolute bottom-full left-1/2 mb-6 hidden w-40 -translate-x-1/2 rounded-3xl border-white bg-white/90 p-4 shadow-2xl group-hover:block">
                <div className="mb-1 text-[10px] font-black text-primary uppercase">
                  Threshold: 0.45
                </div>
                <div className="text-[8px] font-black tracking-widest text-muted-foreground uppercase">
                  TPR: 0.94 | FPR: 0.08
                </div>
              </GlassPanel>
            </div>

            {/* Chart Labels */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 text-[9px] font-black tracking-[0.3em] whitespace-nowrap text-muted-foreground uppercase">
              False Positive Rate (1 - Specificity)
            </div>
            <div className="absolute top-1/2 left-0 -translate-x-14 -translate-y-1/2 -rotate-90 text-[9px] font-black tracking-[0.3em] whitespace-nowrap text-muted-foreground uppercase">
              True Positive Rate (Sensitivity)
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-border/10 bg-muted/30 p-10 md:flex-row">
        <div className="flex items-center gap-8">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-4 border-muted bg-primary/20 shadow-sm"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + i * 100}`}
                  alt="Scientist"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-muted bg-primary text-xs font-black text-white shadow-sm">
              +4
            </div>
          </div>
          <div>
            <p className="text-sm font-black tracking-tight text-primary uppercase italic">
              Peer Review Completed
            </p>
            <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Reviewed by regional hydrological team 2 hours ago
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="rounded-2xl border-primary/20 px-10 py-7 text-[10px] font-black tracking-widest text-primary uppercase hover:bg-primary/5"
          >
            <Download className="mr-3 h-4 w-4" /> Export Technical Report
          </Button>
          <Button className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-10 py-7 text-[10px] font-black tracking-widest text-white uppercase shadow-xl shadow-primary/20">
            <RefreshCw className="mr-3 h-4 w-4" /> Initiate Re-training
          </Button>
        </div>
      </div>
    </div>
  )
}
