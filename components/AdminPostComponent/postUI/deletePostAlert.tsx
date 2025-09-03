'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/zustand/alert-store"
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeletePostAlert = () => {

    const router = useRouter()
    const {isOpen, onClose, type, data} = useAlertStore()

    const isAlertOpen = isOpen && type == "Delete-Post" 

    const handleClose = () => {
        onClose()
    }
    
  const handleDelete = async (data: string) => {
    try {
      const res = await fetch(`/api/post/${data}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data }),
      });
      const result = await res.json();
      router.refresh()
      if (result.success) {
        toast("Post deleted");
        onClose();
      } else {
        toast(result.error || "Failed to delete Post");
      }
    } catch (err) {
      toast("Error deleting Post");
    }
  };

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={handleClose}>
            <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            post and remove the data from your servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button className="cursor-pointer" onClick={()=>handleDelete(data as string)}>
                Continue
            </Button>
        </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default DeletePostAlert;