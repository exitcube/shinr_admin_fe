import { Sidebar } from "@/components/common/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="flex min-h-screen font-poppins">
      <aside className="w-60 shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
