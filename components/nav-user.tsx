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
              id="user-menu-trigger"
              size="lg"
              className="h-auto rounded-3xl border border-slate-200 bg-white px-3.5 py-3.5 text-left shadow-sm transition-all duration-200 hover:bg-slate-50 data-[state=open]:bg-slate-50"
            >
              <Avatar className="h-12 w-12 rounded-2xl ring-1 ring-slate-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 px-1.5 text-left leading-tight">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-slate-900">
                    {user.name}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
                    {user.role || "user"}
                  </span>
                </div>
                <span className="mt-1 block truncate text-[11px] font-medium text-slate-500">
                  {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-1 size-4 shrink-0 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="border-b border-slate-200 p-0 font-normal">
              <div className="flex items-center gap-3 px-4 py-4 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-2xl ring-1 ring-slate-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-sm font-semibold text-slate-900">
                    {user.name}
                  </span>
                  <span className="mt-1 block truncate text-[11px] font-medium text-slate-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200/80" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer px-4 py-3 text-[11px] font-medium text-slate-700 focus:bg-slate-50 focus:text-slate-900"
              >
                <Sun className="mr-2 size-4" />
                Mode Terang
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer px-4 py-3 text-[11px] font-medium text-slate-700 focus:bg-slate-50 focus:text-slate-900"
              >
                <Moon className="mr-2 size-4" />
                Mode Gelap
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer px-4 py-3 text-[11px] font-medium text-slate-700 focus:bg-slate-50 focus:text-slate-900"
              >
                <Laptop className="mr-2 size-4" />
                Sesuai Sistem
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-200/80" />
            {user.role === "guest" ? (
              <DropdownMenuItem
                onClick={() => window.location.href = "/login"}
                className="cursor-pointer px-4 py-3 text-[11px] font-semibold text-primary focus:bg-blue-50 focus:text-primary"
              >
                <LogOutIcon className="mr-2 size-4 rotate-180" />
                Masuk (Login)
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer px-4 py-3 text-[11px] font-semibold text-error focus:bg-red-50 focus:text-error"
              >
                <LogOutIcon className="mr-2 size-4" />
                Keluar (Logout)
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
