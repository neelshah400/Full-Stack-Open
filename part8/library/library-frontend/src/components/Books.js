import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')
  const [books, setBooks] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult.data])

  if (!props.show || !books) {
    return null
  }

  if (result.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  const genres = ['all genres'].concat([...new Set(result.data.allBooks.flatMap((b) => b.genres))])

  const handleGenreClick = (genre) => {
    setGenre(genre)
    if (genre === 'all genres') {
      setBooks(result.data.allBooks)
    } else {
      getBooksByGenre({ variables: { genre } })
    }
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <span>
        <strong>genre:&nbsp;</strong>
        {genre}
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default Books
