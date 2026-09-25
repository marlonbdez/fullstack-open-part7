import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const listStyle = {
    padding: 0,
  }
  return (
    <div>
      <ul style={listStyle}>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </ul>
    </div>
  )
}

export default Blogs
