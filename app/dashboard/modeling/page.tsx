import { Button } from "@/components/ui/button"
import { LucideSettings2, LucidePlay, LucideTerminal, LucideCheckCircle, LucideHistory, LucideZap, LucideBookOpen, LucideBarChart4 } from "lucide-react"
import Image from "next/image"

import { DashboardHeader } from "@/components/dashboard-header"

export default function ModelingPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Modeling" }
        ]} 
      />
      <main className="flex-1 p-8 lg:p-10 space-y-10 max-w-[1600px] mx-auto w-full">

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Hyperparameter Form Card */}
          <section className="md:col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-xl p-10 shadow-sm border border-surface-container/50 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="size-12 bg-primary/5 rounded-md flex items-center justify-center text-primary">
                <LucideSettings2 className="size-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-primary uppercase">Hyperparameters</h3>
            </div>
            <form className="space-y-8 flex-1">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="learning-rate">Learning Rate</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="learning-rate" step="0.01" type="number" defaultValue="0.1"/>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest group-focus-within:text-primary transition-colors">eta</div>
                </div>
                <p className="text-[11px] font-bold text-on-surface-variant/40 italic">Step size shrinkage used in update to prevents overfitting.</p>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="max-depth">Max Depth</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="max-depth" type="number" defaultValue="6"/>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest group-focus-within:text-primary transition-colors">depth</div>
                </div>
                <p className="text-[11px] font-bold text-on-surface-variant/40 italic">Maximum depth of a tree. Higher values may lead to overfitting.</p>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60" htmlFor="n-estimators">n_estimators</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border-none rounded-md px-6 py-4 text-primary font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="n-estimators" type="number" defaultValue="100"/>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest group-focus-within:text-primary transition-colors">trees</div>
                </div>
                <p className="text-[11px] font-bold text-on-surface-variant/40 italic">Number of boosted trees to fit.</p>
              </div>
              <div className="pt-6">
                <Button className="w-full bg-primary hover:opacity-90 text-white h-12 rounded-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs border-none" type="button">
                  <LucidePlay className="size-5 fill-current" />
                  Train XGBoost Model
                </Button>
              </div>
            </form>
          </section>

          {/* Console & Output Column */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-8">
            {/* Status & Metrics Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border-l-8 border-secondary flex flex-col justify-between">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Execution Status</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-3 w-3 rounded-full bg-secondary animate-pulse shadow-lg shadow-secondary/50"></div>
                  <span className="text-xl font-black text-primary uppercase tracking-tight">Training Active...</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border-l-8 border-primary-container flex flex-col justify-between">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Elapsed Time</p>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-3xl font-black text-primary tracking-tighter">1.2</span>
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-1.5">seconds</span>
                </div>
              </div>
            </div>

            {/* Console Output */}
            <section className="flex-1 bg-on-surface rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-container-lowest/10">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-secondary/10 rounded-md flex items-center justify-center">
                    <LucideTerminal className="size-4 text-secondary" />
                  </div>
                  <h3 className="text-[10px] font-black text-surface-container-lowest/40 uppercase tracking-[0.2em]">Execution Log</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/40 shadow-inner"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim/40 shadow-inner"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed/40 shadow-inner"></div>
                </div>
              </div>
              <div className="flex-1 font-mono text-[11px] leading-relaxed text-surface-container-lowest/60 space-y-3 overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-secondary-fixed font-bold">[INFO] Initializing XGBoost environment...</p>
                <p>[INFO] Loading GIS spatial dataset: aceh_watershed_v2.csv</p>
                <p>[INFO] Dataset shape: (45290, 24)</p>
                <p>[INFO] Performing 5-fold cross-validation...</p>
                <p className="text-tertiary-fixed-dim">[WARN] Feature &apos;river_dist&apos; contains 2% missing values. Applying median imputation.</p>
                <p>[INFO] Start Iteration 1: learning_rate=0.1, max_depth=6</p>
                <p>[INFO] Iteration 1 Score: 0.9421</p>
                <p>[INFO] Start Iteration 2: n_estimators=100</p>
                <p className="text-secondary-fixed font-bold">[SUCCESS] Training epoch 45/100 complete.</p>
                <p>[INFO] Model convergence reached at 1.2s</p>
                <p className="text-secondary-fixed font-black uppercase tracking-widest">[STATUS] FINISHED</p>
                <div className="h-4 w-1.5 bg-secondary animate-pulse inline-block ml-1"></div>
              </div>
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 size-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            </section>
          </div>

          {/* Featured Full-Width Section */}
          <section className="col-span-12 bg-primary text-white rounded-xl overflow-hidden shadow-2xl shadow-primary/20 flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 p-12 lg:p-16 space-y-8 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-white/10 rounded-md flex items-center justify-center">
                    <LucideZap className="size-5 text-secondary-fixed" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-fixed/60">XGBoost Optimized</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-[0.95] uppercase">
                Enhanced Gradient Boosting <br/>
                <span className="text-primary-fixed">for Flash Flood Detection</span>
              </h2>
              <p className="text-primary-fixed/60 max-w-xl text-base font-medium leading-relaxed">
                Our implementation uses the Sentinel-2 spectral indices combined with local hydrological data. The XGBoost model specifically targets precision in high-risk zones around the Aceh river basin.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-white text-primary hover:bg-white/90 border-none font-black text-[10px] h-12 px-10 rounded-md uppercase tracking-widest transition-all">
                  <LucideBookOpen className="size-4 mr-2" />
                  Documentation
                </Button>
                <Button className="bg-transparent text-white border border-white/20 hover:bg-white/10 font-black text-[10px] h-12 px-10 rounded-md uppercase tracking-widest transition-all">
                  <LucideBarChart4 className="size-4 mr-2" />
                  Model Metrics
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-[40%] h-80 lg:h-auto relative group">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAmsmfsl_hcsL4gQfV95jH4vB1d76uIQxKt2qT8SMmvtD-CWrYjuj8CFVeEz7R-OGPIZIW3EoTS4-h5330NEDmHhpCX6AoggwwuWW0rMphcV6BdrRx-atR4GAX8VpIyOJT7S-s6vF5HmRalxy3HH-3AZQbkAgrULdi0ud0YmwvaoJ6_jj4wpPYg2TYD-ud1NJUlROZtbyhjlxRNIwdOXiwXpMB9rKNqW6TZaGrjzidp1LzIRFSdIuS72Jh8tYxPiMJSXPyFLrXL3Y" 
                alt="Aceh River" 
                fill 
                className="object-cover grayscale-[0.2] transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent"></div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
