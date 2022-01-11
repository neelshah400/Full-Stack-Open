import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let blog, isOwner, updateBlog, removeBlog, component

  beforeEach(() => {

    blog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 4,
      user: {
        username: 'root',
        name: 'Super User',
        id: '61cce159de9e172a9e5db9aa'
      },
      id: '61cce338ada2bb7a21f99da4'
    }

    isOwner = true

    updateBlog = jest.fn()

    removeBlog = jest.fn()

    component = render(
      <Blog blog={blog} isOwner={isOwner} updateBlog={updateBlog} removeBlog={removeBlog} />
    )

  })

  test('renders title and author only by default', () => {

    const basicInfoDiv = component.container.querySelector('#basicInfoDiv')
    expect(basicInfoDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(basicInfoDiv).toBeVisible()

    const urlDiv = component.container.querySelector('#urlDiv')
    expect(urlDiv).toHaveTextContent(`${blog.url}`)
    expect(urlDiv).not.toBeVisible()

    const likesDiv = component.container.querySelector('#likesDiv')
    expect(likesDiv).toHaveTextContent(`likes ${blog.likes}`)
    expect(likesDiv).not.toBeVisible()

  })

  test('renders url and likes after toggle button clicked', () => {

    const toggleButton = component.container.querySelector('#toggleButton')
    fireEvent.click(toggleButton)

    const urlDiv = component.container.querySelector('#urlDiv')
    expect(urlDiv).toHaveTextContent(`${blog.url}`)
    expect(urlDiv).toBeVisible()

    const likesDiv = component.container.querySelector('#likesDiv')
    expect(likesDiv).toHaveTextContent(`likes ${blog.likes}`)
    expect(likesDiv).toBeVisible()

  })

  test('like button registers two clicks correctly', () => {

    const likeButton = component.container.querySelector('#likeButton')

    const count = 2
    for (let i = 0; i < count; i++) {
      fireEvent.click(likeButton)
    }

    expect(updateBlog.mock.calls).toHaveLength(count)

  })

})