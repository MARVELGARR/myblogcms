'use client'
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/zustand/drawer-store";




const EditButtonForDrawer = () => {
    const { onOpen} = useDrawerStore()
    return (
        <Button className="absolute right-3 bottom-4" onClick={()=>onOpen('Edit-post')}>Show More</Button>
    );
}
 
export default EditButtonForDrawer;