import { create } from "zustand"

export interface Category {
  id: string
  name: string
}

export interface FilterState {
  titleFilter: string
  categoryFilter: string
  dateFilter: "all" | "today" | "week" | "month" | "year"
  categories: Category[]
  setTitleFilter: (title: string) => void
  setCategoryFilter: (category: string) => void
  setDateFilter: (date: "all" | "today" | "week" | "month" | "year") => void
  setCategories: (categories: Category[]) => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  titleFilter: "",
  categoryFilter: "all",
  dateFilter: "all",
  categories: [],
  setTitleFilter: (title) => set({ titleFilter: title }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setDateFilter: (date) => set({ dateFilter: date }),
  setCategories: (categories) => set({ categories }),
  clearFilters: () =>
    set({
      titleFilter: "",
      categoryFilter: "all",
      dateFilter: "all",
    }),
}))


