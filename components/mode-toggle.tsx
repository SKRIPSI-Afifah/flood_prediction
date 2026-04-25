"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="size-11 rounded-full bg-surface-container-low border-none shadow-sm hover:bg-surface-container-high transition-all duration-300 outline-none"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-[#0f1011] border-surface-container shadow-2xl">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Terang (Light)</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Gelap (Dark)</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="cursor-pointer py-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] focus:bg-surface-container"
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>Sistem (System)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
