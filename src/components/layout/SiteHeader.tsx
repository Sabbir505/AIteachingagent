
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
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function SiteHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide header on auth pages and dashboard
  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Left: Logo */}
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden flex-grow items-center justify-start gap-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
           <ThemeToggle />
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                  )}
                >
                  Log In
                </Link>
                 <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                  )}
                >
                  Try EduGenius Free
                </Link>
              </div>
            )}
             <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
        </div>
      </div>
       {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container flex flex-col items-start gap-4 pb-4">
              {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
             <div className="flex w-full flex-col gap-2 pt-4 border-t">
                {user ? null : (
                    <>
                    <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")} onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                    <Link href="/signup" className={cn(buttonVariants({ size: "sm" }), "w-full")} onClick={() => setMobileMenuOpen(false)}>Try EduGenius Free</Link>
                    </>
                )}
             </div>
          </div>
        </div>
      )}
    </header>
  );
}
