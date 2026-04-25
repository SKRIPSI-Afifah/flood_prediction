"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  LucideUserPlus, 
  LucideFilter, 
  LucideEdit3, 
  LucideTrash2, 
  LucideMail, 
  LucideShield, 
  LucideClock,
  LucideSearch
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { UserDialog } from "./user-dialog"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserManagementPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: 'created_at',
    direction: 'desc'
  })
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
    
    if (error) {
      toast.error("Gagal mengambil data pengguna")
      console.error(error)
    } else {
      setUsers(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = (a[sortConfig.key] || "").toString().toLowerCase()
    const bValue = (b[sortConfig.key] || "").toString().toLowerCase()
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) return

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("Gagal menghapus pengguna")
      console.error(error)
    } else {
      toast.success("Pengguna berhasil dihapus")
      fetchUsers()
    }
  }

  const handleEdit = (user: any) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedUser(null)
    setIsDialogOpen(true)
  }

  const getAvatarBg = (name: string) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-secondary/10 text-secondary",
      "bg-tertiary/10 text-tertiary",
      "bg-error/10 text-error"
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Manajemen Pengguna" }
        ]} 
      />
      
      <main className="flex flex-1 flex-col gap-10 py-10">
        <section className="px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Manajemen Pengguna</h2>
            <p className="text-sm text-on-surface-variant font-bold opacity-60 uppercase tracking-widest">Kelola akses dan hak istimewa pengguna sistem.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface-container-high rounded-sm px-4">
               <div className="relative group flex-1">
                  <LucideSearch className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Cari pengguna..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none h-12 pl-8 pr-4 rounded-sm text-[10px] font-black uppercase tracking-widest text-primary focus:ring-0 transition-all w-48"
                  />
                </div>
                <div className="h-6 w-px bg-on-surface-variant/10 mx-2"></div>
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-primary pr-8 focus:ring-0 cursor-pointer"
                >
                  <option value="all">Semua Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
            </div>
            <Button 
              onClick={handleAdd}
              className="bg-primary hover:opacity-90  border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-sm shadow-lg transition-all"
            >
              <LucideUserPlus className="size-4 mr-2" />
              Tambah Pengguna
            </Button>
          </div>
        </section>

        <section className="px-6 lg:px-8">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-surface-container/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-none">
                    <th 
                      onClick={() => handleSort('full_name')}
                      className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Pengguna
                        {sortConfig.key === 'full_name' && (
                          <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('role')}
                      className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        Role
                        {sortConfig.key === 'role' && (
                          <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('created_at')}
                      className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        Dibuat Pada
                        {sortConfig.key === 'created_at' && (
                          <span className="text-[8px]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-10 py-6"><Skeleton className="h-10 w-40" /></td>
                        <td className="px-6 py-6"><Skeleton className="h-6 w-20" /></td>
                        <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-32 mx-auto" /></td>
                        <td className="px-6 py-6 text-center"><Skeleton className="h-6 w-16 mx-auto" /></td>
                        <td className="px-10 py-6 text-right"><Skeleton className="h-10 w-20 ml-auto" /></td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-on-surface-variant font-bold uppercase tracking-widest opacity-40">
                        Tidak ada data pengguna ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className={cn("size-10 rounded-md flex items-center justify-center font-black text-xs uppercase", getAvatarBg(user.full_name || "U"))}>
                              {user.full_name?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-black text-primary text-sm tracking-tight">{user.full_name}</span>
                              <span className="text-[10px] font-bold text-on-surface-variant/50 flex items-center gap-1">
                                <LucideMail className="size-3" /> {user.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                            <LucideShield className="size-3.5 text-primary opacity-40" />
                            <span className="text-xs font-black text-primary uppercase tracking-tight">{user.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-center">
                           <div className="flex flex-col items-center gap-1 opacity-60">
                              <LucideClock className="size-3" />
                              <span className="text-[10px] font-bold font-mono">
                                {new Date(user.created_at).toLocaleDateString('id-ID', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <Badge 
                            className="rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none shadow-none bg-secondary-container text-on-secondary-container"
                          >
                            Active
                          </Badge>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(user)}
                              className="size-10 flex items-center justify-center rounded-md text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                            >
                              <LucideEdit3 className="size-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="size-10 flex items-center justify-center rounded-md text-on-surface-variant hover:text-error hover:bg-error/5 transition-all"
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
          </div>
        </section>
      </main>

      <UserDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSuccess={fetchUsers} 
        user={selectedUser} 
      />
    </>
  )
}
