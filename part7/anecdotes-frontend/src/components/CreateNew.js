import { useField } from '../hooks'

const CreateNew = (props) => {

  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetInfo, ...info } = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  } 

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew