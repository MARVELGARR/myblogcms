"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Shield, UserIcon, Trash2, Edit } from "lucide-react"
import { useModalStore } from "@/zustand/modal-store"
import { useAlertStore } from "@/zustand/alert-store"
import { toast } from "sonner"
import { useUpdateUserRole } from "../../_AdminHooks/AdminUserHooks/use-users"
import { User } from "@prisma/client"

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name || "No name"}</span>
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
          {role === "ADMIN" ? <Shield className="mr-1 h-3 w-3" /> : <UserIcon className="mr-1 h-3 w-3" />}
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Status",
    cell: ({ row }) => {
      const emailVerified = row.getValue("emailVerified")
      return <Badge variant={emailVerified ? "default" : "outline"}>{emailVerified ? "Verified" : "Unverified"}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <span className="text-sm">{date.toLocaleDateString()}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const { onOpen: openModal } = useModalStore()
      const { onOpen: openAlert } = useAlertStore()
      const { updateUserRole, isUpdatingUserRole } = useUpdateUserRole()

      const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
        try {
          await updateUserRole({ userId: user.id, role: newRole })
          toast.success(`User role updated to ${newRole}`)
        } catch (error) {
          toast.error("Failed to update user role")
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isUpdatingUserRole}
              onClick={() => handleRoleChange(user.role === "ADMIN" ? "USER" : "ADMIN")}
            >
              <Shield className="mr-2 h-4 w-4" />
              {user.role === "ADMIN" ? "Remove admin" : "Make admin"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => openAlert("DELETE_USER", user.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
