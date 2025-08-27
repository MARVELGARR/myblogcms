"use client"

import { usePostStore } from "@/zustand/post-store"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useGetCategory } from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useGetCategory"



export function CategorySelect() {
  const { category, setCategory } = usePostStore()


  const { data: categories, isLoading, isError} = useGetCategory()

  return (
    <div className="space-y-2">
      <label htmlFor="category" className="text-sm font-medium text-foreground">
        Category
      </label>
      <Select
        value={category || 'loading'}
        onValueChange={setCategory}
        
      >
        <SelectTrigger className="w-full">
          <SelectValue defaultValue={'loading...'} placeholder={isLoading ? "Loading..." : "Select category"} />
        </SelectTrigger>
        <SelectContent>
           {isLoading && (
    <SelectItem  value="loading" disabled>
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
              ))            : !isLoading && <SelectItem value="none" disabled>No categories found</SelectItem>
          }
        </SelectContent>
      </Select>
    </div>
  )
}