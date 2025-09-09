import { CreateDraftType } from "@/components/custom/draft-button"

export const updateDraft = async (body: CreateDraftType, draftId: string) => {

    try{
        const res = await fetch(`/api/draft/${draftId}`, {
            method: "PATCH",
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
            console.log("error updating draft")
        }
    }
    catch(error){
        console.error(error)
        throw new Error(`${error}`)
    }
    
}
 
