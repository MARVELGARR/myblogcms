"use client";
import onSubscribe from "@/actions/server-actions/subscribe";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/zustand/modal-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SubscribeButton = () => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.prefetch("/Auth/login");
    },
  }).data;

  const { onOpen } = useModalStore();
    const handleSubscribe = async () => {
    try {
      const result = await onSubscribe(session.user.email);
      console.log("Subscribed successfully:", result);
    } catch (error) {
      console.error("Subscription failed:", error.message);
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
