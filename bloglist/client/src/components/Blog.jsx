import { Link } from 'react-router-dom'
import { Button, Typography, Divider, Paper } from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'
import BlogComments from './BlogComments'

const Blog = ({ blog, handleRemove, user, isDetailView }) => {
  const { likeBlogAction } = useBlogs()

  if (!blog) {
    return null
  }

  const spacing = {
    padding: 16,
  }

  return (
    <div>
      {!isDetailView && (
        <li data-testid="blog-item">
          <Link to={`/blogs/${blog.id}`}>
            <span data-testid="blog-title">{blog.title}</span>
            <span data-testid="blog-author">{blog.author}</span>
          </Link>
        </li>
      )}

      {isDetailView && (
        <Paper style={spacing} elevation={2}>
          <Typography data-testid="blog-title" variant="h3" component="h2">
            {blog.title}
          </Typography>
          <Divider data-testid="blog-author" textAlign="left">
            by {blog.author}
          </Divider>
          <h2></h2>
          <Link data-testid="blog-url" to={blog.url}>
            {blog.url}
          </Link>
          <p data-testid="blog-username">Added by {blog.user.name} </p>
          <div>
            👍 Likes:
            <span data-testid="blog-likes-counter"> {blog.likes} </span>
          </div>
          {user && (
            <Button
              variant="contained"
              data-testid="blog-likes-button"
              onClick={() => likeBlogAction(blog)}
            >
              Like
            </Button>
          )}
          {user && blog.user.username === user.username && (
            <Button
              data-testid="blog-remove-button"
              variant="outlined"
              style={{ margin: 8 }}
              onClick={() => handleRemove(blog)}
            >
              Remove
            </Button>
          )}
          <BlogComments blog={blog} />
        </Paper>
      )}
    </div>
  )
}

export default Blog
