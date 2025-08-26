"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { formatDate } from "@/utils/date"
import useUpdateCategory from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useUpdateCategory"
import { toast } from "sonner"
import Link from "next/link"
import { useAlertStore } from "@/zustand/alert-store"

interface Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface CategoryCardProps {
  category: Category

}

export function CategoryCard({ category,  }: CategoryCardProps) {
  
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(category.name)
  const {updateCategoryFn,} = useUpdateCategory()

  const { onOpen, data} = useAlertStore()

  const onEdit = async(categoryId: string, name: string) =>{
    updateCategoryFn({id:categoryId, name}).then(()=>{
      toast("category edited")
    })
  }



  const handleSave = () => {
    if (editName.trim() && editName !== category.name) {
      onEdit?.(category.id, editName.trim())
    }
    setEditName("")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(category.name)
    setIsEditing(false)
  }



  return (
    <Card className="w-fit ">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave()
                  if (e.key === "Escape") handleCancel()
                }}
                autoFocus
              />
              <Button size="sm" variant="outline" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={()=>onOpen("Delete-Category", category.id)}
                  className="text-destructive hover:text-destructive bg-transparent"
                  asChild
                >
                  
                    <Trash2 className="h-4 w-4 " />
                  
                </Button>
              </div>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Created: {formatDate(category.createdAt)}</p>
          <p>Updated: {formatDate(category.updatedAt)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
