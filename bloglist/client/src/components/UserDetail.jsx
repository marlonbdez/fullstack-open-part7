import { useUsers } from '../hooks/useUsers'

export const UserDetail = () => {
  const { users } = useUsers()
  const user = users.find((u) => u.id === location.pathname.split('/').pop())
  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail