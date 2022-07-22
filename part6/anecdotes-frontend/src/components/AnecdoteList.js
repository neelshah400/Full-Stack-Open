import { useDispatch, useSelector } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => (
    anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .slice()
      .sort((a, b) => b.votes - a.votes)
  ))

  const vote = async (id) => {
    dispatch(voteOnAnecdote(id))
    dispatch(notify(`You voted ${anecdotes.find(a => a.id === id).content}`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdoteList