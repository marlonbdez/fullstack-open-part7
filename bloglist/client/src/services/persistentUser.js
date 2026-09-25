const STORAGE_USER_KEY = 'loggedBloglistUser'

const getUser = () => {
  const dataFromStorage = window.localStorage.getItem(STORAGE_USER_KEY)
  return dataFromStorage ? JSON.parse(dataFromStorage) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_USER_KEY)
}

export default { getUser, saveUser, removeUser }
