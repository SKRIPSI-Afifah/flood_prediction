"use client"

import { useState, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
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

const userSchema = z.object({
  full_name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.enum(["admin", "user"]),
  email: z.string().email("Email tidak valid").optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
})

type UserFormValues = z.infer<typeof userSchema>
type EditableUser = {
  id: string
  full_name?: string | null
  role?: string | null
}

async function readResponseBody(response: Response) {
  const text = await response.text()
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

interface UserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  user?: EditableUser
}

export function UserDialog({ isOpen, onClose, onSuccess, user }: UserDialogProps) {
  const [loading, setLoading] = useState(false)
  const isEditing = Boolean(user)

  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: "",
      role: "user",
      email: "",
      password: "",
    }
  })

  useEffect(() => {
    if (user) {
      const normalizedRole = user.role === "admin" ? "admin" : "user"
      reset({
        full_name: user.full_name || "",
        role: normalizedRole,
        email: "",
        password: "",
      })
    } else {
      reset({
        full_name: "",
        role: "user",
        email: "",
        password: "",
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true)
    try {
      const payload = {
        id: user?.id,
        full_name: data.full_name,
        role: data.role,
        email: data.email?.trim(),
        password: data.password,
      }

      const response = await fetch("/api/admin/users", {
        method: user ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await readResponseBody(response)

      if (!response.ok) {
        throw new Error((result as { error?: string } | null)?.error || "Terjadi kesalahan")
      }

      if (user) {
        toast.success("Pengguna berhasil diperbarui")
      } else {
        toast.success("Pengguna baru berhasil ditambahkan")
      }
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const roleValue = useWatch({ control, name: "role" })

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
            <Label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest opacity-60">Role</Label>
            <Select 
              value={roleValue} 
              onValueChange={(val) => setValue("role", val as "admin" | "user")}
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
          {!isEditing && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-60">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  {...register("email")} 
                  className="bg-white border border-surface-container h-12 font-bold placeholder:opacity-30"
                  placeholder="nama@domain.com"
                />
                {errors.email && <p className="text-[10px] text-error font-bold">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest opacity-60">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  {...register("password")} 
                  className="bg-white border border-surface-container h-12 font-bold placeholder:opacity-30"
                  placeholder="Minimal 6 karakter"
                />
                {errors.password && <p className="text-[10px] text-error font-bold">{errors.password.message}</p>}
              </div>
            </>
          )}
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
