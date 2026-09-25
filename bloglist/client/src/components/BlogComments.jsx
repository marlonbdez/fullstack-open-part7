import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useBlogs } from '../hooks/useBlogs'

const BlogComments = ({ blog }) => {
  const { addComment } = useBlogs()

  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Comment
        </Button>
      </form>
      {blog.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogComments