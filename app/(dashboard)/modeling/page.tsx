"use client"

import {
  Settings2,
  Play,
  Terminal,
  Sparkles,
  BookOpen,
  BarChart4,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ModelingPage() {
  return (
    <div className="animate-in space-y-8 pb-12 duration-700 fade-in">
      <header className="mb-10">
        <h1 className="mb-2 text-4xl font-black tracking-tight text-primary italic">
          Model Configuration
        </h1>
        <p className="max-w-2xl font-medium text-muted-foreground">
          Refine extreme gradient boosting parameters to optimize flood
          prediction accuracy for the Aceh watershed region.
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Hyperparameter Form Card */}
        <section className="bg-card col-span-12 flex flex-col justify-between rounded-[3rem] border border-border/10 p-10 shadow-sm lg:col-span-5">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <Settings2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-black tracking-tight text-primary uppercase">
                Hyperparameters
              </h3>
            </div>

            <form className="space-y-8">
              <div className="space-y-3">
                <Label
                  htmlFor="learning-rate"
                  className="ml-1 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                >
                  Learning Rate
                </Label>
                <div className="relative">
                  <Input
                    id="learning-rate"
                    type="number"
                    defaultValue="0.1"
                    step="0.01"
                    className="rounded-2xl border-none bg-muted py-7 pr-12 pl-6 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 font-mono text-[10px] font-black text-primary/40 uppercase">
                    eta
                  </div>
                </div>
                <p className="ml-1 text-[10px] font-medium text-muted-foreground">
                  Step size shrinkage used in update to prevent overfitting.
                </p>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="max-depth"
                  className="ml-1 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                >
                  Max Depth
                </Label>
                <div className="relative">
                  <Input
                    id="max-depth"
                    type="number"
                    defaultValue="6"
                    className="rounded-2xl border-none bg-muted py-7 pr-12 pl-6 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 font-mono text-[10px] font-black text-primary/40 uppercase">
                    depth
                  </div>
                </div>
                <p className="ml-1 text-[10px] font-medium text-muted-foreground">
                  Maximum depth of a tree. Higher values may lead to
                  overfitting.
                </p>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="n-estimators"
                  className="ml-1 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                >
                  N_Estimators
                </Label>
                <div className="relative">
                  <Input
                    id="n-estimators"
                    type="number"
                    defaultValue="100"
                    className="rounded-2xl border-none bg-muted py-7 pr-12 pl-6 text-sm font-bold transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 font-mono text-[10px] font-black text-primary/40 uppercase">
                    trees
                  </div>
                </div>
                <p className="ml-1 text-[10px] font-medium text-muted-foreground">
                  Number of boosted trees to fit.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-12">
            <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-8 text-sm font-black tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
              <Play className="mr-3 h-5 w-5 fill-current" /> START TRAINING
              ENGINE
            </Button>
          </div>
        </section>

        {/* Console & Output Column */}
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-7">
          {/* Status & Metrics Cards */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-card flex flex-col justify-center rounded-[2.5rem] border-l-8 border-secondary p-8 shadow-sm">
              <p className="mb-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                Status
              </p>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.5)]"></div>
                <span className="text-xl font-black tracking-tight text-primary lowercase italic">
                  training active...
                </span>
              </div>
            </div>
            <div className="bg-card flex flex-col justify-center rounded-[2.5rem] border-l-8 border-primary p-8 shadow-sm">
              <p className="mb-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                Training Time
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black tracking-tighter text-primary">
                  1.2
                </span>
                <span className="mb-1 text-xs font-black text-muted-foreground uppercase">
                  seconds
                </span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <section className="relative flex min-h-[400px] flex-1 flex-col overflow-hidden rounded-[3rem] bg-slate-900 p-10 shadow-2xl">
            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-secondary" />
                <h3 className="text-xs font-black tracking-[0.3em] text-white uppercase">
                  Execution Log
                </h3>
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/40"></div>
                <div className="h-3 w-3 rounded-full bg-tertiary/40"></div>
                <div className="h-3 w-3 rounded-full bg-secondary/40"></div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-4 font-mono text-[11px] leading-relaxed text-white/70">
              <p className="font-bold text-secondary">
                [INFO] Initializing XGBoost environment...
              </p>
              <p className="text-white/60">
                [INFO] Loading GIS spatial dataset: aceh_watershed_v2.csv
              </p>
              <p className="text-white/60">[INFO] Dataset shape: (45290, 24)</p>
              <p className="text-white/60">
                [INFO] Performing 5-fold cross-validation...
              </p>
              <p className="text-tertiary italic">
                [WARN] Feature &apos;river_dist&apos; contains 2% missing
                values. Applying median imputation.
              </p>
              <p className="text-white/60">
                [INFO] Start Iteration 1: learning_rate=0.1, max_depth=6
              </p>
              <p className="text-white/60">[INFO] Iteration 1 Score: 0.9421</p>
              <p className="text-white/60">
                [INFO] Start Iteration 2: n_estimators=100
              </p>
              <p className="font-bold text-secondary">
                [SUCCESS] Training epoch 45/100 complete.
              </p>
              <p className="text-white/60">
                [INFO] Model convergence reached at 1.2s
              </p>
              <p className="inline-block border-b border-secondary/20 pb-1 font-black text-secondary">
                [INFO] Training status: FINISHED
              </p>
              <div className="-mb-1 ml-2 inline-block h-4 w-2 animate-pulse bg-secondary"></div>
            </div>

            {/* Decorative Background Map */}
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rotate-12 opacity-10">
              <img
                className="h-full w-full rounded-full object-cover mix-blend-screen"
                alt="Terrain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbVLJqQxDULkz8I2zqLGte3aijhT24jYyszLayf6OGAwH3BlvrpEtAFIsyzZB9jJZ9TJt5qpA24vjjZ4bnfZuCCKhaYG_vAefF-JQw6PhbuKjNSKYxF7vkAsnE2z79yKMsMpG8CfdnupIr3kH03MTf0h1o4RaLZTsbu1I6_Y83XngAI0EAF9wzwF3PmbsucmEm78xpFucsQK6w9CT4tSpDl2I_OJQvQKICf_wYocTj9UzlGzsjwzTJvE8kjDA3VCC09U1P2mTgGuI"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Featured Context Card */}
      <section className="flex min-h-[400px] flex-col items-stretch overflow-hidden rounded-[4rem] bg-primary text-white shadow-2xl md:flex-row">
        <div className="flex flex-1 flex-col justify-center p-12 md:p-16">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-secondary" />
            <span className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase">
              XGBoost Optimized
            </span>
          </div>
          <h2 className="mb-6 text-4xl leading-tight font-black tracking-tight uppercase italic">
            Enhanced Gradient Boosting for Flash Flood Detection
          </h2>
          <p className="mb-10 max-w-xl leading-relaxed font-medium text-white/70">
            Our implementation uses the Sentinel-2 spectral indices combined
            with local hydrological data. The XGBoost model specifically targets
            precision in high-risk zones around the Aceh river basin.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="rounded-xl border-white/20 px-10 py-6 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black"
            >
              <BookOpen className="mr-2 h-4 w-4" /> Documentation
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl px-10 py-6 text-[10px] font-black tracking-widest text-white uppercase hover:bg-white/10"
            >
              <BarChart4 className="mr-2 h-4 w-4" /> Model Metrics
            </Button>
          </div>
        </div>
        <div className="group relative w-full overflow-hidden md:w-2/5">
          <img
            className="h-full w-full object-cover contrast-[1.2] grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110"
            alt="Aceh River"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAmsmfsl_hcsL4gQfV95jH4vB1d76uIQxKt2qT8SMmvtD-CWrYjuj8CFVeEz7R-OGPIZIW3EoTS4-h5330NEDmHhpCX6AoggwwuWW0rMphcV6BdrRx-atR4GAX8VpIyOJT7S-s6vF5HmRalxy3HH-3AZQbkAgrULdi0ud0YmwvaoJ6_jj4wpPYg2TYD-ud1NJUlROZtbyhjlxRNIwdOXiwXpMB9rKNqW6TZaGrjzidp1LzIRFSdIuS72Jh8tYxPiMJSXPyFLrXL3Y"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/80"></div>
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        </div>
      </section>
    </div>
  )
}
