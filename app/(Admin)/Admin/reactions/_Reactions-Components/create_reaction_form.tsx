"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { createReaction } from "@/app/(Admin)/_AdminActions/AdminReactionActions"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => <div className="p-4">Loading emoji picker...</div>,
})

export function CreateReactionForm({ className }: { className?: string }) {
  const [emoji, setEmoji] = useState("")
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  const router = useRouter()

  const createReactionMutation = useMutation({
    mutationFn: (emoji: string) => createReaction(emoji),
    onSettled: () => {
      router.refresh()
    },
    onSuccess(data) {
      toast(`Reaction created: ${data.react} `)
      setEmoji("")
      setIsPickerOpen(false)
    },

    onError(error) {
      toast(`Reaction creation failed: ${error}`)
    },
  })

  const handleSubmit = async () => {
    if (!emoji.trim()) {
      toast("Error", { description: "Please enter an emoji" })
      return
    }

    try {
      createReactionMutation.mutate(emoji)
    } catch (error) {
      // already handled by onError, but you could log it here
      console.error(error)
    }
  }

  const handleEmojiSelect = (emojiData: any) => {
    setEmoji(emojiData.emoji)
    setIsPickerOpen(false)
  }

  return (
    <Card className={cn(className, "w-full")}>
      <CardHeader>
        <CardTitle>Create New Reaction</CardTitle>
        <CardDescription>Add a new emoji reaction that users can use on posts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Selected Emoji</Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 border rounded-md text-2xl bg-muted">
              {emoji || "?"}
            </div>

            <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" disabled={createReactionMutation.isPending} className="flex-1 bg-transparent">
                  {emoji ? "Change Emoji" : "Select Emoji"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  width={300}
                  height={400}
                  searchDisabled={false}
                  skinTonesDisabled={true}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground">Click "Select Emoji" to choose from the emoji picker</p>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full cursor-pointer"
          disabled={createReactionMutation.isPending || !emoji.trim()}
        >
          {createReactionMutation.isPending ? "Creating..." : "Create Reaction"}
        </Button>
      </CardContent>
    </Card>
  )
}
