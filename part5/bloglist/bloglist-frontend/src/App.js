import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const emptyBlog = { title: '', author: '', url: '' }

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(emptyBlog)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

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

  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog(emptyBlog)
        notify('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch(error => notify('error', `failed to add new blog to database: ${error.message}`))
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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" value={newBlog.title} name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div>
          author:
          <input type="text" value={newBlog.author} name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div>
          url:
          <input type="text" value={newBlog.url} name="URL"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App