"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ReactionCardsProp } from "../page"
import { useMutation } from "@tanstack/react-query"
import { deleteReaction } from "@/app/(Admin)/_AdminActions/AdminReactionActions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const ReactionCard = ({ react, id }: ReactionCardsProp) => {

    const router = useRouter()

    const emojiDeleteMutation = useMutation({
        mutationFn: (id: string)=>deleteReaction(id),
        onSettled: ()=>{
            router.refresh()
        },
        onSuccess: ()=>{
            toast("Reaction deleted!")
        },
        onError: ()=>{
            toast("Failed to delete reaction")
        }
    })
  return (
    <Card className="rounded-full flex items-center justify-center w-[4rem] h-[4rem] cursor-pointer p-0 relative group hover:bg-muted/50 transition-colors">
      <CardContent className="p-0 flex items-center justify-center">
        <p className="text-3xl">{react}</p>
      </CardContent>

      {/* Delete button - only visible on hover */}
      <Button
        variant="destructive"
        disabled={emojiDeleteMutation.isPending}
        size="icon"
        className="absolute -top-2 -right-2 w-6 h-6 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
        onClick={()=>emojiDeleteMutation.mutate(id)}
      >
        <X className="w-3 h-3" />
      </Button>
    </Card>
  )
}

export default ReactionCard
