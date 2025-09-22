"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAlertStore } from "@/zustand/alert-store"

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
  className,
}: PostCardProps) => {
  const { onOpen } = useAlertStore()

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

  const onClick = (id: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set("postId", id)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
  }

  return (
    <Card
      onClick={() => onClick(id)}
      className={cn("cursor-pointer w-full hover:shadow-lg transition-shadow relative overflow-hidden", className)}
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
      <CardHeader className={cn("pb-3 px-4 sm:px-6", image && "text-white")}>
        <div className="flex items-start justify-between gap-3">
          <CardTitle
            className={cn(
              "text-base sm:text-lg font-semibold line-clamp-2 text-balance flex-1",
              image && "text-white drop-shadow-sm",
            )}
          >
            {title}
          </CardTitle>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Badge variant={published ? "default" : "secondary"} className="text-xs px-2 py-1">
              {published ? "Published" : "Draft"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onOpen("Delete-Post", id)
              }}
              className={cn(
                "cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 p-2 h-8 w-8 sm:h-9 sm:w-9",
                image && "text-white hover:text-red-300 hover:bg-white/20 backdrop-blur-sm",
              )}
              title="Delete post"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("pb-3 px-4 sm:px-6", image && "text-white")}>
        <p
          className={cn(
            "text-muted-foreground text-sm sm:text-base leading-relaxed",
            image && "text-gray-100 drop-shadow-sm",
          )}
        >
          {truncateContent(content)}
        </p>

        {category && (
          <Badge
            variant="outline"
            className={cn(
              "mt-3 text-xs max-w-full truncate",
              image && "bg-white/20 text-white border-white/30 backdrop-blur-sm",
            )}
          >
            {category.name}
          </Badge>
        )}
      </CardContent>

      <CardFooter
        className={cn(
          "pt-0 px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-xs text-muted-foreground",
          image && "text-gray-200",
        )}
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 flex-shrink-0" />
              <span className={cn("truncate max-w-[120px] sm:max-w-none", image ? "drop-shadow-sm" : "")}>
                {author.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className={image ? "drop-shadow-sm" : ""}>{formatDate(createdAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
