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
    <div id='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog} id='form'>
        <div id='titleDiv'>
          title:
          <input type="text" value={newBlog.title} name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            id='titleInput' />
        </div>
        <div id='authorDiv'>
          author:
          <input type="text" value={newBlog.author} name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            id='authorInput' />
        </div>
        <div id='urlDiv'>
          url:
          <input type="text" value={newBlog.url} name="URL"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            id='urlInput' />
        </div>
        <button type="submit" id='createButton'>create</button>
      </form>
    </div>
  )

}

export default BlogForm