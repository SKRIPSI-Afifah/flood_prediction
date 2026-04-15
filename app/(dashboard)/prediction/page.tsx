"use client";

import { 
  Database, 

  Target, 
  MapPin, 
  Maximize2, 
  History, 

  RefreshCw,
  Droplets,
  Mountain,
  LandPlot,
  Home,

  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { GlassPanel } from "@/components/sentinel/GlassPanel";
import { useState } from "react";

export default function PredictionPage() {

  const [formData, setFormData] = useState({ rain: '', tide: '', soil: '', region: 'Banda Aceh' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-primary tracking-tight mb-2 uppercase italic">Analisis Risiko Banjir</h1>
        <p className="text-muted-foreground font-medium max-w-2xl">
          Masukkan parameter geografis dan meteorologis terkini untuk memprediksi tingkat kerawanan banjir di wilayah Aceh menggunakan model Sentinel GIS.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Card */}
        <div className="lg:col-span-7 bg-card rounded-[3rem] shadow-sm overflow-hidden flex flex-col border border-border/10">
          <div className="bg-muted px-8 py-5 flex items-center justify-between border-b border-border/10">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <span className="font-black text-primary uppercase tracking-[0.2em] text-[10px]">Parameter Input</span>
            </div>
            <Badge variant="secondary" className="text-[10px] font-black tracking-widest">DATA AKTUAL</Badge>
          </div>
          

          <form className="p-10 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Droplets className="w-3 h-3" /> Curah Hujan (mm)
                </Label>
                <Input
                  className="w-full bg-muted border-none rounded-2xl py-7 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Contoh: 125"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Mountain className="w-3 h-3" /> Elevasi (m)
                </Label>
                <Input
                  className="w-full bg-muted border-none rounded-2xl py-7 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Contoh: 15.5"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <LandPlot className="w-3 h-3" /> Slope (%)
                </Label>
                <Input
                  className="w-full bg-muted border-none rounded-2xl py-7 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Contoh: 5.2"
                  type="number"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Home className="w-3 h-3" /> Lahan Terbangun (%)
                </Label>
                <Input
                  className="w-full bg-muted border-none rounded-2xl py-7 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Contoh: 40"
                  type="number"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full py-8 bg-gradient-to-r from-primary to-primary/80 text-white font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all group">
                <span className="uppercase tracking-widest text-sm italic">Prediksi Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </form>
          {result && (
            <div className="p-8 bg-muted border-t border-border/10">
              <h3 className="text-xl font-bold mb-4">Hasil Prediksi Terbaru</h3>
              <div className="flex gap-4 items-center">
                 <div className={`w-4 h-4 rounded-full ${result.statusVariant === 'error' ? 'bg-destructive' : result.statusVariant === 'secondary' ? 'bg-secondary' : result.statusVariant === 'tertiary' ? 'bg-tertiary' : 'bg-primary'} animate-pulse`}></div>
                 <span className="text-lg font-black uppercase">{result.status}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Log ID: {result.id} | Timestamp: {result.date} {result.time}</p>
            </div>
          )}

        </div>

        {/* Result & Visualization */}
        <div className="lg:col-span-5 space-y-8">
          {/* Result Display Card */}
          <div className="bg-card rounded-[3rem] shadow-sm border border-border/10 overflow-hidden group">
          <div className="bg-muted px-8 py-5 flex items-center justify-between border-b border-border/10">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-black text-primary uppercase tracking-[0.2em] text-[10px]">Hasil Prediksi</span>
              </div>
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <div className="mb-8 relative">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 w-32 bg-destructive/10 blur-3xl rounded-full mx-auto"></div>
                <div className="relative flex flex-col items-center">
                  <span className="text-6xl font-black tracking-tighter text-destructive uppercase italic leading-none mb-3">RAWAN</span>
                  <div className="h-1.5 w-24 bg-destructive rounded-full mb-6"></div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-black uppercase tracking-widest italic">Potensi Banjir Tinggi</span>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="w-full space-y-4 pt-10 border-t border-muted">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Confidence Probability</span>
                  <span className="text-xl font-black text-primary tracking-tighter">89.4%</span>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden p-1 border border-border/20">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(var(--primary),0.3)]" style={{ width: '89.4%' }}></div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic mt-4">
                  &quot;Analisis dilakukan berdasarkan data historis curah hujan dan kemiringan lereng spesifik regional Aceh.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Geographic Context Card */}
          <div className="relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl group border-[8px] border-white">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              alt="Aceh Map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-8g4wykKmGnO6--ilCS5TLBBdjCFlfJdZXkp09o9yfQ357vQmxcGijFDNqXtiDZsRW5CtLtG8EFn-3H1czRpc_7dDRx8NmqX8xPo6FQM503YLRbi8VMUtp3-ULg8mYSXc5GvGms2kVDuiZn5wKafXkwTIEEzJF8nUYrFpigwgsEW0x-rYEn7pKN57Gl4I_jlThoZcGBUYoDJe79HrKt163DLh0AEw-LZKhAU4maT19nhcjebXFShTu-nT5u72kamCN3hP3ya-9pw" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
               <GlassPanel className="p-5 pr-8 rounded-full flex items-center justify-between bg-white/40 border-white/40 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1">Visualisasi Geografis</p>
                      <p className="text-sm font-black text-primary uppercase italic leading-none">Kabupaten Aceh Besar</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-primary hover:bg-white/20">
                    <Maximize2 className="w-5 h-5" />
                  </Button>
               </GlassPanel>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Context Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: History, label: "Data Historis", text: "Mencakup 10 tahun data curah hujan ekstrem.", variant: "secondary" },
          { icon: Target, label: "Akurasi Model", text: "Model Random Forest dengan F1-Score 0.94.", variant: "primary" },
          { icon: RefreshCw, label: "Pembaruan Real-time", text: "Sinkronisasi setiap 15 menit dengan BMKG.", variant: "tertiary" },
        ].map((item, idx) => (
          <div key={idx} className="bg-muted/40 p-8 rounded-[2.5rem] flex items-center gap-6 border border-border/10 hover:bg-card transition-all group">
            <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform ${
              item.variant === 'primary' ? 'bg-primary/10 text-primary' :
              item.variant === 'secondary' ? 'bg-secondary/10 text-secondary' :
              'bg-tertiary/10 text-tertiary'
            }`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-primary text-sm uppercase tracking-widest italic">{item.label}</h4>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
