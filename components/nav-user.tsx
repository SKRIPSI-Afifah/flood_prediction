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
import { EllipsisVerticalIcon, CircleUserRoundIcon, CreditCardIcon, BellIcon, LogOutIcon, Moon, Sun, Laptop } from "lucide-react"
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  {user.role || 'user'} • {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white dark:bg-[#0f1011] shadow-2xl border border-surface-container"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-3 py-3 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-primary uppercase tracking-tight">{user.name}</span>
                  <span className="truncate text-[9px] text-muted-foreground uppercase font-black tracking-widest opacity-60">
                    {user.role || 'user'} • {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-surface-container" />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setTheme("light")}
                className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
              >
                <Sun className="mr-2 size-4" />
                Mode Terang
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("dark")}
                className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
              >
                <Moon className="mr-2 size-4" />
                Mode Gelap
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme("system")}
                className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
              >
                <Laptop className="mr-2 size-4" />
                Sesuai Sistem
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-surface-container" />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="text-error focus:text-error focus:bg-error/5 cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em]"
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
