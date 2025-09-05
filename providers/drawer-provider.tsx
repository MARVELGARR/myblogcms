'use client'
import { PostDetailsDrawer } from "@/components/AdminPostComponent/postUI/post-details-drawer";
import { useEffect, useState } from "react";

const DrawerProvider = () => {


    const [isMounted, setisMounted] = useState(false)


    useEffect(()=>{
         setisMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
            
        </>
    );
}
 
export default DrawerProvider;