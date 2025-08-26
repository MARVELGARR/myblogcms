'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/zustand/alert-store"
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

const DeleteCategoryAlert = () => {

    const QueryClient = useQueryClient()
    const {isOpen, onClose, type, data} = useAlertStore()

    const isAlertOpen = isOpen && type == "Delete-Category" 

    const handleClose = () => {
        onClose()
    }
    
  const handleDelete = async (data: string) => {
    try {
      const res = await fetch(`/api/category/${data}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data }),
      });
      const result = await res.json();
      if (result.success) {
        toast("Category deleted");
        QueryClient.invalidateQueries({queryKey: ["categories"]})
        onClose();
      } else {
        toast(result.error || "Failed to delete category");
      }
    } catch (err) {
      toast("Error deleting category");
    }
  };

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={handleClose}>
            <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            category and remove your data from your servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={()=>handleDelete(data as string)}>
                Continue
            </Button>
        </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default DeleteCategoryAlert;