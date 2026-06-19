import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardHero, DashboardPage } from "@/components/dashboard-page"

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Pengaturan" },
        ]}
      />

      <DashboardPage>
        <DashboardHero
          eyebrow="Konfigurasi Sistem"
          title="Pengaturan"
          description="Kelola API, parameter model, preferensi tampilan, dan kontrol sistem dari satu tempat."
        />

        <section className="dashboard-panel min-h-[420px] overflow-hidden">
          <div className="dashboard-panel-body flex min-h-[420px] flex-col items-center justify-center text-center">
            <p className="dashboard-kicker">Workspace</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tighter text-primary">
              System Settings
            </h2>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-on-surface-variant">
              Halaman pengaturan siap dipakai untuk konfigurasi API keys, parameter model, dan preferensi pengguna.
            </p>
          </div>
        </section>
      </DashboardPage>
    </>
  )
}
