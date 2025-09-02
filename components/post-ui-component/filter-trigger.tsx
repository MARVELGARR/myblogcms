"use client"

import { useState } from "react"
import { Filter, Search, Tag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFilterStore } from "@/lib/store"
import PostFilter from "./post-filter"

export default function FilterTrigger() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { titleFilter, categoryFilter, dateFilter, categories } = useFilterStore()

  // Count active filters
  const activeFiltersCount = [
    titleFilter,
    categoryFilter !== "all" ? categoryFilter : null,
    dateFilter !== "all" ? dateFilter : null,
  ].filter(Boolean).length

  const hasActiveFilters = activeFiltersCount > 0

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Filter Trigger Button */}
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {titleFilter && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Search className="h-3 w-3" />"{titleFilter}"
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {getCategoryName(categoryFilter)}
              </Badge>
            )}
            {dateFilter !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dateFilter === "today" && "Today"}
                {dateFilter === "week" && "This Week"}
                {dateFilter === "month" && "This Month"}
                {dateFilter === "year" && "This Year"}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <PostFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </>
  )
}
