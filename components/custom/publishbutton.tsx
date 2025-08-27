"use client"

import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"

import { usePostStore } from "@/zustand/post-store"
import { useSession } from "next-auth/react"
import { submitData } from "@/app/(Admin)/_AdminActions/AdminPostActions"

export function PublishButton() {
  const { tags, title, description, category, featured, markdown, uploadedFiles } = usePostStore()

  const {data: session} = useSession()
  // Prepare post data
  const postData = {
    title,
    description,
    content: markdown,
    image: uploadedFiles[0]?.url,
    featured,
    tags,
    categoryId: category,
  }

  const mutation = useMutation({
    mutationFn: () => submitData(postData, session?.user.id as string),
    onSuccess: () => {
      alert("Post published successfully!")
    },
    onError: (error) => {
      alert("Failed to publish post.")
      console.error(error)
    }
  })

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Publishing..." : "Publish"}
    </Button>
  )
}