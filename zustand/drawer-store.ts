import { EditorPostProp } from "@/app/(Admin)/_AdminComponents/edit-posrEditor";
import { create } from "zustand";

type useDrawerStoreType = "Edit-post" | null

type useDrawerStoreProp = {
    isOpen: boolean;
    type: useDrawerStoreType;
    onOpen: (type: useDrawerStoreType)=> void;
    onClose: ()=> void;
}

export const useDrawerStore = create<useDrawerStoreProp>((set)=>({
    isOpen: false,
    type: null,
    data: null,
    onOpen: (type: useDrawerStoreType)=> set({ isOpen: true, type }),
    onClose: ()=> set({isOpen: false, type: null})
}))