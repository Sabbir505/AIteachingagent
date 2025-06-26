"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import UserAccountNav from "@/components/auth/UserAccountNav";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function SiteHeader() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Hide header on auth pages and dashboard
  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        {/* Left: Logo */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden flex-grow items-center justify-center gap-6 text-sm font-medium md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80">
              Product <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/#features" className="w-full">For Teachers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="w-full">For Students</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#features" className="w-full">For Parents</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/#ai-features"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            AI Features
          </Link>
          <Link
            href="/#live-demo"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Live Demo
          </Link>
          <Link
            href="/#how-it-works"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end">
           <ThemeToggle />
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "ml-2 hidden md:inline-flex"
                )}
              >
                Try EduGenius
              </Link>
            )}
        </div>
      </div>
    </header>
  );
}
