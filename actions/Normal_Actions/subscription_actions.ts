import { status } from 'effect/Fiber';

type ErrorResonds = {
    message: string;
    status: number
}

const onSubscribe = async(email: string): Promise<ErrorResonds> => {

    try{
        const res = await fetch("/api/subscription", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(email)
        })

        if(!res.ok){
            const errorDetails: ErrorResonds = await  res.json()
            throw new Error(errorDetails.message)
        }

        const result = await res.json()
        return result
    }
    catch(error){
        if(error instanceof Error){

            throw new Error(error.message)
        }
        else{
             throw new Error("Internal Error")
        }
    }
    
}
 
export default onSubscribe;