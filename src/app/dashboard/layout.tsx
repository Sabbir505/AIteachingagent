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
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import UserAccountNav from "@/components/auth/UserAccountNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
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
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6 text-sidebar-primary" />
              <span className="font-bold text-lg text-sidebar-foreground font-headline">{siteConfig.name}</span>
            </div>
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav userRole={user.role} />
        </SidebarContent>
        <SidebarFooter className="p-4">
           {/* Moved UserAccountNav to header for global access */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
          {/* Mobile Header Content, if any, beyond what SiteHeader provides globally */}
          <SidebarTrigger />
           {/* UserAccountNav is in SiteHeader now */}
        </div>
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
