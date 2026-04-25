import { Button } from "@/components/ui/button"
import { LucideChevronRight, LucideDownload, LucidePlay, LucideSparkles, LucideCheckCircle2, LucideBarChart3, LucideTrendingUp, LucideInfo } from "lucide-react"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function PreprocessingPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Preprocessing" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
          <div className="flex gap-4">
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none font-black text-[10px] h-12 px-6 rounded-2xl uppercase tracking-widest transition-all">
              <LucideDownload className="size-4 mr-2" />
              Export Log
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-container text-white border-none font-black text-[10px] h-12 px-6 rounded-2xl uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <LucidePlay className="size-4 mr-2 fill-current" />
              Re-run SMOTE
            </Button>
          </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Explanation Card */}
          <div className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-[48px] p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="size-16 bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20 transition-transform group-hover:rotate-12 duration-500">
              <LucideSparkles className="size-8 text-white" />
            </div>
            <h4 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight">What is SMOTE?</h4>
            <div className="space-y-6">
                <p className="text-on-surface-variant leading-relaxed text-base font-medium opacity-80">
                    <strong className="text-primary font-black">Synthetic Minority Over-sampling Technique</strong> is a statistical technique for increasing the number of cases in your dataset in a balanced way. 
                </p>
                <p className="text-on-surface-variant leading-relaxed text-base font-medium opacity-80">
                    Instead of just duplicating existing samples, SMOTE generates <span className="italic">synthetic</span> examples by selecting similar records and interpolating between them.
                </p>
            </div>
            <div className="mt-10 p-6 bg-surface-container-lowest rounded-3xl flex items-start gap-5 border border-surface-container/50">
              <LucideCheckCircle2 className="size-6 text-secondary" />
              <div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Target Variable</p>
                <p className="text-sm font-black text-primary uppercase tracking-wider mt-1">Flood Risk Level (Binary)</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stats Cards */}
            <div className="bg-surface-container-lowest rounded-[48px] p-10 border border-surface-container/50 relative overflow-hidden group shadow-sm">
                <div className="absolute -right-8 -top-8 size-48 bg-error/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-40">Initial Row Count</p>
                <h5 className="text-5xl font-black text-primary tracking-tighter">14,208</h5>
                <div className="flex items-center gap-3 mt-6">
                    <span className="text-[10px] font-black px-4 py-1.5 bg-error-container text-on-error-container rounded-full uppercase tracking-widest">Imbalanced</span>
                    <span className="text-xs font-bold text-on-surface-variant/40">Ratio 4.1 : 1</span>
                </div>
            </div>
            <div className="bg-primary rounded-[48px] p-10 relative overflow-hidden group shadow-2xl shadow-primary/20">
                <div className="absolute -right-8 -top-8 size-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <p className="text-[10px] font-black text-primary-fixed uppercase tracking-[0.2em] mb-2 opacity-60">Balanced Row Count</p>
                <h5 className="text-5xl font-black text-white tracking-tighter">22,732</h5>
                <div className="flex items-center gap-3 mt-6">
                    <span className="text-[10px] font-black px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full uppercase tracking-widest">Optimal</span>
                    <span className="text-xs font-bold text-primary-fixed/60">Ratio 1 : 1</span>
                </div>
            </div>

            {/* Visual Comparison */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-container-lowest rounded-[48px] p-12 border border-surface-container/50 shadow-sm relative">
                {/* Visual Connector Desktop */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-12 bg-surface flex items-center justify-center rounded-full border border-surface-container shadow-xl z-10 hidden md:flex">
                    <LucideTrendingUp className="size-5 text-primary" />
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h6 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Original Data</h6>
                        <LucideBarChart3 className="size-5 text-on-surface-variant/20" />
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-tight text-on-surface-variant">
                                <span>Tidak Rawan</span>
                                <span className="text-primary">80% (11,366)</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                                <div className="bg-primary-container h-full w-[80%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-tight text-on-surface-variant">
                                <span>Rawan (Minority)</span>
                                <span className="text-tertiary">20% (2,842)</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                                <div className="bg-tertiary-container h-full w-[20%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed font-bold opacity-40 italic">
                        Current distribution creates bias towards negative predictions, potentially missing high-risk areas.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h6 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">After SMOTE</h6>
                        <LucideCheckCircle2 className="size-5 text-secondary" />
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-tight text-on-surface-variant">
                                <span>Tidak Rawan</span>
                                <span className="text-primary">50% (11,366)</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                                <div className="bg-primary h-full w-[50%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-tight text-on-surface-variant">
                                <span>Rawan (Synthetic)</span>
                                <span className="text-secondary">50% (11,366)</span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                                <div className="bg-secondary h-full w-[50%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed font-bold opacity-40 italic">
                        Minority class samples have been synthesized to match majority class volume.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="bg-surface-container rounded-[48px] p-12 border border-surface-container/50 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { label: "Neighbors", value: "K=5", sub: "Euclidean distance" },
                { label: "Sampling Strategy", value: "Auto", sub: "Resample to majority" },
                { label: "Random State", value: "42", sub: "Reproducible seed" },
                { label: "Execution Time", value: "1.24s", sub: "Compute efficient" },
            ].map((item, i) => (
                <div key={i} className="space-y-2">
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40">{item.label}</p>
                    <p className="text-2xl font-black text-primary">{item.value}</p>
                    <p className="text-[11px] font-bold text-on-surface-variant opacity-60">{item.sub}</p>
                </div>
            ))}
        </div>

        {/* Visualization of Synthetic Clusters */}
        <div className="bg-surface-container-lowest rounded-[48px] overflow-hidden p-12 border border-surface-container/50 shadow-sm space-y-8">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h4 className="text-2xl font-black text-primary uppercase tracking-tight">Feature Space Visualization</h4>
                    <p className="text-sm font-medium text-on-surface-variant opacity-60">PCA Projection of original vs synthetic data points</p>
                </div>
                <div className="flex gap-6 pb-2">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary-container"></span>
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Original</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-secondary"></span>
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Synthetic</span>
                    </div>
                </div>
            </div>
            <div className="h-80 bg-surface-container-low rounded-[40px] relative flex items-center justify-center overflow-hidden border border-surface-container">
                <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_WKM7O3C-4u5Ls9hoZLCFeH5cOmbRLxIouGqBQ3HZ4SMiO4teDi7IztCv1viWtuOiEp25AJfZQ6pmSBOmKV2vupXiuKq_xRD-2JVX4-qdq7sJ0vM4i2NENwqujIsnC0Oq8T2w1c-7C6qxUQKqL20qGp1TPv0xGeKI5-kQGUP2V7Npld9safWHXaPolRXWwzZIWZqiYMzS3KjdEX2nCBJ9cZarG10WJwE9ZaQ__zQm43k7o4BzASbhaOCsMCABJbpxtfxd8q2K56M" 
                    alt="Visualization" 
                    fill 
                    className="object-cover mix-blend-multiply opacity-60 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low/90 to-transparent"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-8 py-3 rounded-full flex items-center gap-3 shadow-xl">
                    <LucideInfo className="size-4 text-primary" />
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Synthesizing 8,524 new records via linear interpolation</p>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}
