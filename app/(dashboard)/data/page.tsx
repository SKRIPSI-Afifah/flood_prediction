/* eslint-disable @typescript-eslint/no-explicit-any */
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StatusBadge } from "@/components/sentinel/StatusBadge";
import { useState, useEffect } from "react";

export default function DataManagementPage() {
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setDataRows(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/data/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setDataRows(dataRows.filter(row => row.id !== deleteId));
        setIsDeleteOpen(false);
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };


  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    kabupaten: '',
    curahHujan: '',
    elevasi: '',
    slope: '',
    lahan: '',
    status: 'tidak-rawan'
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            kabupaten: formData.kabupaten,
            curahHujan: parseFloat(formData.curahHujan || "0"),
            elevasi: parseFloat(formData.elevasi || "0"),
            slope: parseFloat(formData.slope || "0"),
            lahan: parseFloat(formData.lahan || "0"),
            status: formData.status
        })
      });
      if (res.ok) {
        const newData = await res.json();
        setDataRows([...dataRows, newData]);
        setIsAddOpen(false);
        setFormData({ kabupaten: '', curahHujan: '', elevasi: '', slope: '', lahan: '', status: 'tidak-rawan' });
      }
    } catch (error) {
      console.error("Failed to add data", error);
    }
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">Dataset Repository</span>
          <h2 className="text-3xl font-black tracking-tight text-primary mt-1">Data Management</h2>
          <p className="text-muted-foreground font-medium mt-2 max-w-xl">
            Centralized repository for Aceh&apos;s historical and real-time flood monitoring parameters. Curate, audit, and prepare data for predictive modeling.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-border bg-surface-container-high">
            <FileUp className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="font-bold bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                <PlusCircle className="w-4 h-4 mr-2" /> Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Data Baru</DialogTitle>
                <DialogDescription>
                  Masukkan parameter data historis wilayah baru.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="kabupaten" className="text-right">Kabupaten</Label>
                    <Input id="kabupaten" value={formData.kabupaten} onChange={(e) => setFormData({...formData, kabupaten: e.target.value})} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="curahHujan" className="text-right">Curah Hujan</Label>
                    <Input id="curahHujan" type="number" step="any" value={formData.curahHujan} onChange={(e) => setFormData({...formData, curahHujan: e.target.value})} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="elevasi" className="text-right">Elevasi (m)</Label>
                    <Input id="elevasi" type="number" step="any" value={formData.elevasi} onChange={(e) => setFormData({...formData, elevasi: e.target.value})} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slope" className="text-right">Slope (%)</Label>
                    <Input id="slope" type="number" step="any" value={formData.slope} onChange={(e) => setFormData({...formData, slope: e.target.value})} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lahan" className="text-right">Lahan (%)</Label>
                    <Input id="lahan" type="number" step="any" value={formData.lahan} onChange={(e) => setFormData({...formData, lahan: e.target.value})} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <div className="col-span-3">
                        <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rawan">Rawan</SelectItem>
                            <SelectItem value="tidak-rawan">Tidak Rawan</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan Data</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-8">Kabupaten</TableHead>
              <TableHead className="text-center">Curah Hujan (mm)</TableHead>
              <TableHead className="text-center">Elevasi (m)</TableHead>
              <TableHead className="text-center">Slope (%)</TableHead>
              <TableHead className="text-center">Lahan (%)</TableHead>
              <TableHead className="text-center">Label</TableHead>
              <TableHead className="px-8 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="px-8 font-bold">{row.kabupaten}</TableCell>
                <TableCell className="text-center font-medium tabular-nums text-sm">{row.curahHujan.toLocaleString()}</TableCell>
                <TableCell className="text-center font-medium tabular-nums text-sm">{row.elevasi.toFixed(1)}</TableCell>
                <TableCell className="text-center font-medium tabular-nums text-sm">{row.slope.toFixed(1)}</TableCell>
                <TableCell className="text-center font-medium tabular-nums text-sm">{row.lahan.toFixed(1)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={row.status === 'rawan' || row.status === 'error' ? 'destructive' : row.status === 'secondary' ? 'secondary' : 'outline'}>
                    {row.status === 'rawan' || row.status === 'error' ? 'Rawan' : row.status === 'secondary' ? 'Safe' : 'Tidak Rawan'}
                  </Badge>
                </TableCell>
                <TableCell className="px-8 text-right space-x-2">
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => confirmDelete(row.id)} className="hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        
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
              The system has identified 12 rows with potential outliers in the &apos;Elevasi&apos; parameter. It is recommended to perform a verification check before running the prediction model.
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

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
