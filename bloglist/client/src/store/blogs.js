import { create } from 'zustand'

export const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (blogs) => set({ blogs })
  }
}))

export const useBlogsStoreActions = () => useBlogsStore((state) => state.actions)

export default useBlogsStore