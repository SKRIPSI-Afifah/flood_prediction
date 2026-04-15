"use client";

import { 
  Settings2, 
  Play, 
  Terminal, 


  Sparkles, 
  BookOpen, 
  BarChart4,


} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModelingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-primary mb-2 italic">Model Configuration</h1>
        <p className="text-muted-foreground font-medium max-w-2xl">
          Refine extreme gradient boosting parameters to optimize flood prediction accuracy for the Aceh watershed region.
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Hyperparameter Form Card */}
        <section className="col-span-12 lg:col-span-5 bg-card rounded-[3rem] p-10 shadow-sm border border-border/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Settings2 className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-black tracking-tight text-primary uppercase">Hyperparameters</h3>
            </div>
            
            <form className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="learning-rate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Learning Rate</Label>
                <div className="relative">
                  <Input
                    id="learning-rate"
                    type="number"
                    defaultValue="0.1"
                    step="0.01"
                    className="bg-muted border-none rounded-2xl py-7 pl-6 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black font-mono text-primary/40 uppercase">eta</div>
                </div>
                <p className="text-[10px] text-muted-foreground ml-1 font-medium">Step size shrinkage used in update to prevent overfitting.</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="max-depth" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Max Depth</Label>
                <div className="relative">
                  <Input
                    id="max-depth"
                    type="number"
                    defaultValue="6"
                    className="bg-muted border-none rounded-2xl py-7 pl-6 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black font-mono text-primary/40 uppercase">depth</div>
                </div>
                <p className="text-[10px] text-muted-foreground ml-1 font-medium">Maximum depth of a tree. Higher values may lead to overfitting.</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="n-estimators" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">N_Estimators</Label>
                <div className="relative">
                  <Input
                    id="n-estimators"
                    type="number"
                    defaultValue="100"
                    className="bg-muted border-none rounded-2xl py-7 pl-6 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black font-mono text-primary/40 uppercase">trees</div>
                </div>
                <p className="text-[10px] text-muted-foreground ml-1 font-medium">Number of boosted trees to fit.</p>
              </div>
            </form>
          </div>

          <div className="mt-12">
            <Button className="w-full py-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
              <Play className="w-5 h-5 mr-3 fill-current" /> START TRAINING ENGINE
            </Button>
          </div>
        </section>

        {/* Console & Output Column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          {/* Status & Metrics Cards */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-card rounded-[2.5rem] p-8 shadow-sm border-l-8 border-secondary flex flex-col justify-center">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(var(--secondary),0.5)]"></div>
                <span className="text-xl font-black text-primary italic lowercase tracking-tight">training active...</span>
              </div>
            </div>
            <div className="bg-card rounded-[2.5rem] p-8 shadow-sm border-l-8 border-primary flex flex-col justify-center">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Training Time</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-primary tracking-tighter">1.2</span>
                <span className="text-xs font-black text-muted-foreground uppercase mb-1">seconds</span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <section className="flex-1 bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-secondary" />
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Execution Log</h3>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/40"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary/40"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
              </div>
            </div>
            
            <div className="flex-1 font-mono text-[11px] leading-relaxed text-white/70 space-y-3 overflow-y-auto pr-4">
              <p className="text-secondary font-bold">[INFO] Initializing XGBoost environment...</p>
              <p className="text-white/60">[INFO] Loading GIS spatial dataset: aceh_watershed_v2.csv</p>
              <p className="text-white/60">[INFO] Dataset shape: (45290, 24)</p>
              <p className="text-white/60">[INFO] Performing 5-fold cross-validation...</p>
              <p className="text-tertiary italic">[WARN] Feature &apos;river_dist&apos; contains 2% missing values. Applying median imputation.</p>
              <p className="text-white/60">[INFO] Start Iteration 1: learning_rate=0.1, max_depth=6</p>
              <p className="text-white/60">[INFO] Iteration 1 Score: 0.9421</p>
              <p className="text-white/60">[INFO] Start Iteration 2: n_estimators=100</p>
              <p className="text-secondary font-bold">[SUCCESS] Training epoch 45/100 complete.</p>
              <p className="text-white/60">[INFO] Model convergence reached at 1.2s</p>
              <p className="text-secondary font-black border-b border-secondary/20 inline-block pb-1">[INFO] Training status: FINISHED</p>
              <div className="h-4 w-2 bg-secondary inline-block animate-pulse ml-2 -mb-1"></div>
            </div>

            {/* Decorative Background Map */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-10 pointer-events-none rotate-12">
               <img 
                 className="w-full h-full object-cover rounded-full mix-blend-screen"
                 alt="Terrain"
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbVLJqQxDULkz8I2zqLGte3aijhT24jYyszLayf6OGAwH3BlvrpEtAFIsyzZB9jJZ9TJt5qpA24vjjZ4bnfZuCCKhaYG_vAefF-JQw6PhbuKjNSKYxF7vkAsnE2z79yKMsMpG8CfdnupIr3kH03MTf0h1o4RaLZTsbu1I6_Y83XngAI0EAF9wzwF3PmbsucmEm78xpFucsQK6w9CT4tSpDl2I_OJQvQKICf_wYocTj9UzlGzsjwzTJvE8kjDA3VCC09U1P2mTgGuI"
               />
            </div>
          </section>
        </div>
      </div>

      {/* Featured Context Card */}
      <section className="bg-primary text-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch min-h-[400px]">
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">XGBoost Optimized</span>
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight tracking-tight uppercase italic">
            Enhanced Gradient Boosting for Flash Flood Detection
          </h2>
          <p className="text-white/70 font-medium max-w-xl mb-10 leading-relaxed">
            Our implementation uses the Sentinel-2 spectral indices combined with local hydrological data. The XGBoost model specifically targets precision in high-risk zones around the Aceh river basin.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="px-10 py-6 border-white/20 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
              <BookOpen className="w-4 h-4 mr-2" /> Documentation
            </Button>
            <Button variant="ghost" className="px-10 py-6 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10">
              <BarChart4 className="w-4 h-4 mr-2" /> Model Metrics
            </Button>
          </div>
        </div>
        <div className="w-full md:w-2/5 relative overflow-hidden group">
          <img 
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.2] group-hover:scale-110 transition-transform duration-1000"
            alt="Aceh River"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAmsmfsl_hcsL4gQfV95jH4vB1d76uIQxKt2qT8SMmvtD-CWrYjuj8CFVeEz7R-OGPIZIW3EoTS4-h5330NEDmHhpCX6AoggwwuWW0rMphcV6BdrRx-atR4GAX8VpIyOJT7S-s6vF5HmRalxy3HH-3AZQbkAgrULdi0ud0YmwvaoJ6_jj4wpPYg2TYD-ud1NJUlROZtbyhjlxRNIwdOXiwXpMB9rKNqW6TZaGrjzidp1LzIRFSdIuS72Jh8tYxPiMJSXPyFLrXL3Y"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/80"></div>
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        </div>
      </section>
    </div>
  );
}
