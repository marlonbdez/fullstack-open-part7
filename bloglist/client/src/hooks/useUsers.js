import { useEffect } from 'react'
import { useUsersStore, useUsersStoreActions } from '../store/users'
import userService from '../services/user'
import { useNotificationActions } from '../store/notification'

export const useUsers = () => {
  const users = useUsersStore((state) => state.users)
  const { setUsers } = useUsersStoreActions()
  const { setNotification } = useNotificationActions()

  useEffect(() => {
    let isMounted = true

    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAll()
        if (isMounted) {
          setUsers(fetchedUsers)
        }
      } catch (error) {
        if (isMounted) {
          setNotification({ text: `Unable to fetch users: ${error}`, type: 'error' })
        }
      }
    }

    fetchUsers()

    return () => {
      isMounted = false
    }
  }, [setNotification, setUsers])

  return { users }
}