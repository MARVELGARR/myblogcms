"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/zustand/modal-store";
import { useState } from "react";
import useCreateNewCategory from "../_AdminHooks/_AminCategoryHooks/useCreateNewCategoty";
import { toast } from "sonner";

const CreateCategoryModal = () => {
    const [categoryName, setCategoryName] = useState("")
  const { isOpen, type, onClose } = useModalStore();

  const { createCategoty, isCreatingNewCategory} = useCreateNewCategory()

  const isModalOpen = isOpen && type == "CATEGORY";

  const handleClose = () => {
    onClose();
  };


  const handleSubmit = ()=>{
    createCategoty(categoryName).then(()=>{
        toast(`New category created`)
        onClose()
    }).catch(()=>{
        toast("Error creating category")
    })
  }




  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
            <DialogDescription>
              Create new category here here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">Name</label>
              <Input id="name-1" onChange={(e)=>setCategoryName(e.target.value)} value={categoryName} name="name" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateCategoryModal;
