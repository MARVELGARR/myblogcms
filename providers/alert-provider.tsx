'use client'
import DeleteCategoryAlert from "@/app/(Admin)/_AdminComponents/delete-category-alert"
import { useEffect, useState } from "react"



const MyAlertProvider = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
        <DeleteCategoryAlert/>
        </>
    );
}
 
export default MyAlertProvider;