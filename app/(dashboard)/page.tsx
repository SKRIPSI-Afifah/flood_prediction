"use client";

import { 
  FolderDown, 
  BrainCircuit, 
  ClipboardCheck, 
  Download, 
  Zap,
  MoreVertical,
  TrendingUp,
  PieChart
} from "lucide-react";
import { MetricCard } from "@/components/sentinel/MetricCard";
import { StatusBadge } from "@/components/sentinel/StatusBadge";
import { GlassPanel } from "@/components/sentinel/GlassPanel";
import { Button } from "@/components/ui/button";

const latestAssessments = [
  {
    region: "Meulaboh Basin A-2",
    coordinates: "4.1481° N, 96.1283° E",
    confidence: "98.2%",
    status: "rawan",
    time: "10 mins ago",
  },
  {
    region: "Banda Aceh Coastal Zone",
    coordinates: "5.5483° N, 95.3238° E",
    confidence: "94.5%",
    status: "tidak-rawan",
    time: "24 mins ago",
  },
  {
    region: "Lhokseumawe North District",
    coordinates: "5.1801° N, 97.1507° E",
    confidence: "89.1%",
    status: "tidak-rawan",
    time: "1 hr ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-primary">
            Aceh Province Monitoring
          </h2>
          <p className="text-muted-foreground font-medium mt-1">
            Real-time risk assessment and Sentinel-2 satellite data analysis.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border bg-surface-container-high hover:bg-surface-variant">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button className="font-bold bg-gradient-to-r from-primary to-primary/80 shadow-lg">
            <Zap className="w-4 h-4 mr-2" /> Run Prediction
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Data"
          value="12,482"
          icon={FolderDown}
          trend={{ value: "+12%", isUp: true }}
          variant="primary"
        />
        <MetricCard
          title="Training Data"
          value="9,985"
          icon={BrainCircuit}
          subtitle="80/20 Split"
          variant="secondary"
        />
        <MetricCard
          title="Testing Data"
          value="2,497"
          icon={ClipboardCheck}
          subtitle="Validating..."
          variant="tertiary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Map Preview */}
        <div className="col-span-12 lg:col-span-8 bg-muted rounded-2xl overflow-hidden relative min-h-[450px] border border-border/50">
          <div className="absolute inset-0 z-0">
            <img
              alt="Aceh Map"
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6g1zxUFvGXXrbfHcZVfLC9pmRvmbyJWYCuQ9E2rKtV-VgWuHXRNuRvoY4MOgXxf3u6Y5avj_7uRpWUrrj7ph45tldicPQCS8F1sNQ-mN7dwLIX6r8Dpisx_vOG_k5XezhNS5AwGpTzf88_BpPoypy3of--GPZ1Pi26ZVpKyB29ipzNFI_alOSdOXTTW-atLActooAuH5FSJStL3NLyAcGkd9krWr1BkXB1f4TA__EnrVVkHf15vKcSwWg5sdfyaC_5gRZq6j6Qlo"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
          
          {/* Glassmorphism Map Controls */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            <GlassPanel className="p-2 gap-1 flex flex-col bg-white/50 border-white/40">
              <button className="p-2 rounded bg-white/50 hover:bg-white text-primary transition-colors">
                <span className="text-xl font-bold">+</span>
              </button>
              <button className="p-2 rounded bg-white/50 hover:bg-white text-primary transition-colors">
                <span className="text-xl font-bold">−</span>
              </button>
            </GlassPanel>
          </div>

          {/* Risk Overlay Legend */}
          <div className="absolute bottom-6 right-6 z-10">
            <GlassPanel className="p-4 max-w-[200px] bg-white/50 border-white/40">
              <h4 className="text-xs font-bold text-primary mb-3">Risk Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive"></span>
                  <span className="text-[10px] font-bold text-foreground">Extreme (Rawan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="text-[10px] font-bold text-foreground">Moderate Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-[10px] font-bold text-foreground">Safe (Tidak Rawan)</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Distribution Chart Card */}
        <div className="col-span-12 lg:col-span-4 bg-card p-6 rounded-2xl flex flex-col border border-border/50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-primary uppercase">Class Distribution</h3>
            <PieChart className="text-muted-foreground w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Simplified CSS Circle */}
                <div className="absolute inset-0 rounded-full border-[18px] border-secondary border-t-destructive rotate-45"></div>
                <div className="text-center z-10">
                  <span className="text-3xl font-black text-primary block leading-none">64%</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Safe Zones</span>
                </div>
            </div>
            <div className="w-full mt-8 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive"></span>
                    <span className="text-xs font-medium text-muted-foreground">Rawan (Risk)</span>
                  </div>
                  <span className="text-xs font-black text-primary">36%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: '36%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-xs font-medium text-muted-foreground">Tidak Rawan (Safe)</span>
                  </div>
                  <span className="text-xs font-black text-primary">64%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm">
        <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
          <h3 className="text-sm font-black text-primary uppercase tracking-wider">
            Latest Predictive Assessments
          </h3>
          <Button variant="ghost" className="text-xs font-bold text-primary px-0 hover:bg-transparent hover:underline">
            View All History
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Region Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Coordinates</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Confidence</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {latestAssessments.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-foreground">{row.region}</td>
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{row.coordinates}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">{row.confidence}</span>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: row.confidence }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={row.status as any} />
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{row.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
