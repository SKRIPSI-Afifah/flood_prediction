import { SideNavBar } from "@/components/sentinel/SideNavBar";
import { TopAppBar } from "@/components/sentinel/TopAppBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNavBar />
      <div className="flex-1 pl-64 flex flex-col">
        <TopAppBar />
        <main className="flex-1 p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
