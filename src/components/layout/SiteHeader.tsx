"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import UserAccountNav from "@/components/auth/UserAccountNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Hide header on auth pages
  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold font-headline">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-sm font-medium"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
