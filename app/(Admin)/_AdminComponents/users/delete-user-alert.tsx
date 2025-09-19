"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAlertStore } from "@/zustand/alert-store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useDeleteUser } from "../../_AdminHooks/AdminUserHooks/use-users"

const DeleteUserAlert = () => {
  const { isOpen, type, data, onClose } = useAlertStore()
  const { deleteUser, isDeletingUser } = useDeleteUser()
  const router = useRouter()

  const isAlertOpen = isOpen && type === "DELETE_USER"

  const handleDelete = async () => {
    if (!data) return

    try {
      await deleteUser(data)
      toast.success("User deleted successfully")
      router.refresh()
      onClose()
    } catch (error) {
      toast.error("Failed to delete user")
    }
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user account and remove all associated data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeletingUser}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeletingUser ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUserAlert
