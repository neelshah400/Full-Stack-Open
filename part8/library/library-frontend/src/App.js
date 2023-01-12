import { useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import BirthYear from './components/BirthYear'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, bookAdded) => {

  const uniqById = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(bookAdded)),
    }
  })

}

const App = () => {
  
  const [token, setToken] = useState(window.localStorage.getItem('library:token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded
      alert(`${bookAdded.title} by ${bookAdded.author.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library:token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? (
            <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('edit')}>edit author</button>
              <button onClick={logout}>logout</button>
            </span>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )
        }
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <BirthYear show={page === 'edit'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
