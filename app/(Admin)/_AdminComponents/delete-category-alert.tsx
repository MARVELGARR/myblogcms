'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAlertStore } from "@/zustand/alert-store";
import Link from "next/link";

const DeleteCategoryAlert = () => {

    const {isOpen, onClose, type, data} = useAlertStore()

    const isAlertOpen = isOpen && type == "Delete-Category" 

    const handleClose = () => {
        onClose()
    }

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
            <Link href={`/api/category/${data}`}>
                Continue
            </Link>
        </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default DeleteCategoryAlert;