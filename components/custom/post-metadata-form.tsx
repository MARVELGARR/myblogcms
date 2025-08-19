"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"

interface PostMetadataFormProps {
  tags?: string[]
  category?: string
  featured?: boolean
  onTagsChange?: (tags: string[]) => void
  onCategoryChange?: (category: string) => void
  onFeaturedChange?: (featured: boolean) => void
  className?: string
}

export function PostMetadataForm({
  tags = [],
  category = "",
  featured = false,
  onTagsChange,
  onCategoryChange,
  onFeaturedChange,
  className,
}: PostMetadataFormProps) {
  const [tagInput, setTagInput] = React.useState("")
  const [currentTags, setCurrentTags] = React.useState<string[]>(tags)
  const [currentCategory, setCurrentCategory] = React.useState(category)
  const [isFeatured, setIsFeatured] = React.useState(featured)

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      const newTags = [...currentTags, trimmedTag]
      setCurrentTags(newTags)
      onTagsChange?.(newTags)
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove)
    setCurrentTags(newTags)
    onTagsChange?.(newTags)
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentCategory(value)
    onCategoryChange?.(value)
  }

  const handleFeaturedToggle = (checked: boolean) => {
    setIsFeatured(checked)
    onFeaturedChange?.(checked)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Section */}
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-foreground">
          Category
        </label>
        <Input
          id="category"
          type="text"
          placeholder="Enter post category"
          value={currentCategory}
          onChange={handleCategoryChange}
          className="w-full"
        />
      </div>

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
            disabled={!tagInput.trim() || currentTags.includes(tagInput.trim())}
            size="sm"
            className="shrink-0"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>

        {/* Display Tags */}
        {currentTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {currentTags.map((tag) => (
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
        <Switch id="featured" checked={isFeatured} onCheckedChange={handleFeaturedToggle} />
      </div>
    </div>
  )
}
