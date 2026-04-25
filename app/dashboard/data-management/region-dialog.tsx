"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

const regionSchema = z.object({
  kabupaten: z.string().min(2, "Nama kabupaten minimal 2 karakter"),
  curahHujan: z.number().min(0, "Harus lebih besar atau sama dengan 0"),
  elevasi: z.number().min(0, "Harus lebih besar atau sama dengan 0"),
  slope: z.number().min(0, "Harus lebih besar atau sama dengan 0"),
  lahan: z.number().min(0, "Harus lebih besar atau sama dengan 0"),
  status: z.enum(["rawan", "tidak-rawan"]),
})

type RegionFormValues = z.infer<typeof regionSchema>

interface RegionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  region?: any
}

export function RegionDialog({ isOpen, onClose, onSuccess, region }: RegionDialogProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<RegionFormValues>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      kabupaten: "",
      curahHujan: 0,
      elevasi: 0,
      slope: 0,
      lahan: 0,
      status: "tidak-rawan",
    }
  })

  useEffect(() => {
    if (region) {
      reset({
        kabupaten: region.kabupaten || "",
        curahHujan: region.curahHujan || 0,
        elevasi: region.elevasi || 0,
        slope: region.slope || 0,
        lahan: region.lahan || 0,
        status: region.status || "tidak-rawan",
      })
    } else {
      reset({
        kabupaten: "",
        curahHujan: 0,
        elevasi: 0,
        slope: 0,
        lahan: 0,
        status: "tidak-rawan",
      })
    }
  }, [region, reset])

  const onSubmit = async (data: RegionFormValues) => {
    setLoading(true)
    try {
      if (region) {
        const { error } = await supabase
          .from("regions")
          .update(data)
          .eq("id", region.id)
        if (error) throw error
        toast.success("Data kabupaten berhasil diperbarui")
      } else {
        const { error } = await supabase
          .from("regions")
          .insert([data])
        if (error) throw error
        toast.success("Data kabupaten berhasil ditambahkan")
      }
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const statusValue = watch("status")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border border-surface-container shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-primary uppercase tracking-tight">
            {region ? "Edit Data Wilayah" : "Tambah Data Wilayah Baru"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="kabupaten" className="text-[10px] font-black uppercase tracking-widest opacity-60">Nama Kabupaten</Label>
            <Input 
              id="kabupaten" 
              {...register("kabupaten")} 
              className="bg-white border border-surface-container h-12 font-bold"
              placeholder="Contoh: Aceh Besar"
            />
            {errors.kabupaten && <p className="text-[10px] text-error font-bold">{errors.kabupaten.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="curahHujan" className="text-[10px] font-black uppercase tracking-widest opacity-60">Curah Hujan (mm)</Label>
              <Input 
                id="curahHujan" 
                type="number"
                step="any"
                {...register("curahHujan", { valueAsNumber: true })} 
                className="bg-white border border-surface-container h-12 font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="elevasi" className="text-[10px] font-black uppercase tracking-widest opacity-60">Elevasi (m)</Label>
              <Input 
                id="elevasi" 
                type="number"
                step="any"
                {...register("elevasi", { valueAsNumber: true })} 
                className="bg-white border border-surface-container h-12 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="slope" className="text-[10px] font-black uppercase tracking-widest opacity-60">Slope (%)</Label>
              <Input 
                id="slope" 
                type="number"
                step="any"
                {...register("slope", { valueAsNumber: true })} 
                className="bg-white border border-surface-container h-12 font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lahan" className="text-[10px] font-black uppercase tracking-widest opacity-60">Lahan Terbangun (%)</Label>
              <Input 
                id="lahan" 
                type="number"
                step="any"
                {...register("lahan", { valueAsNumber: true })} 
                className="bg-white border border-surface-container h-12 font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest opacity-60">Label Kerawanan</Label>
            <Select 
              value={statusValue} 
              onValueChange={(val) => setValue("status", val as any)}
            >
              <SelectTrigger className="bg-white border border-surface-container h-12 font-bold text-primary">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-surface-container text-primary shadow-xl">
                <SelectItem value="rawan" className="font-bold focus:bg-primary/10 uppercase tracking-tighter">Rawan</SelectItem>
                <SelectItem value="tidak-rawan" className="font-bold focus:bg-primary/10 uppercase tracking-tighter">Tidak Rawan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-6">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="uppercase text-[10px] font-black tracking-widest h-12 px-6"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:opacity-90 text-white border-none text-[10px] font-black h-12 px-10 uppercase tracking-widest rounded-sm shadow-lg transition-all"
            >
              {loading ? "Menyimpan..." : region ? "Simpan Perubahan" : "Tambah Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
