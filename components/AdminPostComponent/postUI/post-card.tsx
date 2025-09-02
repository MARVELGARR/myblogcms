"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the Post type based on typical Prisma Post model
export type Post = {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
  categoryId: string
  image?: string
  // Add other fields as needed
  author?: {
    name: string
    email: string
  }
  category?: {
    name: string
  }
}

type PostCardProps = Omit<Post, "categoryId"> & {
  onDelete?: (postId: string) => void
  className?: string
}

const PostCard = ({
  id,
  title,
  content,
  published,
  createdAt,
  author,
  category,
  image,
  onDelete,
  className,
}: PostCardProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }

  const truncateContent = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <Card
      className={cn("w-full max-w-md hover:shadow-lg transition-shadow relative overflow-hidden", className)}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <CardHeader className={cn("pb-3", image && "text-white")}>
        <div className="flex items-start justify-between">
          <CardTitle
            className={cn("text-lg font-semibold line-clamp-2 text-balance", image && "text-white drop-shadow-sm")}
          >
            {title}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2">
            <Badge variant={published ? "default" : "secondary"}>{published ? "Published" : "Draft"}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className={cn(
                "text-destructive hover:text-destructive hover:bg-destructive/10 p-1 h-8 w-8",
                image && "text-white hover:text-red-300 hover:bg-white/20 backdrop-blur-sm",
              )}
              title="Delete post"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("pb-3", image && "text-white")}>
        <p className={cn("text-muted-foreground text-sm leading-relaxed", image && "text-gray-100 drop-shadow-sm")}>
          {truncateContent(content)}
        </p>

        {category && (
          <Badge
            variant="outline"
            className={cn("mt-3", image && "bg-white/20 text-white border-white/30 backdrop-blur-sm")}
          >
            {category.name}
          </Badge>
        )}
      </CardContent>

      <CardFooter
        className={cn("pt-0 flex items-center justify-between text-xs text-muted-foreground", image && "text-gray-200")}
      >
        <div className="flex items-center gap-4">
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className={image ? "drop-shadow-sm" : ""}>{author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className={image ? "drop-shadow-sm" : ""}>{formatDate(createdAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
