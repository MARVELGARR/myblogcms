import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface EditPostState {
  // Post metadata
  tags: string[]
  category: string
  title: string
  description: string
  featured: boolean
  published:boolean

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
  setTittle: (title: string) => void
  setDescription: (description: string) => void
  setFeatured: (featured: boolean) => void
  setMarkdown: (markdown: string) => void
  setUploadedFiles: (files: Array<{ url: string; name: string; size: number; type: string }>) => void
  addUploadedFiles: (files: Array<{ url: string; name: string; size: number; type: string }>) => void
  setPublished: (published: boolean) => void
  // Reset function
  resetPost: () => void
}

const initialState = {
  tags: [],
  category: "",
  tittle: "",
  description: "",
  featured: false,
  markdown: "",
  uploadedFiles: [],
  published: false
}

export const useEditPostStore = create<EditPostState>()(
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

      //tittle action
      setTittle: (title) => set({ title }, false, "setTittle"),
      
      //description action
      setDescription: (description) => set({ description }, false, "setDescription"),

      // Featured action
      setFeatured: (featured) => set({ featured }, false, "setFeatured"),

      // Published action
      setPublished: (published) => set({ published }, false, "setPublished"),

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
