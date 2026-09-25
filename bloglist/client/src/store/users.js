import { create } from 'zustand'

export const useUsersStore = create((set) => ({
  users: [],
  actions: {
    setUsers: (users) => set({ users }),
  },
}))

export const useUsersStoreActions = () => useUsersStore((state) => state.actions)

export default useUsersStore