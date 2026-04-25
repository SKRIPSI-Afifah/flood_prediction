import { Button } from "@/components/ui/button"
import { LucideCheckCircle, LucideTarget, LucideHistory, LucideScale, LucideTrendingUp, LucideVerified, LucideDownload, LucideRefreshCcw, LucideAlertTriangle, LucideLightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function EvaluationPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Evaluasi Model" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">

        {/* Bento Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { label: "Akurasi", value: "94.2%", icon: LucideVerified, color: "border-primary", trend: "+2.4% from last epoch", trendColor: "text-secondary" },
                { label: "Presisi", value: "91.8%", icon: LucideTarget, color: "border-secondary", trend: "True Positive Rate consistency", trendColor: "text-on-surface-variant/40" },
                { label: "Recall", value: "89.5%", icon: LucideHistory, color: "border-tertiary", trend: "False Negative mitigation", trendColor: "text-on-surface-variant/40" },
                { label: "F1-Score", value: "90.6%", icon: LucideScale, color: "border-primary-container", trend: "Harmonic mean balance", trendColor: "text-on-surface-variant/40" },
            ].map((metric, i) => (
                <div key={i} className={`bg-surface-container-lowest p-8 rounded-[40px] border-l-8 ${metric.color} shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500 cursor-default group`}>
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{metric.label}</span>
                        <metric.icon className="size-5 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        <div className="text-5xl font-black text-primary tracking-tighter mt-6">{metric.value}</div>
                        <p className={`text-[11px] font-bold ${metric.trendColor} flex items-center gap-1.5 mt-4`}>
                            {metric.trend.includes("+") && <LucideTrendingUp className="size-3" />}
                            {metric.trend}
                        </p>
                    </div>
                </div>
            ))}
        </section>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Confusion Matrix */}
            <div className="lg:col-span-5 bg-surface-container-low rounded-[48px] p-10 relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-primary uppercase tracking-tight">Confusion Matrix</h3>
                        <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Model: Aceh-Sentinel-v4.2</p>
                    </div>
                    <Button variant="ghost" className="text-primary font-black text-[10px] uppercase tracking-widest hover:bg-white/50">Download CSV</Button>
                </div>
                
                {/* Visual Matrix */}
                <div className="grid grid-cols-[3rem_1fr_1fr] grid-rows-[3rem_1fr_1fr] gap-6 w-full max-w-[400px]">
                    <div />
                    <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 flex items-center justify-center">Predicted: Flood</div>
                    <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 flex items-center justify-center">Predicted: Safe</div>
                    <div className="flex items-center justify-center -rotate-90 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 whitespace-nowrap">Actual: Flood</div>
                    <div className="bg-primary text-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl shadow-primary/20 aspect-square group">
                        <span className="text-3xl font-black tracking-tighter group-hover:scale-110 transition-transform">4,821</span>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">True Positives</span>
                    </div>
                    <div className="bg-surface-container-lowest text-primary rounded-3xl p-8 flex flex-col items-center justify-center border-2 border-dashed border-primary/20 aspect-square">
                        <span className="text-3xl font-black tracking-tighter opacity-20">214</span>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-20 mt-1">False Negatives</span>
                    </div>
                    <div className="flex items-center justify-center -rotate-90 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 whitespace-nowrap">Actual: Safe</div>
                    <div className="bg-tertiary-container text-on-tertiary-container rounded-3xl p-8 flex flex-col items-center justify-center border-l-8 border-tertiary aspect-square">
                        <span className="text-3xl font-black tracking-tighter">156</span>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">False Positives</span>
                    </div>
                    <div className="bg-secondary text-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl shadow-secondary/20 aspect-square group">
                        <span className="text-3xl font-black tracking-tighter group-hover:scale-110 transition-transform">8,942</span>
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-60 mt-1">True Negatives</span>
                    </div>
                </div>

                <div className="mt-10 px-6 py-4 bg-white/50 backdrop-blur rounded-[24px] border border-white/50 flex items-start gap-4">
                    <LucideLightbulb className="size-5 text-secondary mt-1" />
                    <p className="text-[12px] font-bold text-on-surface-variant leading-relaxed italic">
                        The model shows exceptional specificity (Safe areas) but has a slight tendency for type-2 errors in mountainous flash-flood scenarios.
                    </p>
                </div>
            </div>

            {/* ROC Curve Chart Area */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-[48px] p-10 border border-surface-container/50 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-primary uppercase tracking-tight">ROC-AUC Characteristic</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">AUC = 0.978 (Class-A Performance)</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-3">
                            <span className="size-2 rounded-full bg-primary"></span>
                            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">XGBoost Model</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="size-2 rounded-full border border-dashed border-on-surface-variant/20"></span>
                            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Baseline</span>
                        </div>
                    </div>
                </div>

                {/* SVG Visual Chart */}
                <div className="flex-1 relative min-h-[400px] border-l-2 border-b-2 border-surface-container/50 mt-4 mb-10 ml-10">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0.5">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className="h-px w-full bg-surface-container brightness-95"></div>
                        ))}
                    </div>
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Baseline */}
                        <line x1="0" y1="100" x2="100" y2="0" stroke="#000" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.1" />
                        {/* ROC Curve Path */}
                        <path 
                            d="M 0 100 Q 5 10, 100 0" 
                            fill="none" 
                            stroke="var(--primary)" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                        />
                        {/* Area Fill */}
                        <path 
                            d="M 0 100 Q 5 10, 100 0 L 100 100 Z" 
                            fill="var(--primary)" 
                            className="opacity-[0.03]" 
                        />
                    </svg>
                    {/* Intersection Point */}
                    <div className="absolute top-[18%] left-[18%] size-4 bg-primary rounded-full ring-8 ring-primary/10 shadow-xl cursor-help group transition-transform hover:scale-125">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block w-40 bg-on-surface text-surface p-3 rounded-2xl shadow-2xl backdrop-blur-xl">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-white/40">Active Point</p>
                            <p className="text-xs font-black text-white">TPR: 0.94 | FPR: 0.08</p>
                        </div>
                    </div>

                    {/* Axis Labels */}
                    <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30">False Positive Rate (1 - Specificity)</p>
                    <p className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30 whitespace-nowrap">True Positive Rate (Sensitivity)</p>
                </div>
            </div>
        </div>

        {/* Bottom Actions */}
        <div className="bg-surface-container-high rounded-full p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-surface-container/50">
            <div className="flex items-center gap-6 px-4">
                <div className="flex -space-x-4">
                    {[
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCc57c6j7M2DCrewVhRwUl1Ixv6b-GwkTUdEbBESZ3-9Egw_VysxnGBn4KS4fyAYkONIpCJ0ZSXFbZStgBIlFWOtOc_CxZAznl6FL7Cvi0QvDn7v7BNJyYTAb_bsDWVLRyeQjnkmewJ4H94vL8FZu-eqmN2wVq6_x-gWeyixM26TtK5pTNGvBK8fB4p6pNw_wsO1EXmee4FijpKU8jlfKLRIY9LA2MPdasOaXPtwbsQp2qJ6Y0PKbM7wa8VeFmUOK9iqkfNcDQ1v2s",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4C0qUJX-1puYA6gix-pbfePPnfcI8fzUZJWjGmS2JelMVBcE6sbssMMBMiX_BB2naiiTfEoFOtq1Cu2kUbdHRg5om2b9zeZYgcthYz3L3pD_m7c7RvSlW9_uD8mTIxlo3aIlzdLAVp1ZlCBC7gSZVvRrQ2u8n5yqWv7Uzx3M-KlORaaW-pXX0Hy5yxoG8wXetPSewovaoIxVNcxGSOHLPPaAzR8G7BFneNguYMf8BiNrGATuGeG3XqWHs11dZcGWcPnycSlunvMU"
                    ].map((src, i) => (
                        <div key={i} className="size-11 rounded-full border-4 border-surface-container-high overflow-hidden shadow-sm">
                            <Image src={src} alt="Team" width={44} height={44} className="object-cover" />
                        </div>
                    ))}
                    <div className="size-11 rounded-full border-4 border-surface-container-high bg-primary-container text-on-primary-container flex items-center justify-center font-black text-xs shadow-sm">
                        +4
                    </div>
                </div>
                <p className="text-sm font-bold text-on-surface-variant/60">Reviewed by regional hydrological team 2 hours ago</p>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-primary font-black text-[10px] uppercase h-12 px-8 rounded-2xl tracking-[0.2em] hover:bg-white/50">
                    <LucideDownload className="size-4 mr-2" />
                    Export Technical Report
                </Button>
                <Button className="bg-gradient-to-r from-primary to-primary-container text-white border-none font-black text-[10px] h-12 px-10 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <span>Retrain model</span>
                    <LucideRefreshCcw className="size-4" />
                </Button>
            </div>
        </div>
      </main>
    </>
  )
}
