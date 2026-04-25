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
  LucideClock 
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function UserManagementPage() {
  const users = [
    {
      id: "1",
      name: "Afifah",
      email: "afifah@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2026-04-25 10:30",
      avatarBg: "bg-primary/10 text-primary"
    },
    {
      id: "2",
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2026-04-24 15:45",
      avatarBg: "bg-secondary/10 text-secondary"
    },
    {
      id: "3",
      name: "Siti Aminah",
      email: "siti@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2026-04-20 09:12",
      avatarBg: "bg-tertiary/10 text-tertiary"
    },
  ]

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
            <Button className="bg-surface-container-high hover:bg-surface-variant text-primary border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-2xl transition-all">
              <LucideFilter className="size-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-container hover:shadow-xl hover:shadow-primary/20 text-white border-none text-[10px] font-black h-12 px-6 uppercase tracking-[0.15em] rounded-2xl shadow-lg transition-all">
              <LucideUserPlus className="size-4 mr-2" />
              Tambah Pengguna
            </Button>
          </div>
        </section>

        <section className="px-6 lg:px-8">
          <div className="bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-sm border border-surface-container/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-none">
                    <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Pengguna</th>
                    <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Role</th>
                    <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Status</th>
                    <th className="px-6 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-center">Login Terakhir</th>
                    <th className="px-10 py-6 text-[10px] font-black text-primary uppercase tracking-[0.2em] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className={cn("size-10 rounded-xl flex items-center justify-center font-black text-xs", user.avatarBg)}>
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-primary text-sm tracking-tight">{user.name}</span>
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
                        <Badge 
                          className={cn(
                            "rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                            user.status === "Active" 
                              ? "bg-secondary-container text-on-secondary-container" 
                              : "bg-surface-container-highest text-on-surface-variant/40"
                          )}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-6 text-center">
                         <div className="flex flex-col items-center gap-1 opacity-60">
                            <LucideClock className="size-3" />
                            <span className="text-[10px] font-bold font-mono">{user.lastLogin}</span>
                         </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="size-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all">
                            <LucideEdit3 className="size-4" />
                          </button>
                          <button className="size-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-error hover:bg-error/5 transition-all">
                            <LucideTrash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
