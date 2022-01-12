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
    <div style={blogStyle} id='blogDiv' className='blog'>
      <div id='basicInfoDiv'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} id='toggleButton'>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} id='detailedInfoDiv' >
        <div id='urlDiv'>{blog.url}</div>
        <div id='likesDiv' className='likes'>
          likes {blog.likes}
          <button onClick={likeBlog} id='likeButton'>like</button>
        </div>
        <div id='userDiv'>{blog.user.name}</div>
        {isOwner &&
          <div id='removeDiv'>
            <button onClick={deleteBlog} id='removeButton'>remove</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog