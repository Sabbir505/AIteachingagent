"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, type User } from "@/hooks/useAuth"; // Assuming User type is exported from useAuth or its source
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

interface UserAccountNavProps {
  user: User;
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user.name ? `https://avatar.vercel.sh/${user.name}.png` : undefined} alt={user.name || "User"} />
          <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
             <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        {/* Add more items like Settings if needed */}
        {/* <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center text-destructive focus:text-destructive"
          onSelect={async (event) => {
            event.preventDefault();
            await signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
