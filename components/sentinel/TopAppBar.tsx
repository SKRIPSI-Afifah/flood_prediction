import { Search, Bell, UserCircle } from "lucide-react"

export function TopAppBar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-primary">
          FloodGuard Aceh
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="group relative hidden md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-64 rounded-full border-none bg-muted py-2 pr-4 pl-10 text-xs transition-all focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Search spatial data..."
            type="text"
            aria-label="Search spatial data"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="User Profile"
            title="User Profile"
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
