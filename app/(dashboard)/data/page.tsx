"use client";

import { 
  Database, 
  FileUp, 
  PlusCircle, 
  Filter, 
  Pencil, 
  Trash2, 
  ChevronLeft as Left, 
  ChevronRight as Right,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/sentinel/StatusBadge";

const dataRows = [
  { id: 1, kabupaten: "Aceh Besar", curahHujan: 2450.5, elevasi: 12.0, slope: 3.5, lahan: 65.2, status: "rawan" },
  { id: 2, kabupaten: "Banda Aceh", curahHujan: 1820.0, elevasi: 5.2, slope: 1.2, lahan: 88.4, status: "rawan" },
  { id: 3, kabupaten: "Pidie Jaya", curahHujan: 1250.2, elevasi: 45.0, slope: 12.8, lahan: 12.5, status: "tidak-rawan" },
  { id: 4, kabupaten: "Aceh Jaya", curahHujan: 2100.8, elevasi: 8.5, slope: 4.2, lahan: 25.3, status: "rawan" },
  { id: 5, kabupaten: "Gayo Lues", curahHujan: 1150.0, elevasi: 115.0, slope: 28.5, lahan: 4.8, status: "tidak-rawan" },
];

export default function DataManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">Dataset Repository</span>
          <h2 className="text-3xl font-black tracking-tight text-primary mt-1">Data Management</h2>
          <p className="text-muted-foreground font-medium mt-2 max-w-xl">
            Centralized repository for Aceh's historical and real-time flood monitoring parameters. Curate, audit, and prepare data for predictive modeling.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border bg-surface-container-high">
            <FileUp className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Button className="font-bold bg-gradient-to-r from-primary to-primary/80 shadow-lg">
            <PlusCircle className="w-4 h-4 mr-2" /> Tambah Data
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-full flex items-center gap-4 border border-border/10 shadow-sm">
          <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Baris</p>
            <p className="text-xl font-black text-primary">1,284</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-full flex items-center gap-4 border border-border/10 shadow-sm">
          <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center text-secondary">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Terverifikasi</p>
            <p className="text-xl font-black text-secondary">94%</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-muted p-2 rounded-full flex items-center gap-3">
           <div className="flex-1 relative">
             <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
             <input className="w-full bg-transparent border-none pl-12 pr-4 py-2 focus:ring-0 text-sm font-medium" placeholder="Filter berdasarkan Kabupaten..." />
           </div>
           <div className="h-8 w-px bg-border/30"></div>
           <select className="bg-transparent border-none text-sm font-bold pr-10 focus:ring-0 cursor-pointer">
              <option>Semua Status</option>
              <option>Rawan</option>
              <option>Tidak Rawan</option>
           </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card rounded-[2rem] overflow-hidden border border-border/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Kabupaten</th>
                <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Curah Hujan (mm)</th>
                <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Elevasi (m)</th>
                <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Slope (%)</th>
                <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Lahan (%)</th>
                <th className="px-6 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-center">Label</th>
                <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {dataRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-8 py-5 font-bold text-primary">{row.kabupaten}</td>
                  <td className="px-6 py-5 text-center font-medium tabular-nums text-sm">{row.curahHujan.toLocaleString()}</td>
                  <td className="px-6 py-5 text-center font-medium tabular-nums text-sm">{row.elevasi.toFixed(1)}</td>
                  <td className="px-6 py-5 text-center font-medium tabular-nums text-sm">{row.slope.toFixed(1)}</td>
                  <td className="px-6 py-5 text-center font-medium tabular-nums text-sm">{row.lahan.toFixed(1)}</td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={row.status as any} />
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-muted/30 flex justify-between items-center border-t border-border/20">
          <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Showing 1 to 5 of 1,284 entries</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-muted">
              <Left className="w-4 h-4" />
            </Button>
            <Button size="icon" className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs">1</Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-xs font-bold">2</Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-xs font-bold">3</Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-muted">
              <Right className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Auxiliary Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary/80 p-8 rounded-[3rem] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-3 italic">Automated Quality Audit</h3>
            <p className="text-white/80 text-sm max-w-md font-medium leading-relaxed">
              The system has identified 12 rows with potential outliers in the 'Elevasi' parameter. It is recommended to perform a verification check before running the prediction model.
            </p>
            <Button className="mt-8 bg-white text-primary font-black uppercase text-[10px] tracking-widest px-8 rounded-xl hover:bg-white/90">
              Review Outliers
            </Button>
          </div>
          <Shield className="absolute -bottom-8 -right-8 w-64 h-64 text-white/5 font-black group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
        </div>
        
        <div className="bg-surface-container p-8 rounded-[3rem] flex flex-col justify-between border border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight mb-2">Sync Status</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Real-time Connected</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Last synchronized with Aceh BMKG database: <br />
              <strong className="text-primary opacity-100">2 minutes ago</strong>
            </p>
          </div>
          <Button variant="outline" className="w-full mt-8 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-all">
            <RefreshCw className="w-4 h-4 mr-2" /> Manual Sync
          </Button>
        </div>
      </div>
    </div>
  );
}
