import { Search, Bell, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming shadcn input exists

export function TopAppBar() {
  return (
    <header className="flex justify-between items-center px-6 w-full sticky top-0 z-40 bg-background/80 backdrop-blur-md h-16 border-b border-border/50">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-primary">
          FloodGuard Aceh
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            className="bg-muted border-none rounded-full py-2 pl-10 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search spatial data..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
