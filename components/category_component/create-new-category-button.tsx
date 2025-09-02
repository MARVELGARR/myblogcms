'use client'
import { cn } from "@/lib/utils";
import { useModalStore } from "@/zustand/modal-store";
import { Button } from "@radix-ui/react-toolbar";
import { Plus } from "lucide-react";

const CreateNewCategoryButton = ({className}:{className?: string}) => {

    const { onOpen} = useModalStore()
    return (
        <div className={cn(className," rounded-full cursor-pointer border-2 p-4", )} onClick={()=>onOpen("CATEGORY")}>
            <Plus className="w-7 h-7 bg-background cursor-pointer"/>
        </div>
    );
}
 
export default CreateNewCategoryButton;