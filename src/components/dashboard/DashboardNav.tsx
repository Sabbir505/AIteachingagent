"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/config/site";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Users,
  BarChart3,
  GraduationCap,
  Settings,
  ShieldCheck,
  FileText,
  MessageSquare,
  Cpu,
  ListChecks,
  Edit3,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
  subItems?: NavItem[];
  external?: boolean;
}

const navItems: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["student", "teacher", "parent"] },
  // Teacher Specific
  { title: "My Classes", href: "/dashboard/teacher/classes", icon: Users, roles: ["teacher"] },
  {
    title: "Lessons", href: "/dashboard/teacher/lessons", icon: BookOpen, roles: ["teacher"],
    subItems: [
      { title: "View Lessons", href: "/dashboard/teacher/lessons", icon: BookOpen, roles: ["teacher"] },
      { title: "Create Lesson", href: "/dashboard/teacher/lessons/create", icon: Edit3, roles: ["teacher"] },
    ]
  },
  {
    title: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardCheck, roles: ["teacher"],
    subItems: [
      { title: "View Assignments", href: "/dashboard/teacher/assignments", icon: ListChecks, roles: ["teacher"] },
      { title: "Create Assignment", href: "/dashboard/teacher/assignments/create", icon: Edit3, roles: ["teacher"] },
    ]
  },
  { title: "Grading", href: "/dashboard/teacher/grading", icon: ShieldCheck, roles: ["teacher"] },
  { title: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3, roles: ["teacher"] },
  // Student Specific
  { title: "My Lessons", href: "/dashboard/student/lessons", icon: BookOpen, roles: ["student"] },
  { title: "My Assignments", href: "/dashboard/student/assignments", icon: ClipboardCheck, roles: ["student"] },
  { title: "My Performance", href: "/dashboard/student/performance", icon: GraduationCap, roles: ["student"] },
  // Parent Specific (Example: linked to student performance)
  { title: "Child's Progress", href: "/dashboard/parent/progress", icon: BarChart3, roles: ["parent"] },
  // Shared or general (example)
  // { title: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["student", "teacher", "parent"] },
];

interface DashboardNavProps {
  userRole: UserRole;
}

export default function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="grid items-start gap-2 text-sm font-medium">
      <SidebarMenu>
        {filteredNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            {item.subItems ? (
              <>
                <SidebarMenuButton
                  className="justify-start"
                  isActive={pathname?.startsWith(item.href)}
                  asChild={!item.subItems}
                  tooltip={item.title}
                >
                  <>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item.subItems.filter(sub => sub.roles.includes(userRole)).map(subItem => (
                     <SidebarMenuSubItem key={subItem.href}>
                       <SidebarMenuSubButton
                         href={subItem.href}
                         isActive={pathname === subItem.href}
                         asChild
                       >
                         <Link href={subItem.href} className="flex items-center">
                           <subItem.icon className="mr-2 h-4 w-4" />
                           <span>{subItem.title}</span>
                         </Link>
                       </SidebarMenuSubButton>
                     </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </>
            ) : (
              <SidebarMenuButton
                href={item.href}
                className="justify-start"
                isActive={pathname === item.href}
                asChild
                tooltip={item.title}
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
