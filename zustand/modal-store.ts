import { create } from "zustand";

type modalType = "CATEGORY" | "POST" | "PAGE" | "USER" | null;

type ModalStore = {
    type: modalType;
    isOpen: boolean;
    onOpen: (type: modalType)=> void;
    onClose: ()=> void;
}


export const useModalStore = create<ModalStore>((set)=>({
    type: null,
    isOpen: false,
    onOpen: (type: modalType)=> set({ isOpen: true, type}),
    onClose: ()=> set({isOpen: false})
}))