"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"
import { usePostStore } from "@/zustand/post-store"
import { CategorySelect } from "./categorySelector"


interface PostMetadataFormProps {
  className?: string
}

export function PostMetadataForm({ className }: PostMetadataFormProps) {
  const { tags, category, title, description, setTittle, setDescription, featured, setCategory, setFeatured, addTag, removeTag } = usePostStore()
  const [tagInput, setTagInput] = React.useState("")


  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      addTag(trimmedTag)
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    removeTag(tagToRemove)
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  
  const handleTittleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTittle(e.target.value)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }


  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const handleFeaturedToggle = (checked: boolean) => {
    setFeatured(checked)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className=""></div>
      {/* Tittle Section */}
      <div className="space-y-2">
        <label htmlFor="tittle" className="text-sm font-medium text-foreground">
          Tittle
        </label>
        <Input
          id="tittle"
          type="text"
          placeholder="Enter post Tittle"
          value={title}
          onChange={handleTittleChange}
          className="w-full"
        />
      </div>

      {/* Description Section */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </label>
        <Input
          id="description"
          type="text"
          placeholder="Enter post Tittle"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full"
        />
      </div>
      {/* Category Section */}
      <CategorySelect/>

      {/* Tags Section */}
      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium text-foreground">
          Tags
        </label>
        <div className="flex gap-2">
          <Input
            id="tags"
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            disabled={!tagInput.trim() || tags.includes(tagInput.trim())}
            size="sm"
            className="shrink-0"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>

        {/* Display Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                <span>{tag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveTag(tag)}
                  className="h-auto p-0.5 hover:bg-destructive hover:text-destructive-foreground rounded-sm"
                >
                  <X className="size-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Featured Toggle Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label htmlFor="featured" className="text-sm font-medium text-foreground">
            Featured Post
          </label>
          <p className="text-xs text-muted-foreground">Mark this post as featured to highlight it</p>
        </div>
        <Switch id="featured" checked={featured} onCheckedChange={handleFeaturedToggle} />
      </div>
    </div>
  )
}
