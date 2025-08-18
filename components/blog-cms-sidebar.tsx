'use client'
import type React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Eye,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  isActive?: boolean
  hasSubmenu?: boolean
  isExpanded?: boolean
  children?: React.ReactNode
}

function SidebarItem({ icon, label, href, isActive, hasSubmenu, isExpanded , children }: SidebarItemProps) {

  const content = (
    <>
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1 text-left ">{label}</span>
      
      {hasSubmenu && (
        <span className="flex-shrink-0">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      )}
    </>
  )

  const className = `w-full cursor-pointer justify-start gap-3 px-3 py-2 h-auto font-medium transition-colors ${
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
      : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
  }`

  return (
    <div>
      {href ? (
        <Link className="cursor-pointer" href={href}>
          <Button  variant="ghost" className={className}>
            {content}
          </Button>
        </Link>
      ) : (
        <Button variant="ghost" className={className}>
          {content}
        </Button>
      )}
      {hasSubmenu && isExpanded && children && (
        <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-3">{children}</div>
      )}
    </div>
  )
}

function SubMenuItem({
  icon,
  label,
  href,
  isActive,
}: { icon: React.ReactNode; label: string; href: string; isActive?: boolean }) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="sm"
        className={`w-full justify-start gap-2 px-2 py-1.5 h-auto text-sm transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span>{label}</span>
      </Button>
    </Link>
  )
}

export function BlogCMSSidebar() {


  const pathName = usePathname()
  const urlParams = useSearchParams()
  
  
  const expandedMenus = ["posts", "pages", "analytics", "users", "settings"]

  const handdleIsExpanded = (param: string) =>{
    if(pathName.includes(param)){
      return false
    }
    return true
  }
  

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">BlogCMS</h1>
          <p className="text-xs text-sidebar-foreground/60">Content Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <SidebarItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Dashboard"
          href="/Admin/dashboard"
          isActive={pathName.includes("/dashboard")}
        />

        <SidebarItem
          icon={<FileText className="h-4 w-4" />}
          label="Posts"
          href={`/Admin/posts?subPost=allPost`}
          hasSubmenu
          isActive={pathName.includes("/posts")}
          isExpanded={pathName.includes("/posts") }
        >
          <SubMenuItem
            icon={<Eye className="h-3 w-3" />}
            label="All Posts"
            href="/Admin/posts?subPost=allPost"
            isActive={urlParams.get("subPost") == "allPost"}
          />
          <SubMenuItem
            icon={<Plus className="h-3 w-3" />}
            label="Add New"
            href="/Admin/posts?subPost=new"
            isActive={urlParams.get("subPost") == "new"}
          />
          <SubMenuItem
            icon={<Edit className="h-3 w-3" />}
            label="Drafts"
            href="/Admin/posts/?subPost=drafts"
            isActive={urlParams.get("subPost") == "drafts"}
          />
        </SidebarItem>

        <SidebarItem
          icon={<ImageIcon className="h-4 w-4" />}
          label="Media"
          href="/Admin/media"
          isActive={pathName.includes("/media")}
        />

        <SidebarItem
          icon={<MessageSquare className="h-4 w-4" />}
          label="Comments"
          href="/Admin/comments"
          isActive={pathName.includes("/comments")}
        />
{/* 
        <SidebarItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Analytics"
          hasSubmenu
          isExpanded={expandedMenus.includes("analytics")}
        >
          <SubMenuItem
            icon={<BarChart3 className="h-3 w-3" />}
            label="Overview"
            href="/analytics"
            isActive={pathName === "/analytics"}
          />
          <SubMenuItem
            icon={<Eye className="h-3 w-3" />}
            label="Page Views"
            href="/analytics/page-views"
            isActive={pathName === "/analytics/page-views"}
          />
        </SidebarItem> */}

        <SidebarItem
          icon={<Users className="h-4 w-4" />}
          label="Users"
          href="/Admin/users"
          isActive={pathName.includes("/users")}
          isExpanded={expandedMenus.includes("users")}
        >

        </SidebarItem>

        <SidebarItem
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          hasSubmenu
          href="/Admin/settings"
          isActive={pathName.includes("/settings")}
          isExpanded={pathName.includes("/settings") }
        >

          <SubMenuItem
            icon={<User className="h-3 w-3" />}
            label="Profile"
            href="/Admin/settings?subSettings=profile"
            isActive={urlParams.get("subSettings") == "profile"}
          />
        </SidebarItem>
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent/10 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/generic-user-avatar.png" alt="User" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
