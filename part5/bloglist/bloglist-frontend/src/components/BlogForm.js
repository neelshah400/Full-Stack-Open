import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const emptyBlog = { title: '', author: '', url: '' }

  const [newBlog, setNewBlog] = useState(emptyBlog)

  const addBlog = event => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog(emptyBlog)
  }

  return (
    <div>
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
    </div>
  )

}

export default BlogForm