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

const userSchema = z.object({
  full_name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["admin", "user"]),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  user?: any // If editing
}

export function UserDialog({ isOpen, onClose, onSuccess, user }: UserDialogProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: "",
      email: "",
      role: "user",
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || "",
        email: user.email || "",
        role: user.role || "user",
      })
    } else {
      reset({
        full_name: "",
        email: "",
        role: "user",
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true)
    try {
      if (user) {
        // Update
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: data.full_name,
            role: data.role,
            // email is usually not updatable if linked to auth.users, 
            // but we'll try for simplicity in this management page
            email: data.email 
          })
          .eq("id", user.id)

        if (error) throw error
        toast.success("Pengguna berhasil diperbarui")
      } else {
        // Add
        // Note: This won't create an auth user, just a profile.
        // In a real app, you'd use a server action with admin privileges.
        const { error } = await supabase
          .from("profiles")
          .insert([{
            id: crypto.randomUUID(), // Stub for now if no auth.users link
            full_name: data.full_name,
            email: data.email,
            role: data.role,
            created_at: new Date().toISOString()
          }])

        if (error) throw error
        toast.success("Pengguna berhasil ditambahkan")
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

  const roleValue = watch("role")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-surface-container shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-primary uppercase tracking-tight">
            {user ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-widest opacity-60">Nama Lengkap</Label>
            <Input 
              id="full_name" 
              {...register("full_name")} 
              className="bg-white border border-surface-container h-12 font-bold placeholder:opacity-30"
              placeholder="Masukkan nama lengkap..."
            />
            {errors.full_name && <p className="text-[10px] text-error font-bold">{errors.full_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-60">Email</Label>
            <Input 
              id="email" 
              {...register("email")} 
              disabled={!!user}
              className="bg-surface-container-high border-none h-12 font-bold placeholder:opacity-30 disabled:opacity-50"
              placeholder="nama@contoh.com"
            />
            {errors.email && <p className="text-[10px] text-error font-bold">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest opacity-60">Role</Label>
            <Select 
              value={roleValue} 
              onValueChange={(val) => setValue("role", val as any)}
            >
              <SelectTrigger className="bg-white border border-surface-container h-12 font-bold text-primary">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-surface-container text-primary shadow-xl">
                <SelectItem value="user" className="font-bold focus:bg-primary/10">User</SelectItem>
                <SelectItem value="admin" className="font-bold focus:bg-primary/10">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-[10px] text-error font-bold">{errors.role.message}</p>}
          </div>
          <DialogFooter className="pt-4">
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
              {loading ? "Menyimpan..." : user ? "Simpan Perubahan" : "Tambah Pengguna"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
