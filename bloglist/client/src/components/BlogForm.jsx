import { useImperativeHandle, forwardRef } from 'react'
import { TextField, Button } from '@mui/material'
import { useField } from '../hooks/useField'

const BlogForm = forwardRef(({ handleNewBlog }, ref) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const resetForm = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title: title.value, author: author.value, url: url.value }
    handleNewBlog(newBlog)
  }

  useImperativeHandle(ref, () => ({
    resetForm,
  }))

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10 }}>
          <TextField
            {...title}
            label="Title"
            slotProps={{ htmlInput: { 'data-testid': 'blog-form-title' } }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField
            {...author}
            label="Author"
            slotProps={{ htmlInput: { 'data-testid': 'blog-form-author' } }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField
            {...url}
            label="URL"
            slotProps={{ htmlInput: { 'data-testid': 'blog-form-url' } }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button data-testid="blog-form-button" type="submit" variant="contained">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
