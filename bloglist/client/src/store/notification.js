import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  text: null,
  type: null,
  actions: {
    setNotification: async ({ text, type, duration = 5000 }) => {
      set({ text, type })
      setTimeout(() => {
        set(({ text: null, type: null }))
      }, duration)
    },
  }
}))

export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export default useNotificationStore