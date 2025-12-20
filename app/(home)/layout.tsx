import { AppHeader } from "@/components/common/AppHeader";
import { Sidebar } from "@/components/common/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen font-poppins">
      {/* Sidebar */}
      <aside className="w-60 shrink-0">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-auto">
        {/* Header */}
        <header className="w-full bg-white shadow p-4">
          <AppHeader />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
