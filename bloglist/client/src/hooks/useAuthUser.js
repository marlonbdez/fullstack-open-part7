import { useContext } from 'react'
import UserContext from '../context/UserContext'

export const useAuthUser = () => {
  const { user, setUser } = useContext(UserContext)

  return { user, setUser }
}