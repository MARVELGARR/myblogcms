'use client'
import CreateCategoryModal from "@/app/(Admin)/_AdminComponents/createCategoryModal"
import { useEffect, useState } from "react"



const MyModalProviders = () => { 
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
            <CreateCategoryModal/>
        </>
    );
}
 
export default MyModalProviders;