'use client'
import CreateCategoryModal from "@/app/(Admin)/_AdminComponents/createCategoryModal"
import SubscriptionModal from "@/components/custom/subascription-modal"
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
            <SubscriptionModal/>
        </>
    );
}
 
export default MyModalProviders;