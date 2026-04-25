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
        <button className="size-11 flex items-center justify-center rounded-full bg-[#242424] text-white hover:scale-105 transition-all duration-300 shadow-sm outline-none">
          <LucideUser className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-surface-container shadow-2xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Sesi Terdaftar</p>
            <p className="text-xs font-bold text-muted-foreground">Authorized Access</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-surface-container" />
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
