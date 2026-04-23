"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Shield, 
  Mail, 
  Calendar,
  Search,
  MoreVertical
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
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (!authLoading && user?.role !== "admin") {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newUser = await res.json();
        setUsers([newUser, ...users]);
        setIsAddOpen(false);
        setFormData({ full_name: "", email: "", role: "user" });
      }
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  if (authLoading || user?.role !== "admin") {
    return <div className="flex h-96 items-center justify-center font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Memeriksa Otoritas...</div>;
  }

  return (
    <div className="animate-in space-y-8 duration-700 fade-in">
      {/* Page Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Sistem Administrasi
          </span>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-primary">
            Manajemen Pengguna
          </h2>
          <p className="mt-2 max-w-xl font-medium text-muted-foreground">
            Kelola akses personel dan otorisasi peran dalam sistem FloodGuard Aceh.
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80 font-bold shadow-lg">
                <UserPlus className="mr-2 h-4 w-4" /> Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-primary">Tambah Pengguna Baru</DialogTitle>
                <DialogDescription className="font-medium">
                  Daftarkan personel baru ke dalam sistem.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nama Lengkap</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="rounded-xl bg-muted border-none"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Kerja</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl bg-muted border-none"
                    placeholder="nama@aceh.gov.id"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Peran (Role)</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(v) => setFormData({ ...formData, role: v })}
                  >
                    <SelectTrigger className="rounded-xl bg-muted border-none">
                      <SelectValue placeholder="Pilih peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="user">User / Analis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full rounded-xl bg-primary py-6 font-bold">Simpan Pengguna</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats & Search */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="bg-card flex items-center gap-4 rounded-[2rem] border border-border/10 p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Total Pengguna
            </p>
            <p className="text-xl font-black text-primary">{users.length}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 rounded-[2rem] bg-muted p-2 md:col-span-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full border-none bg-transparent py-2 pr-4 pl-12 text-sm font-medium focus:ring-0"
              placeholder="Cari berdasarkan nama atau email..."
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card overflow-hidden rounded-[2.5rem] border border-border/50 shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="px-8 py-6">Pengguna</TableHead>
              <TableHead className="text-center">Peran</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="px-8 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-medium italic">
                  Belum ada data pengguna.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs">
                        {u.full_name?.substring(0, 2) || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{u.full_name || "Tanpa Nama"}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Bergabung: {new Date(u.created_at || Date.now()).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={u.role === "admin" ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted"}
                    >
                      <Shield className="h-3 w-3 mr-1" /> {u.role === "admin" ? "ADMIN" : "USER"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-xs font-medium text-muted-foreground italic">
                    <div className="flex items-center justify-center gap-2">
                       <Mail className="h-3 w-3" /> {u.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[10px] font-black uppercase tracking-tighter text-green-600">Aktif</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 text-right">
                    <Button variant="ghost" size="icon" className="hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
