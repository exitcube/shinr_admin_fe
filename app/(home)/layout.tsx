import { AppHeader } from "@/components/common/AppHeader";
import { Sidebar } from "@/components/common/Sidebar";
import { AuthTokenProvider } from "@/provider/AxiosProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    redirect("/");
  }

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
          <AuthTokenProvider>{children}</AuthTokenProvider>
        </main>
      </div>
    </div>
  );
}
