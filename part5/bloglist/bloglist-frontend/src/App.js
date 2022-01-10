import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs.sort((blog1, blog2) => blog1.likes - blog2.likes)))
  }, [])

  useEffect(() => {
    setBlogs(blogs.sort((blog1, blog2) => blog1.likes - blog2.likes))
  }, [blogs])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglist:user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (style, message) => {
    setNotificationStyle(style)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationStyle('')
      setNotificationMessage('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglist:user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('success', 'logged in successfully')
    } catch (exception) {
      notify('error', 'wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('bloglist:user')
    blogService.setToken('')
    setUser(null)
    notify('success', 'logged out successfully')
  }

  const blogFormRef = useRef()

  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch(error => notify('error', `failed to add new blog to database: ${error.message}`))
  }

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
        notify('success', `existing blog ${returnedBlog.title} by ${returnedBlog.author} updated`)
      })
      .catch(error => notify('error', `failed to update existing blog in database: ${error.message}`))
  }

  const removeBlog = id => {
    const oldBlog = blogs.filter(blog => blog.id === id)[0]
    blogService.remove(id)
      .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        notify('success', `blog ${oldBlog.title} by ${oldBlog.author} deleted`)
      })
      .catch(error => notify('error', `failed to delete blog from database: ${error.message}`))
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification style={notificationStyle} message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification style={notificationStyle} message={notificationMessage} />
      <p>
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} isOwner={blog.user.username === user.username} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )

}

export default App