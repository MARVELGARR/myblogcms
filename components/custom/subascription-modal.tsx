"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/zustand/modal-store";
import { SubscriptionForm } from "./subscription-form";

const SubscriptionModal = () => {
  const { isOpen, type, onClose } = useModalStore();

  const isModalOpen = isOpen && type == "SUBSCRIPTION";

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogDescription>
              Subscribe to my newsletter
            </DialogDescription>
          </DialogHeader>

            <SubscriptionForm/>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SubscriptionModal;
