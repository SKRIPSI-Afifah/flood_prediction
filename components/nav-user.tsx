"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { EllipsisVerticalIcon, LogOutIcon, Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { signOut } from "@/app/auth/actions"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
    role?: string
  }
}) {
  const { isMobile } = useSidebar()
  const { setTheme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-2xl border border-sidebar-border/60 bg-sidebar/80 shadow-sm shadow-sidebar-primary/5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-xl ring-2 ring-sidebar-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-sidebar-foreground">
                  {user.name}
                </span>
                <span className="truncate text-[10px] text-sidebar-foreground/60 uppercase font-bold tracking-tight">
                  {user.role || "user"} | {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl border border-border/60 bg-surface shadow-2xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 bg-[linear-gradient(90deg,rgba(15,76,129,0.06),rgba(14,165,166,0.06))] px-3 py-3 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-xl ring-2 ring-primary/10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black uppercase tracking-tight text-primary">
                    {user.name}
                  </span>
                  <span className="truncate text-[9px] font-black uppercase tracking-widest text-on-surface-variant/70">
                    {user.role || "user"} | {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer px-3 py-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-primary/5"
              >
                <Sun className="mr-2 size-4" />
                Mode Terang
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer px-3 py-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-primary/5"
              >
                <Moon className="mr-2 size-4" />
                Mode Gelap
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer px-3 py-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-primary/5"
              >
                <Laptop className="mr-2 size-4" />
                Sesuai Sistem
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/60" />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer px-3 py-3 font-black text-[10px] uppercase tracking-[0.2em] text-error focus:bg-error/5 focus:text-error"
            >
              <LogOutIcon className="mr-2 size-4" />
              Keluar (Logout)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
