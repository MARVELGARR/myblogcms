"use client"


import { usePostStore } from "@/zustand/post-store"
import { Star, FileText, Tag, FolderOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"


export function PostSummary({className}: {className?: string}) {
  const { tags, category, featured, markdown, uploadedFiles, resetPost } = usePostStore()

  const wordCount = markdown
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  return (
    <Card className={cn(className,"w-full ")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Post Summary
            </CardTitle>
            <CardDescription>Overview of your post data</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={resetPost}>
            Reset All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category */}
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Category:</span>
          <span className="text-sm">{category || "Not set"}</span>
        </div>

        {/* Featured Status */}
        <div className="flex items-center gap-2">
          <Star className={`h-4 w-4 ${featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
          <span className="text-sm font-medium">Featured:</span>
          <span className="text-sm">{featured ? "Yes" : "No"}</span>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tags ({tags.length}):</span>
          </div>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No tags added</span>
          )}
        </div>

        {/* Content Stats */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Content:</span>
          <div className="text-sm text-muted-foreground">
            <div>Characters: {markdown.length}</div>
            <div>Words: {wordCount}</div>
            <div>Uploaded files: {uploadedFiles.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
