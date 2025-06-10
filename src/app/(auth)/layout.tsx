import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
       <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center text-lg font-medium"
        >
          <Icons.logo className="mr-2 h-6 w-6 text-primary" />
          <span className="font-headline">{siteConfig.name}</span>
        </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
