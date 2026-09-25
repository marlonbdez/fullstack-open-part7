import { useEffect } from 'react'
import blogService from '../services/blogs'
import useBlogsStore, { useBlogsStoreActions } from '../store/blogs'
import { useNotificationActions } from '../store/notification'

// useBlogs() is called from several components at once (App, Blog,
// BlogComments), each mounting its own effect. Without this guard, each
// one fires its own GET /api/blogs on mount, and whichever of those
// requests resolves LAST overwrites the store - including clobbering a
// comment/like/etc that was added in between. This flag is module-level
// (not React state) so it is checked and set synchronously, before any
// `await`, guaranteeing only the first mount actually fetches.
let blogsFetchStarted = false

export const useBlogs = () => {
  const { blogs } = useBlogsStore()
  const { setBlogs } = useBlogsStoreActions()
  const { setNotification } = useNotificationActions()

  useEffect(() => {
    if (blogsFetchStarted) return
    blogsFetchStarted = true

    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        setNotification({ text: `Unable to fetch blogs: ${error}`, type: 'error' })
      }
    }

    fetchBlogs()
  }, [setBlogs, setNotification])

  const createNewBlog = async (newBlog) => {
    try {
      const { title, author, url } = newBlog

      if (!title || !author || !url) {
        setNotification({ text: 'Wrong credentials', type: 'error' })
        return
      }

      const addedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, addedBlog])
      setNotification({ text: `a new blog: "${addedBlog.title}" added`, type: 'success' })
      return true
    } catch {
      setNotification({ text: 'post wasnt created', type: 'error' })
    }
  }

  const likeBlogAction = async (blog) => {
    try {
      const newBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      }

      const updatedBlog = await blogService.update(blog.id, newBlog)
      const filteredBlogs = blogs.filter((b) => b.id !== updatedBlog.id)
      const updatedBlogs = [...filteredBlogs, updatedBlog]
      setBlogs(updatedBlogs)
    } catch {
      setNotification({ text: 'unable to increase likes', type: 'error' })
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} ?`)) {
        await blogService.remove(blog.id)
        const filteredBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(filteredBlogs)
        return true
      }
    } catch {
      setNotification({ text: `unable to remove blog: ${blog.title}`, type: 'error' })
    }
  }

  const addComment = async (blogId, comment) => {
    try {
      const updatedBlog = await blogService.addComment(blogId, comment)
      const filteredBlogs = blogs.filter((b) => b.id !== updatedBlog.id)
      const updatedBlogs = [...filteredBlogs, updatedBlog]
      setBlogs(updatedBlogs)
    } catch (error) {
      setNotification({ text: `unable to add comment: ${error}`, type: 'error' })
    }
  }

  return { blogs, createNewBlog, likeBlogAction, removeBlog, addComment }
}