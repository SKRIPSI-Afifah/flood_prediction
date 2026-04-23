/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

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
} from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { StatusBadge } from "@/components/sentinel/StatusBadge"
import { useState, useEffect } from "react"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function DataManagementPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [dataRows, setDataRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && user?.role !== "admin") {
      router.push("/")
    }
  }, [user, authLoading, router])

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data")
      const data = await res.json()
      setDataRows(data)
    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = (id: number) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/data/${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        setDataRows(dataRows.filter((row) => row.id !== deleteId))
        setIsDeleteOpen(false)
        setDeleteId(null)
      }
    } catch (error) {
      console.error("Failed to delete", error)
    }
  }

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    kabupaten: "",
    curahHujan: "",
    elevasi: "",
    slope: "",
    lahan: "",
    status: "tidak-rawan",
  })

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kabupaten: formData.kabupaten,
          curahHujan: parseFloat(formData.curahHujan || "0"),
          elevasi: parseFloat(formData.elevasi || "0"),
          slope: parseFloat(formData.slope || "0"),
          lahan: parseFloat(formData.lahan || "0"),
          status: formData.status,
        }),
      })
      if (res.ok) {
        const newData = await res.json()
        setDataRows([...dataRows, newData])
        setIsAddOpen(false)
        setFormData({
          kabupaten: "",
          curahHujan: "",
          elevasi: "",
          slope: "",
          lahan: "",
          status: "tidak-rawan",
        })
      }
    } catch (error) {
      console.error("Failed to add data", error)
    }
  }

  if (authLoading || user?.role !== "admin") {
    return <div className="flex h-96 items-center justify-center font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Memeriksa Otoritas...</div>
  }

  return (
    <div className="animate-in space-y-8 duration-700 fade-in">
      {/* Page Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Repositori Dataset
          </span>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-primary">
            Manajemen Data
          </h2>
          <p className="mt-2 max-w-xl font-medium text-muted-foreground">
            Repositori terpusat untuk parameter pemantauan banjir historis dan real-time di wilayah Aceh. Kelola, audit, dan siapkan data untuk pemodelan prediktif.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-border bg-surface-container-high font-bold"
          >
            <FileUp className="mr-2 h-4 w-4" /> Impor CSV
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80 font-bold shadow-lg">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Data
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
                    <Label htmlFor="kabupaten" className="text-right">
                      Kabupaten
                    </Label>
                    <Input
                      id="kabupaten"
                      value={formData.kabupaten}
                      onChange={(e) =>
                        setFormData({ ...formData, kabupaten: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="curahHujan" className="text-right">
                      Curah Hujan
                    </Label>
                    <Input
                      id="curahHujan"
                      type="number"
                      step="any"
                      value={formData.curahHujan}
                      onChange={(e) =>
                        setFormData({ ...formData, curahHujan: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="elevasi" className="text-right">
                      Elevasi (m)
                    </Label>
                    <Input
                      id="elevasi"
                      type="number"
                      step="any"
                      value={formData.elevasi}
                      onChange={(e) =>
                        setFormData({ ...formData, elevasi: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slope" className="text-right">
                      Slope (%)
                    </Label>
                    <Input
                      id="slope"
                      type="number"
                      step="any"
                      value={formData.slope}
                      onChange={(e) =>
                        setFormData({ ...formData, slope: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lahan" className="text-right">
                      Lahan (%)
                    </Label>
                    <Input
                      id="lahan"
                      type="number"
                      step="any"
                      value={formData.lahan}
                      onChange={(e) =>
                        setFormData({ ...formData, lahan: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <div className="col-span-3">
                      <Select
                        value={formData.status}
                        onValueChange={(v) =>
                          setFormData({ ...formData, status: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rawan">Rawan</SelectItem>
                          <SelectItem value="tidak-rawan">
                            Tidak Rawan
                          </SelectItem>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="bg-card flex items-center gap-4 rounded-full border border-border/10 p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Total Baris
            </p>
            <p className="text-xl font-black text-primary">1,284</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 rounded-full bg-muted p-2 md:col-span-3">
          <div className="relative flex-1">
            <Filter className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="w-full border-none bg-transparent py-2 pr-4 pl-12 text-sm font-medium focus:ring-0"
              placeholder="Filter berdasarkan Kabupaten..."
            />
          </div>
          <div className="h-8 w-px bg-border/30"></div>
          <select className="cursor-pointer border-none bg-transparent pr-10 text-sm font-bold focus:ring-0">
            <option>Semua Status</option>
            <option>Rawan</option>
            <option>Tidak Rawan</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-card overflow-hidden rounded-[2rem] border border-border/50 shadow-sm">
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
                <TableCell className="px-8 font-bold">
                  {row.kabupaten}
                </TableCell>
                <TableCell className="text-center text-sm font-medium tabular-nums">
                  {row.curahHujan.toLocaleString()}
                </TableCell>
                <TableCell className="text-center text-sm font-medium tabular-nums">
                  {row.elevasi.toFixed(1)}
                </TableCell>
                <TableCell className="text-center text-sm font-medium tabular-nums">
                  {row.slope.toFixed(1)}
                </TableCell>
                <TableCell className="text-center text-sm font-medium tabular-nums">
                  {row.lahan.toFixed(1)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      row.status === "rawan" || row.status === "error"
                        ? "destructive"
                        : row.status === "secondary"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {row.status === "rawan" || row.status === "error"
                      ? "Rawan"
                      : row.status === "secondary"
                        ? "Safe"
                        : "Tidak Rawan"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 px-8 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmDelete(row.id)}
                    className="hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border/20 bg-muted/30 px-8 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">
            Showing 1 to 5 of 1,284 entries
          </p>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted"
            >
              <Left className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 rounded-lg bg-primary text-xs font-bold text-white"
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-xs font-bold"
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-xs font-bold"
            >
              3
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted"
            >
              <Right className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
