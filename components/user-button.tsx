"use client"

import { signOut } from "@/app/auth/actions"
import { LucideUser, LucideLogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-11 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/15 outline-none transition-all duration-300 hover:scale-105">
          <LucideUser className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl border border-border/60 bg-surface shadow-2xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sesi Terdaftar</p>
            <p className="text-xs font-semibold text-on-surface-variant">Authorized Access</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/60" />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="text-error focus:text-error focus:bg-error/5 cursor-pointer p-4 font-black text-[10px] uppercase tracking-[0.2em]"
        >
          <LucideLogOut className="mr-2 h-4 w-4" />
          <span>Keluar (Logout)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
