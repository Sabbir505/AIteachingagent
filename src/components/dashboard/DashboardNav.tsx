"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/config/site";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Users,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  ListChecks,
  Edit3,
  Presentation,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
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
  subItems?: Omit<NavItem, 'subItems'>[];
  external?: boolean;
}

interface NavGroup {
    title: string;
    roles: UserRole[];
    items: NavItem[];
}

// Re-structured navigation into logical groups
const navGroups: NavGroup[] = [
  {
    title: "", // No title for the main overview item
    roles: ["student", "teacher", "parent"],
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["student", "teacher", "parent"] }
    ]
  },
  {
    title: "Classroom",
    roles: ["teacher"],
    items: [
      { title: "My Classes", href: "/dashboard/teacher/classes", icon: Users, roles: ["teacher"] },
      { title: "Grading", href: "/dashboard/teacher/grading", icon: ShieldCheck, roles: ["teacher"] },
      { title: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3, roles: ["teacher"] },
    ]
  },
  {
    title: "Content",
    roles: ["teacher"],
    items: [
      {
        title: "Lessons", href: "/dashboard/teacher/lessons", icon: BookOpen, roles: ["teacher"],
        subItems: [
          { title: "View All", href: "/dashboard/teacher/lessons", icon: ListChecks, roles: ["teacher"] },
          { title: "Create New", href: "/dashboard/teacher/lessons/create", icon: Edit3, roles: ["teacher"] },
        ]
      },
      {
        title: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardCheck, roles: ["teacher"],
        subItems: [
          { title: "View All", href: "/dashboard/teacher/assignments", icon: ListChecks, roles: ["teacher"] },
          { title: "Create New", href: "/dashboard/teacher/assignments/create", icon: Edit3, roles: ["teacher"] },
        ]
      },
      { title: "Presentation Outlines", href: "/dashboard/teacher/presentations/create", icon: Presentation, roles: ["teacher"] },
    ]
  },
  {
    title: "Learning",
    roles: ["student"],
    items: [
      { title: "My Lessons", href: "/dashboard/student/lessons", icon: BookOpen, roles: ["student"] },
      { title: "My Assignments", href: "/dashboard/student/assignments", icon: ClipboardCheck, roles: ["student"] },
      { title: "My Performance", href: "/dashboard/student/performance", icon: GraduationCap, roles: ["student"] },
    ]
  },
  {
    title: "Family",
    roles: ["parent"],
    items: [
      { title: "Child's Progress", href: "/dashboard/parent/progress", icon: BarChart3, roles: ["parent"] },
    ]
  }
];


interface DashboardNavProps {
  userRole: UserRole;
}

export default function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname();

  const filteredNavGroups = navGroups.filter(group => group.roles.includes(userRole));

  return (
    <nav className="grid items-start gap-1 text-sm font-medium">
      {filteredNavGroups.map((group, index) => {
        const filteredItems = group.items.filter(item => item.roles.includes(userRole));
        if (filteredItems.length === 0) return null;

        return (
          <SidebarGroup key={index} className="p-1">
            {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton
                        className="justify-start"
                        isActive={pathname?.startsWith(item.href)}
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
          </SidebarGroup>
        );
      })}
    </nav>
  );
}
