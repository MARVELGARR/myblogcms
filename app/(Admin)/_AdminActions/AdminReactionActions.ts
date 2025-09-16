import { Prisma, Reaction } from "@prisma/client"

export type ReactionCreationType = Prisma.ReactionCreateInput


export const createReaction = async (data: ReactionCreationType["react"]) : Promise<Reaction> =>{

    try{
        const res = await fetch("/api/reactions",{
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!res.ok){
            console.error('failed to create reaction')
        }
        const reaction = await res.json()
        return reaction
    }
    catch(error){
        console.error(error)
        throw new Error("something went wrong")
    }
}

export const deleteReaction = async (reactionId: string) => {

    try{
        const res = await fetch(`/api/reactions/${reactionId}`,{
            method: "DELETE",
            headers: {
                "Content-type" : "application/json"
            }
        })
        if(!res.ok){
            console.error('failed to create reaction')
        }
        const result = await res.json()
        return result
    }
    catch(error){
         console.error(error)
        throw new Error("something went wrong")
    }

}