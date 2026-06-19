"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage } from "@/components/dashboard-page"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LucideUserPlus,
  LucideEdit3,
  LucideTrash2,
  LucideShield,
  LucideClock,
  LucideSearch,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { UserDialog } from "./user-dialog"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

type ProfileRow = {
  id: string
  full_name: string | null
  role: string | null
  created_at: string
}

export default function UserManagementPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<ProfileRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProfileRow; direction: "asc" | "desc" }>({
    key: "created_at",
    direction: "desc",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<ProfileRow | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from("profiles").select("*")

    if (error) {
      toast.error("Gagal mengambil data pengguna")
      console.error(error)
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    let isActive = true

    const load = async () => {
      if (!isActive) return
      await fetchUsers()
    }

    void load()

    return () => {
      isActive = false
    }
  }, [fetchUsers])

  const handleSort = (key: keyof ProfileRow) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = (a[sortConfig.key] || "").toString().toLowerCase()
    const bValue = (b[sortConfig.key] || "").toString().toLowerCase()

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) return

    const { error } = await supabase.from("profiles").delete().eq("id", id)

    if (error) {
      toast.error("Gagal menghapus pengguna")
      console.error(error)
    } else {
      toast.success("Pengguna berhasil dihapus")
      fetchUsers()
    }
  }

  const handleEdit = (user: ProfileRow) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    toast.info("Penambahan user baru dilakukan lewat registrasi Supabase Auth, bukan dari halaman ini.")
  }

  const getAvatarBg = (name: string) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-secondary/10 text-secondary",
      "bg-tertiary/10 text-tertiary",
      "bg-error/10 text-error",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Manajemen Pengguna" },
        ]}
      />

      <DashboardPage>
        <DashboardHero
          eyebrow="Kontrol Akses"
          title="Manajemen Pengguna"
          description="Kelola akun, role, dan akses sistem dari satu panel yang rapi dan konsisten."
          actions={
            <>
              <div className="flex h-12 items-center rounded-full border border-border/60 bg-surface-container-high px-3">
                <LucideSearch className="size-4 text-on-surface-variant/40" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 border-none bg-transparent px-3 text-[10px] font-black uppercase tracking-widest text-primary outline-none placeholder:text-on-surface-variant/40"
                />
                <div className="mx-2 h-6 w-px bg-on-surface-variant/10" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="cursor-pointer border-none bg-transparent pr-2 text-[10px] font-black uppercase tracking-widest text-primary outline-none"
                >
                  <option value="all">Semua Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button
                onClick={handleAdd}
                className="h-12 rounded-full border-none bg-primary px-6 text-[10px] font-black uppercase tracking-[0.15em] text-primary-foreground shadow-lg transition-all hover:brightness-110"
              >
                <LucideUserPlus className="mr-2 size-4" />
                Tambah Pengguna
              </Button>
            </>
          }
        />

        <section className="dashboard-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-surface-container-high/40">
                  <th
                    onClick={() => handleSort("full_name")}
                    className="cursor-pointer px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-2">
                      Pengguna
                      {sortConfig.key === "full_name" && (
                        <span className="text-[8px]">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("role")}
                    className="cursor-pointer px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-2">
                      Role
                      {sortConfig.key === "role" && (
                        <span className="text-[8px]">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("created_at")}
                    className="cursor-pointer px-6 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      Dibuat Pada
                      {sortConfig.key === "created_at" && (
                        <span className="text-[8px]">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Status
                  </th>
                  <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-6">
                        <Skeleton className="h-10 w-40" />
                      </td>
                      <td className="px-6 py-6">
                        <Skeleton className="h-6 w-20" />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Skeleton className="mx-auto h-6 w-32" />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Skeleton className="mx-auto h-6 w-16" />
                      </td>
                      <td className="px-6 py-6 text-right">
                        <Skeleton className="ml-auto h-10 w-20" />
                      </td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-20 text-center text-sm font-bold uppercase tracking-widest text-on-surface-variant/40"
                    >
                      Tidak ada data pengguna ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group transition-colors hover:bg-primary/5">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "flex size-10 items-center justify-center rounded-xl text-xs font-black uppercase",
                              getAvatarBg(user.full_name || "U")
                            )}
                          >
                            {user.full_name?.charAt(0) || "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-black tracking-tight text-primary">
                              {user.full_name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <LucideShield className="size-3.5 text-primary/40" />
                          <span className="text-xs font-black uppercase tracking-tight text-primary">
                            {user.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center gap-1 opacity-70">
                          <LucideClock className="size-3" />
                          <span className="text-[10px] font-bold font-mono">
                            {new Date(user.created_at).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Badge className="rounded-full border-none bg-secondary-container px-4 py-1 text-[9px] font-black uppercase tracking-widest text-on-secondary-container shadow-none">
                          Active
                        </Badge>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => handleEdit(user)}
                            className="flex size-10 items-center justify-center rounded-xl text-on-surface-variant transition-all hover:bg-primary/5 hover:text-primary"
                          >
                            <LucideEdit3 className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="flex size-10 items-center justify-center rounded-xl text-on-surface-variant transition-all hover:bg-error/5 hover:text-error"
                          >
                            <LucideTrash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </DashboardPage>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={fetchUsers}
        user={selectedUser ?? undefined}
      />
    </>
  )
}
