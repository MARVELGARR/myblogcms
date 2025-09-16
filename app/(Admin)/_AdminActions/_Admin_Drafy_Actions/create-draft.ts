import { CreateDraftType } from "@/components/custom/draft-button"

export const createDraft = async (body: CreateDraftType) : Promise<CreateDraftType> => {

    try{
        const res = await fetch('/api/draft', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if(res.ok){

            const data = await res.json()
            return data
        }
        else{
            console.log("error creating draft")
        }
    }
    catch(error){
        console.error(error)
        throw new Error("somthing went wrong")
    }
    
}
 
