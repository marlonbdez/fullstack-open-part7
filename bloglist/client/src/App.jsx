import { useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar } from '@mui/material'

import Notification from './components/Notification'

import blogService from './services/blogs'
import { useBlogs } from './hooks/useBlogs'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import userService from './services/user'
import persistentUserService from './services/persistentUser'
import { useAuthUser } from './hooks/useAuthUser'
import UsersTable from './components/UsersTable'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import UserDetail from './components/UserDetail'
import ErrorBoundary from './components/ErrorBoundary'
import { useNotificationActions } from './store/notification'

const App = () => {
  const navigate = useNavigate()
  const { blogs, createNewBlog, removeBlog } = useBlogs()
  const { user, setUser } = useAuthUser()
  const { setNotification } = useNotificationActions()
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  useEffect(() => {
    const userData = persistentUserService.getUser()
    if (userData) {
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [setUser])


  const handleLogin = async (newUser) => {
    try {
      const user = await userService.login(newUser)
      persistentUserService.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      return true
    } catch {
      setNotification({ text: 'Wrong credentials', type: 'error' })
      return false
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    persistentUserService.removeUser()
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    const ok = await createNewBlog(newBlog)
    if (ok) {
      blogFormRef.current?.resetForm()
      navigate('/')
    }
  }

  const handleBlogRemove = async (blog) => {
    const ok = await removeBlog(blog)
    if (ok) {
      navigate('/')
    }
  }

  const logo = { fontSize: 24 }
  const toolbarStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  // Plain react-router Links, not MUI <Button component={Link}>: MUI's
  // ButtonBase forces role="button" whenever `component` isn't a plain
  // string, which hides the real <a> semantics and breaks
  // getByRole('link', ...) in the e2e tests. See
  // https://github.com/mui/material-ui/issues/26453
  const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    padding: '6px 8px',
    borderRadius: 4,
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar style={toolbarStyle}>
          <div style={logo}>Blog App</div>
          <div style={toolbarStyle}>
            <Link style={navLinkStyle} to="/">
              blogs
            </Link>
            <Link style={navLinkStyle} to="/users">
              users
            </Link>
            {!user && (
              <Link style={navLinkStyle} to="/login">
                login
              </Link>
            )}
            {user && (
              <Link style={navLinkStyle} to="/create">
                new blog
              </Link>
            )}
            {user && <LoggedUser user={user} handleLogout={handleLogout} />}
          </div>
        </Toolbar>
      </AppBar>

      <Notification />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary key={location.pathname}>
              <Blog
                isDetailView={true}
                blog={blog}
                user={user}
                handleRemove={handleBlogRemove}
              />
            </ErrorBoundary>
          }
        />
        <Route
          path="/"
          element={
            <ErrorBoundary key={location.pathname}>
              <div>
                <h2>blogs</h2>
                <Blogs user={user} blogs={blogs} />
              </div>
            </ErrorBoundary>
          }
        />
        <Route
          path="/users"
          element={
            <ErrorBoundary key={location.pathname}>
              <div>
                <h2>Users</h2>
                <UsersTable />
              </div>
            </ErrorBoundary>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ErrorBoundary key={location.pathname}>
              <div>
                <h2>User Details</h2>
                <UserDetail />
              </div>
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary key={location.pathname}>
              <div>
                <h2>Log in to application</h2>
                <LoginForm handleLogin={handleLogin} ref={loginFormRef} />
              </div>
            </ErrorBoundary>
          }
        />
        <Route
          path="/create"
          element={
            <ErrorBoundary key={location.pathname}>
              <div>
                {user && <BlogForm handleNewBlog={handleCreateBlog} ref={blogFormRef} />}
                {!user && <p>⛔️ you must be logged in to be able to create a blog</p>}
              </div>
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<h2>404 - Page not found</h2>} />
      </Routes>
    </Container>
  )
}

export default App
