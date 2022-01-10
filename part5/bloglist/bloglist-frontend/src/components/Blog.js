import React, { useState } from 'react'

const Blog = ({ blog, isOwner, updateBlog, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => setVisible(!visible)

  const likeBlog = event => {
    event.preventDefault()
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {isOwner &&
          <div>
            <button onClick={deleteBlog}>remove</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog