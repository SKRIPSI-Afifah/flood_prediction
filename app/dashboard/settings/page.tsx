export default function SettingsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-6 border-none">
        <h1 className="text-lg font-black text-primary tracking-tight">Settings</h1>
      </header>
      <main className="flex flex-1 flex-col gap-8 p-6">
        <div className="bg-white rounded-2xl p-8 border border-muted-foreground/10 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-black text-primary mb-2">System Settings</h2>
          <p className="text-muted-foreground max-w-md">Configure API keys, model parameters, and user preferences.</p>
        </div>
      </main>
    </>
  )
}
