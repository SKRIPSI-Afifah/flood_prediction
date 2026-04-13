"use client";

import {
  CheckCircle2,
  Target,
  History as HistoryIcon,
  Scale,
  Search,
  TrendingUp,
  Download,
  RefreshCw,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/sentinel/GlassPanel";

export default function EvaluationPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-12">
      {/* Header Section */}
      <div className="max-w-7xl">
        <h2 className="text-5xl font-black tracking-tighter text-primary italic leading-tight mb-4 uppercase">
          Model Performance Analysis
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium">
          Detailed statistical breakdown of the flood risk predictive engine. Validated against historical rainfall and elevation data from the Aceh regional GIS repository.
        </p>
      </div>

      {/* Bento Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Accuracy", value: "94.2%", icon: ShieldCheck, trend: "+2.4%", color: "border-primary", subText: "from last epoch" },
          { label: "Precision", value: "91.8%", icon: Target, trend: null, color: "border-secondary", subText: "True Positive consistency" },
          { label: "Recall", value: "89.5%", icon: HistoryIcon, trend: null, color: "border-tertiary", subText: "False Negative mitigation" },
          { label: "F1-Score", value: "90.6%", icon: Scale, trend: null, color: "border-primary", subText: "Harmonic mean balance" },
        ].map((item, idx) => (
          <div key={idx} className={`bg-card p-8 rounded-[2.5rem] border-l-8 ${item.color} shadow-sm flex flex-col justify-between group hover:scale-[1.02] transition-all`}>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
              <item.icon className={`w-5 h-5 ${item.color.replace('border-', 'text-')}`} />
            </div>
            <div>
              <div className="text-4xl font-black text-primary tracking-tighter mt-6">{item.value}</div>
              {item.trend ? (
                <p className="text-[10px] text-secondary font-black flex items-center gap-1 mt-2 uppercase tracking-widest italic">
                  <TrendingUp className="w-3 h-3" /> {item.trend} {item.subText}
                </p>
              ) : (
                <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">{item.subText}</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Confusion Matrix */}
        <div className="lg:col-span-5 bg-muted/40 rounded-[3rem] p-10 relative overflow-hidden border border-border/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-primary uppercase italic tracking-tight">Confusion Matrix</h3>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Model: Aceh-Sentinel-v4.2</p>
            </div>
            <Button variant="link" className="text-primary text-[10px] font-black uppercase tracking-widest hover:no-underline hover:text-secondary">
              Download CSV
            </Button>
          </div>

          <div className="grid grid-cols-[3rem_1fr_1fr] grid-rows-[3rem_1fr_1fr] gap-4">
            {/* Labels */}
            <div></div>
            <div className="text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">Predicted: Flood</div>
            <div className="text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground">Predicted: Safe</div>

            <div className="flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Actual: Flood</div>

            {/* TP */}
            <div className="bg-primary text-white rounded-3xl p-8 flex flex-col items-center justify-center group relative overflow-hidden shadow-xl shadow-primary/20">
              <span className="text-4xl font-black z-10 tracking-tighter">4,821</span>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60 z-10 mt-2">True Positives</span>
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
            </div>

            {/* FN */}
            <div className="bg-muted border-2 border-dashed border-border/50 text-primary rounded-3xl p-8 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-tighter">214</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-2">False Negatives</span>
            </div>

            <div className="flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Actual: Safe</div>

            {/* FP */}
            <div className="bg-tertiary/10 border-l-8 border-tertiary text-tertiary rounded-3xl p-8 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-tighter">156</span>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60 mt-2">False Positives</span>
            </div>

            {/* TN */}
            <div className="bg-secondary text-white rounded-3xl p-8 flex flex-col items-center justify-center group relative overflow-hidden shadow-xl shadow-secondary/20">
              <span className="text-4xl font-black z-10 tracking-tighter">8,942</span>
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60 z-10 mt-2">True Negatives</span>
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border/10">
            <div className="flex items-start gap-4 p-5 bg-white/40 rounded-2xl border border-white/60 shadow-sm">
              <Lightbulb className="w-5 h-5 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground font-medium italic">
                <strong>Insight:</strong> The model shows exceptional specificity (Safe areas) but has a slight tendency for type-2 errors in mountainous flash-flood scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* ROC-AUC Curve */}
        <div className="lg:col-span-7 bg-card rounded-[3rem] p-10 shadow-sm border border-border/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-primary uppercase italic tracking-tight">ROC-AUC Characteristic Curve</h3>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">AUC = 0.978 (Class-A Performance)</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">CNN-LSTM Model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-dashed border-muted-foreground"></span>
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Baseline</span>
              </div>
            </div>
          </div>

          {/* Chart Placeholder (SVG) */}
          <div className="relative h-[400px] w-full border-l border-b border-border mt-8">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[...Array(5)].map((_, i) => <div key={i} className="h-[1px] w-full bg-black"></div>)}
            </div>
            <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Baseline */}
              <line x1="0" y1="100" x2="100" y2="0" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="2,2" />
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
            <div className="absolute top-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2 group">
              <div className="w-4 h-4 bg-primary rounded-full ring-8 ring-primary/10 cursor-pointer animate-pulse"></div>
              <GlassPanel className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 hidden group-hover:block w-40 p-4 rounded-3xl shadow-2xl bg-white/90 border-white">
                <div className="text-[10px] font-black text-primary uppercase mb-1">Threshold: 0.45</div>
                <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">TPR: 0.94 | FPR: 0.08</div>
              </GlassPanel>
            </div>

            {/* Chart Labels */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
              False Positive Rate (1 - Specificity)
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 -rotate-90 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
              True Positive Rate (Sensitivity)
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-muted/30 border border-border/10 rounded-[3rem] p-10 gap-8">
        <div className="flex items-center gap-8">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-muted bg-primary/20 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + i * 100}`}
                  alt="Scientist"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-muted bg-primary text-white flex items-center justify-center text-xs font-black shadow-sm">
              +4
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-primary uppercase italic tracking-tight">Peer Review Completed</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Reviewed by regional hydrological team 2 hours ago</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="px-10 py-7 rounded-2xl border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/5">
            <Download className="w-4 h-4 mr-3" /> Export Technical Report
          </Button>
          <Button className="px-10 py-7 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
            <RefreshCw className="w-4 h-4 mr-3" /> Initiate Re-training
          </Button>
        </div>
      </div>
    </div>
  );
}
