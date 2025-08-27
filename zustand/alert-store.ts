import { create } from "zustand";

type AlertType = "Delete-Category" | null

type useAlertStoreProp = {
    type: AlertType
    isOpen: boolean
    data?: string
    onOpen: (type: AlertType, data: string ) => void
    onClose: ()=> void
}

export const useAlertStore = create<useAlertStoreProp>((set)=>({
    type: null,
    isOpen: false,
    onOpen: (type: AlertType, data?: string) => set({isOpen: true, data, type}),
    onClose: ()=> set({isOpen: false})
    
}))