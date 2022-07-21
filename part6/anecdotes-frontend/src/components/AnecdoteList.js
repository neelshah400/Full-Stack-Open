import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => (
    state
      .anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .slice().sort((a, b) => b.votes - a.votes)
  ))

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteOn(id))
    dispatch(setNotification(`You voted ${anecdotes.find(a => a.id === id).content}`))
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