import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface PostState {
  // Post metadata
  tags: string[]
  category: string
  featured: boolean

  // Content
  markdown: string

  // Uploaded files
  uploadedFiles: Array<{
    url: string
    name: string
    size: number
    type: string
  }>

  // Actions
  setTags: (tags: string[]) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  setCategory: (category: string) => void
  setFeatured: (featured: boolean) => void
  setMarkdown: (markdown: string) => void
  setUploadedFiles: (files: Array<{ url: string; name: string; size: number; type: string }>) => void
  addUploadedFiles: (files: Array<{ url: string; name: string; size: number; type: string }>) => void

  // Reset function
  resetPost: () => void
}

const initialState = {
  tags: [],
  category: "",
  featured: false,
  markdown: "",
  uploadedFiles: [],
}

export const usePostStore = create<PostState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Tag actions
      setTags: (tags) => set({ tags }, false, "setTags"),
      addTag: (tag) => {
        const { tags } = get()
        if (!tags.includes(tag)) {
          set({ tags: [...tags, tag] }, false, "addTag")
        }
      },
      removeTag: (tag) => {
        const { tags } = get()
        set({ tags: tags.filter((t) => t !== tag) }, false, "removeTag")
      },

      // Category action
      setCategory: (category) => set({ category }, false, "setCategory"),

      // Featured action
      setFeatured: (featured) => set({ featured }, false, "setFeatured"),

      // Markdown action
      setMarkdown: (markdown) => set({ markdown }, false, "setMarkdown"),

      // File actions
      setUploadedFiles: (uploadedFiles) => set({ uploadedFiles }, false, "setUploadedFiles"),
      addUploadedFiles: (files) => {
        const { uploadedFiles } = get()
        set({ uploadedFiles: [...uploadedFiles, ...files] }, false, "addUploadedFiles")
      },

      // Reset action
      resetPost: () => set(initialState, false, "resetPost"),
    }),
    {
      name: "post-store",
    },
  ),
)
