"use client";
import onSubscribe from "@/actions/server-actions/subscribe";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/zustand/modal-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SubscribeButton = () => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/Auth/login");
    },
  }).data;

  const { onOpen } = useModalStore();
    const handleSubscribe = async () => {
    try {
      await onSubscribe(session.user.email);
      toast(`Thank you for subscribing`)
    } catch (error) {
        toast("Subscription failed")
    }
  };

  if (!session) {
    return (
      <Button
        onClick={() => onOpen("SUBSCRIPTION")}
        
        className="hidden sm:block cursor-pointer"
      >
        subscribe
      </Button>
    );
  }

  return (
    <Button
      onClick={handleSubscribe}
      
      className="hidden sm:block cursor-pointer"
    >
      subscribe
    </Button>
  );
};

export default SubscribeButton;
