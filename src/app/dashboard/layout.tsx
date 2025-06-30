"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import UserAccountNav from "@/components/auth/UserAccountNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.logo className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg text-sidebar-foreground font-headline">{siteConfig.name}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav userRole={user.role} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserAccountNav user={user} />
          </div>
        </header>
        <main className="flex-1 py-4 sm:py-6 lg:py-8">
          <div className="container">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
