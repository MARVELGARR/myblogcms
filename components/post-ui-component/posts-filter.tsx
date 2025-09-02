"use client"

import { useEffect, useState } from "react"
import { Search, Calendar, Tag, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilterStore } from "@/zustand/post-filter-store"
import { useGetCategory } from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useGetCategory"

interface PostFilterProps {
  isOpen: boolean
  onClose: () => void
}

export default function PostFilter({ isOpen, onClose }: PostFilterProps) {
  const {
    titleFilter,
    categoryFilter,
    dateFilter,
    setTitleFilter,
    setCategoryFilter,
    setDateFilter,
    clearFilters,
  } = useFilterStore()

  const [isLoading, setIsLoading] = useState(false)

    const { data, isLoading: isGettingCategory, isError } = useGetCategory();

  const handleClearFilters = () => {
    clearFilters()
  }

  const hasActiveFilters = titleFilter || categoryFilter !== "all" || dateFilter !== "all"

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-md mx-4 animate-in slide-in-from-top-4 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Filter Posts</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search by Title
            </label>
            <Input
              placeholder="Enter post title..."
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Category
            </label>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-full">
          <SelectValue
            defaultValue={"loading..."}
            placeholder={isGettingCategory ? "Loading..." : "Select category"}
          />
        </SelectTrigger>
        <SelectContent>
          {isGettingCategory && (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          )}
          {isError && (
            <SelectItem value="error" disabled>
              Error loading categories
            </SelectItem>
          )}
          {data?.length
            ? data.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))
            : !isLoading && (
                <SelectItem value="none" disabled>
                  No categories found
                </SelectItem>
              )}
        </SelectContent>
      </Select>
          </div>

          {/* Date Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              className="flex-1 bg-transparent"
            >
              Clear Filters
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Filters
            </Button>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-1">
                {titleFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                    Title: "{titleFilter}"
                  </span>
                )}
                {categoryFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                    Category: {data.find((c) => c.id === categoryFilter)?.name || categoryFilter}
                  </span>
                )}
                {dateFilter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                    Date: {dateFilter}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
