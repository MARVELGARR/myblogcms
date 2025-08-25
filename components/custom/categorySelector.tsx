"use client"

import { useQuery } from "@tanstack/react-query"
import { usePostStore } from "@/zustand/post-store"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useGetCategory } from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useGetCategory"

async function fetchCategories() {
  const res = await fetch("/api/category")
  const data = await res.json()
  if (!data.success) throw new Error(data.error || "Failed to fetch categories")
  return data.categories as Array<{ id: string; name: string }>
}

export function CategorySelect() {
  const { category, setCategory } = usePostStore()


  const { data: categories, isLoading, isError} = useGetCategory()

  return (
    <div className="space-y-2">
      <label htmlFor="category" className="text-sm font-medium text-foreground">
        Category
      </label>
      <Select
        value={category}
        onValueChange={setCategory}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isLoading ? "Loading..." : "Select category"} />
        </SelectTrigger>
        <SelectContent>
           {isLoading && (
    <SelectItem value="loading" disabled>
      Loading...
    </SelectItem>
  )}
  {isError && (
    <SelectItem value="error" disabled>
      Error loading categories
    </SelectItem>
  )}
          {categories?.length
            ? categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))
            : !isLoading && <SelectItem value="" disabled>No categories found</SelectItem>
          }
        </SelectContent>
      </Select>
    </div>
  )
}