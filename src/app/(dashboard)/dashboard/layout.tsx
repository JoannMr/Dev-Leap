// app/(dashboard)/dashboard/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import DashboardHeader from "@components/dashboard/DashboardHeader";
import DashboardSidebar from "@components/dashboard/DashboardSidebar"; 
import { SearchProvider } from "@/context/SearchContext";
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="min-h-screen flex flex-col">
          <SearchProvider>
            <DashboardHeader />
            <div className="flex flex-1">
              <DashboardSidebar />
              <main className="flex-1 p-6 bg-white overflow-auto">
                {children}
              </main>
            </div>
          </SearchProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
